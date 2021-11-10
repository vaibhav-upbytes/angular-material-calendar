import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
export function ngAdd(options: any): Rule {
    console.log("should be removed after themes add", options);
    return chain([
        nodePackageTask()
    ]);
}

function nodePackageTask(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());
        return tree;
    };
}
