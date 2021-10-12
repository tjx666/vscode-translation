const vscode = require('vscode');
const fs = require('fs');
const googleTranslateUtils = require('../utils/google-translation-utils.js');

let panel = null;

const handler = (context, param) => {
    if (panel) {
        panel.reveal();
    }else {
        fs.readFile(`${context.extensionPath}/src/webview/translation.html`, (error, content) => {
            if (error) {
                vscode.window.showErrorMessage(error.message);
                return;
            }
    
            panel = vscode.window.createWebviewPanel('translationPanel', 'Translation', vscode.ViewColumn.Beside, {
                enableScripts: true,
            });
            panel.webview.html = content.toString();
            panel.onDidDispose(() => panel = null);
        });
    }

    if (!param.fromCommand) {
        let selection = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
        selection = selection.replace(/\r\n/g, ' ').replace(/\n/g, ' ');

    }
};

module.exports = {
    handler,
};