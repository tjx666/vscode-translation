const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const webviewUtils = require('../utils/webview-utils.js');

let panel = null;

const handler = context => {
    if (panel) {
        panel.reveal();
    } else {
        fs.readFile(`${context.extensionPath}/src/webview/regular-expression-test.html`, (error, content) => {
            if (error) {
                console.log(error);
                vscode.window.showErrorMessage(error.message);
                return;
            }

            panel = vscode.window.createWebviewPanel('regularExpressionTestPanel', 'Regular Expression Test', vscode.ViewColumn.Beside, {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath))],
                enableFindWidget: true,
            });
            panel.webview.html = webviewUtils.renderReources(context, panel, content.toString(), []);
            panel.onDidDispose(() => panel = null);
        });
    }
};

module.exports = {
    handler,
};