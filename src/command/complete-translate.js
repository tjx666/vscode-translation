const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const webviewUtils = require('../utils/webview-utils.js');
const googleTranslateUtils = require('../utils/google-translation-utils.js');

let panel = null;

const handler = (context, param) => {
    if (!param.fromCommand) {
        let selection = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
        selection = selection.replace(/\r\n/g, ' ').replace(/\n/g, ' ');
    }



    if (panel) {
        panel.reveal();
    } else {
        fs.readFile(`${context.extensionPath}/src/webview/translation.html`, (error, content) => {
            if (error) {
                vscode.window.showErrorMessage(error.message);
                return;
            }

            panel = vscode.window.createWebviewPanel('translationPanel', 'Translation', vscode.ViewColumn.Beside, {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath))],
            });
            panel.webview.html = webviewUtils.renderReources(context, panel, content.toString(), [
                { src: 'plugin/vue.min.js', path: 'src/webview/plugin/vue.min.js' },
                { src: 'common.js', path: 'src/webview/common.js' },
                { src: 'language.js', path: 'src/webview/language.js' },
            ]);
            panel.onDidDispose(() => panel = null);
        });
    }
};

module.exports = {
    handler,
};