// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import regularExpressionTest from './command/regular-expression-test.js';
import simpleTranslate from './command/simple-translate.js';
import completeTranslate from './command/complete-translate.js';
import ss from './command/ss.js';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const register: Function = (command: string, handler: Function, handlerParam: any): void => {
        vscode.commands.registerCommand(command, () => handler(context, handlerParam));
    };

    register('regularExpressionTest', regularExpressionTest.handler, null);
    register('simpleTranslate', simpleTranslate.handler, null);
    register('completeTranslate', completeTranslate.handler, { fromCommand: false });
    register('translation', completeTranslate.handler, { fromCommand: true });
    register('ss', ss.handler, null);
}

// this method is called when your extension is deactivated
export function deactivate() {

}
