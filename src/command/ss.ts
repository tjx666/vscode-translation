import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import webviewUtils from '../utils/webview-utils.js';
import httpProxy from '../utils/http-proxy.js';
import { resolve } from 'path';
import { rejects } from 'assert';

let panel: vscode.WebviewPanel | null = null;

const handler: Function = (context: vscode.ExtensionContext): void => {
    if (panel) {
        panel.reveal();
    } else {
        fs.readFile(`${context.extensionPath}/src/webview/ss.html`, (error: NodeJS.ErrnoException | null, content: Buffer) => {
            if (error) {
                console.log(error);
                vscode.window.showErrorMessage(error.message);
                return;
            }

            panel = vscode.window.createWebviewPanel('ss', 'SS', vscode.ViewColumn.Beside, {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath))],
                enableFindWidget: true,
            });
            panel.webview.html = webviewUtils.renderReources(context, panel, content.toString(), []);
            panel.onDidDispose(() => panel = null);

            panel.webview.onDidReceiveMessage(message => {
                switch (message.operation) {
                    case 'query': {
                        let config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('translation');
                        let urls: Array<any> | undefined = config.get<Array<any>>('ss')

                        let promises: Array<Promise<string>> = [];
                        urls?.forEach(i => {
                            promises.push(new Promise<string>((resolve: Function, reject: Function) => {
                                httpProxy.doGet(i.url, i.enableProxy)
                                    .then((data: Buffer) => {
                                        resolve(i.enableBase64Decode ? Buffer.from(data.toString(), 'base64').toString() : data.toString());
                                    })
                                    .catch((error: Error) => reject(error));
                            }));
                        });

                        let result: Array<any> = [];
                        Promise.all<string>(promises).then((allData: Array<string>) => {
                            allData.forEach((data: string) => {
                                let arr: Array<string> | null = data.match(/(?:^|\n)ss:\/\/.+/g);
                                // distinct
                                arr = [...new Set(arr)];
                                arr.forEach((i: string) => {
                                    let t: string = i.trim();
                                    result.push({
                                        checked: false,
                                        origin: t,
                                        decode: decodeURIComponent(t),
                                    });
                                });
                            });

                            panel?.webview.postMessage({
                                operation: 'result',
                                parameter: {
                                    list: result,
                                },
                            });
                        }).catch((error: Error) => {
                            console.log(error);
                            vscode.window.showErrorMessage(error.message)
                        });

                        break;
                    }
                }
            });

            panel.webview.postMessage({
                operation: 'init',
            });
        });
    }
};

export default {
    handler,
};