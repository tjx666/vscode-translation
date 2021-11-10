import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import webviewUtils from '../utils/webview-utils.js';
import httpProxy from '../utils/http-proxy.js';

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
                        let urls: Array<string> | undefined = config.get<Array<string>>('ss-urls')
                        let enableProxy: boolean | undefined = config.get<boolean>('ss-enable-proxy');
                        let enableDecode: boolean | undefined = config.get<boolean>('ss-enable-base64decode');

                        let promises: Array<Promise<Buffer>> = [];
                        urls?.forEach(i => {
                            promises.push(httpProxy.doGet(i, enableProxy));
                        });

                        let result: Array<any> = [];
                        Promise.all<Buffer>(promises).then((allData: Array<Buffer>) => {
                            allData.forEach((data: Buffer) => {
                                let raw: string = enableDecode ? Buffer.from(data.toString(), 'base64').toString() : data.toString();
                                let arr: Array<string> | null = raw.match(/(?:^|\n)ss:\/\/.+/g);
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