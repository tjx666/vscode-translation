const vscode = require('vscode');
const fs = require('fs');

let panel = null;

const handler = context => {
    if (panel) {
        panel.reveal();
    }else {
        fs.readFile(`${context.extensionPath}/src/webview/regular-expression-test.html`, (error, content) => {
            if (error) {
                vscode.window.showErrorMessage(error.message);
                return;
            }
    
            panel = vscode.window.createWebviewPanel('regularExpressionTestPanel', 'Regular Expression Test', vscode.ViewColumn.Beside, {
                enableScripts: true,
            });
            panel.webview.html = content.toString();
            panel.onDidDispose(() => panel = null);
        });
    }
};

module.exports = {
    handler,
};