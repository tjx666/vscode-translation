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
            });
            panel.webview.html = webviewUtils.renderReources(context, panel, content.toString(), [
                { src: 'vscode-webview-ui-toolkit', path: 'node_modules/@vscode/webview-ui-toolkit/dist/toolkit.js' },
                { src: 'js/vue3.js', path: 'src/webview/js/vue3.js' },
                { src: 'js/common.js', path: 'src/webview/js/common.js' },
            ]);
            panel.onDidDispose(() => panel = null);
        });
    }
};

module.exports = {
    handler,
};