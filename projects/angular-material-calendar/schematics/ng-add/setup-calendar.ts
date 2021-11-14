import { logging } from '@angular-devkit/core';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import {
    chain,
    Rule,
    SchematicContext,
    SchematicsException,
    Tree,
} from '@angular-devkit/schematics';
import {
    defaultTargetBuilders,
    getProjectFromWorkspace,
    getProjectTargetOptions,
} from '@angular/cdk/schematics';

import { ProjectType } from '@schematics/angular/utility/workspace-models';
import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/workspace';
import { Schema } from './schema';

/** Path segment that can be found in paths that refer to a prebuilt theme. */
const prebuiltThemePathSegment = '@upbytes.in/angular-material-calendar/theme';

/** Default file name of the custom theme that can be generated. */
const defaultCustomThemeFilename = 'custom-theme.scss';

export default function(options: Schema): Rule {
    return async (host: Tree, context: SchematicContext) => {
        const workspace = await getWorkspace(host);
        const project = getProjectFromWorkspace(workspace, options.project);

        if (project.extensions.projectType === ProjectType.Application) {
            return chain([
                addThemeToAppStyles(options)
            ]);
        }
        context.logger.warn(
            'Angular Material has been set up in your workspace. There is no additional setup ' +
            'required for consuming Angular Material in your library project.\n\n' +
            'If you intended to run the schematic on a different project, pass the `--project` ' +
            'option.',
        );
        return;
    };
}
export function addThemeToAppStyles(options: Schema): Rule {
    return (host: Tree, context: SchematicContext) => {
        context.logger.info(host.get('s')?.path!);
        const themeName = options.theme || 'indigo-pink';
        return insertPrebuiltTheme(options.project, themeName, context.logger);
    };
}

function insertPrebuiltTheme(project: string, theme: string, logger: logging.LoggerApi): Rule {
    // Path needs to be always relative to the `package.json` or workspace root.
    const themePath = `./node_modules/@upbytes.in/
      angular-material-calendar/theme/prebuilt/${theme}.css`;

    return chain([
        addThemeStyleToTarget(project, 'build', themePath, logger),
        addThemeStyleToTarget(project, 'test', themePath, logger),
    ]);
}

function addThemeStyleToTarget(
    projectName: string,
    targetName: 'test' | 'build',
    assetPath: string,
    logger: logging.LoggerApi,
): Rule {
    return updateWorkspace(workspace => {
        const project = getProjectFromWorkspace(workspace, projectName);

        // Do not update the builder options in case Target doesn't use the default CLI builder.
        if (!validateDefaultTargetBuilder(project, targetName, logger)) {
            return;
        }

        const targetOptions = getProjectTargetOptions(project, targetName);
        const styles = targetOptions.styles as (string | { input: string })[];

        if (!styles) {
            targetOptions.styles = [assetPath];
        } else {
            const existingStyles = styles.map(s => (typeof s === 'string' ? s : s.input));

            for (const [index, stylePath] of existingStyles.entries()) {
                // If the given asset is already specified in the styles,
                // we don't need to do anything.
                if (stylePath === assetPath) {
                    return;
                }

                // In case a prebuilt theme is already set up,
                // we can safely replace the theme with the new
                // theme file. If a custom theme is set up,
                // we are not able to safely replace the custom
                // theme because these files can contain custom styles, while prebuilt themes are
                // always packaged and considered replaceable.
                if (stylePath.includes(defaultCustomThemeFilename)) {
                    logger.error(
                        `Could not add the selected theme to the CLI project ` +
                        `configuration because there is already a custom theme file referenced.`,
                    );
                    logger.info(`Please manually add the style file to your configuration:`);
                    logger.info(`    ${assetPath}`);
                    return;
                } else if (stylePath.includes(prebuiltThemePathSegment)) {
                    styles.splice(index, 1);
                }
            }

            styles.push(assetPath);
        }
    });
}

/**
 * Validates that the specified project target is configured with the default builders which are
 * provided by the Angular CLI. If the configured builder does not match the default builder,
 * this function can either throw or just show a warning.
 */
function validateDefaultTargetBuilder(
    project: ProjectDefinition,
    targetName: 'build' | 'test',
    logger: logging.LoggerApi,
) {
    const defaultBuilder = defaultTargetBuilders[targetName];
    const targetConfig = project.targets && project.targets.get(targetName);
    const isDefaultBuilder = targetConfig && targetConfig['builder'] === defaultBuilder;

    // Because the build setup for the Angular CLI can be customized by developers, we can't know
    // where to put the theme file in the workspace configuration if custom builders are being
    // used. In case the builder has been changed for the "build" target, we throw an error and
    // exit because setting up a theme is a primary goal of `ng-add`. Otherwise if just the "test"
    // builder has been changed, we warn because a theme is not mandatory for running tests
    // with Material. See: https://github.com/angular/components/issues/14176
    if (!isDefaultBuilder && targetName === 'build') {
        throw new SchematicsException(
            `Your project is not using the default builders for ` +
            `"${targetName}". The 
            Angular Calendar schematics cannot add a theme to the workspace ` +
            `configuration if the builder has been changed.`,
        );
    } else if (!isDefaultBuilder) {
        // for non-build targets we gracefully report the error without actually aborting the
        // setup schematic. This is because a theme is not mandatory for running tests.
        logger.warn(
            `Your project is not using the default builders for "${targetName}". This ` +
            `means that we cannot add the configured theme to the "${targetName}" target.`,
        );
    }

    return isDefaultBuilder;
}
