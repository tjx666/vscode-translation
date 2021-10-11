const vscode = require('vscode');
const fs = require('fs');

const handler = context => {
    fs.readFile(`${context.extensionPath}/src/webview/regular-expression-test.html`, (error, content) => {
        if (error) {
            vscode.window.showErrorMessage(error.message);
            return;
        }

        const panel = vscode.window.createWebviewPanel('regularExpressionTestPanel', 'Regular Expression Test', vscode.ViewColumn.Beside, {
            enableScripts: true
        });
        panel.webview.html = content.toString();
    });
};

module.exports = {
    handler,
};