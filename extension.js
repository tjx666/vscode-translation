// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const register = (command, handler) => {
    vscode.commands.registerCommand(command, () => handler(context));
};

const simpleTranslate = require('./src/command/simple-translate.js');
const completeTranslate = require('./src/command/complete-translate.js');
const regularExpressionTest = require('./src/command/regular-expression-test.js');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    const register = (command, handler) => {
        vscode.commands.registerCommand(command, () => handler(context));
    };

    register('simpleTranslate', simpleTranslate.handler);
    register('completeTranslate', completeTranslate.handler);
    register('regularExpressionTest', regularExpressionTest.handler);
}

// this method is called when your extension is deactivated
function deactivate() {

}

module.exports = {
    activate,
    deactivate
}