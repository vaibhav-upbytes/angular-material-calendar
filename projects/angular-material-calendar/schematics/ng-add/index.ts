import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
export function ngAdd(options: any): Rule {
    console.log('should be removed after themes add', options);
    return (tree: Tree, context: SchematicContext) => {
        const installTaskId = context.addTask(new NodePackageInstallTask());

        context.addTask(new RunSchematicTask('ng-add-setup-calendar', options), [installTaskId]);
        return tree;
    };
}

