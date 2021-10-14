const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const webviewUtils = require('../utils/webview-utils.js');
const googleTranslateUtils = require('../utils/google-translation-utils.js');

let panel = null;

const handler = (context, param) => {
    let selection = null;
    if (!param.fromCommand) {
        selection = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
    }

    if (panel) {
        panel.reveal();
        if (!param.fromCommand) {
            panel.webview.postMessage({
                operation: 'query',
                parameter: {
                    q: selection,
                },
            });
        }
    } else {
        let config = vscode.workspace.getConfiguration('translation');
        fs.readFile(`${context.extensionPath}/src/webview/translation.html`, (error, content) => {
            if (error) {
                console.log(error);
                vscode.window.showErrorMessage(error.message);
                return;
            }

            panel = vscode.window.createWebviewPanel('translationPanel', 'Translation', vscode.ViewColumn.Beside, {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath))],
            });
            panel.onDidDispose(() => panel = null);

            panel.webview.html = webviewUtils.renderReources(context, panel, content.toString(), [
                { src: 'js/vue3.js', path: 'src/webview/js/vue3.js' },
                { src: 'js/common.js', path: 'src/webview/js/common.js' },
                { src: 'js/language.js', path: 'src/webview/js/language.js' },
            ]);
            panel.webview.onDidReceiveMessage(message => {
                switch (message.operation) {
                    case 'getTranslate': {
                        googleTranslateUtils.getTranslate(message.parameter).then(data => {
                            panel.webview.postMessage({
                                operation: 'receiveTranslation',
                                parameter: data,
                            });
                        }).catch(error => {
                            console.log(error);
                            vscode.window.showErrorMessage(error);
                        });
                        break;
                    }
                    case 'getTts': {
                        // TODO
                        break;
                    }
                }
            });

            panel.webview.postMessage({
                operation: 'init',
                parameter: {
                    sl: config.get('source-language'),
                    tl: config.get('target-language'),
                    q: selection,
                },
            });
        });
    }
};

module.exports = {
    handler,
};