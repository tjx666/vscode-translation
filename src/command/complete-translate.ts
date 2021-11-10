import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import webviewUtils from '../utils/webview-utils.js';
import googleTranslateUtils from '../utils/google-translation-utils.js';
import * as child_process from 'child_process';

let panel: vscode.WebviewPanel | null = null;

const handler: Function = (context: vscode.ExtensionContext, param: any): void => {
    let selection: string | null | undefined = null;
    if (!param.fromCommand) {
        selection = vscode.window.activeTextEditor?.document.getText(vscode.window.activeTextEditor.selection);
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
        let config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('translation');
        fs.readFile(`${context.extensionPath}/src/webview/translation.html`, (error: NodeJS.ErrnoException | null, content: Buffer) => {
            if (error) {
                console.log(error);
                vscode.window.showErrorMessage(error.message);
                return;
            }

            panel = vscode.window.createWebviewPanel('translationPanel', 'Translation', vscode.ViewColumn.Beside, {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath))],
                enableFindWidget: true,
            });
            panel.onDidDispose(() => panel = null);

            panel.webview.html = webviewUtils.renderReources(context, panel, content.toString(), [
                {
                    src: 'js/language.js',
                    path: 'src/webview/js/language.js',
                },
            ]);
            panel.webview.onDidReceiveMessage((message: any) => {
                switch (message.operation) {
                    case 'getTranslate': {
                        googleTranslateUtils.getTranslate(message.parameter).then((data: any) => {
                            panel?.webview.postMessage({
                                operation: 'receiveTranslation',
                                parameter: data,
                            });
                        }).catch((error: Error) => {
                            console.log(error);
                            vscode.window.showErrorMessage(error.toString());
                        });
                        break;
                    }
                    case 'getTts': {
                        googleTranslateUtils.getTts(message.parameter).then((data: Buffer) => {
                            let path = `${context.extensionPath}/sound`;
                            fs.mkdirSync(path, {
                                recursive: true,
                                mode: 0o777,
                            });
                            let file: string = `${path}/tts.mp3`
                            fs.writeFileSync(file, data, {
                                mode: 0o777,
                            });
                            child_process.exec(`ffplay -nodisp -autoexit "${file}"`);
                        });
                        break;
                    }
                }
            });

            panel.webview.postMessage({
                operation: 'init',
                parameter: {
                    sl: config.get<string>('source-language'),
                    tl: config.get<string>('target-language'),
                    q: selection,
                },
            });
        });
    }
};

export default {
    handler,
};