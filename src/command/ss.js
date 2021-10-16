const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const webviewUtils = require('../utils/webview-utils.js');
const httpProxy = require('../utils/http-proxy.js');

let panel = null;

const handler = context => {
    if (panel) {
        panel.reveal();
    } else {
        fs.readFile(`${context.extensionPath}/src/webview/ss.html`, (error, content) => {
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
                        let config = vscode.workspace.getConfiguration('translation');
                        let urls = config.get('ss-urls')
                        let enableProxy = config.get('ss-enable-proxy');
                        let enableDecode = config.get('ss-enable-base64decode');

                        let promises = [];
                        urls.forEach(i => {
                            promises.push(httpProxy.doGet(i, enableProxy));
                        });

                        let result = [];
                        Promise.all(promises).then(allData => {
                            allData.forEach(data => {
                                let raw = enableDecode ? Buffer.from(data.toString(), 'base64').toString() : data.toString();
                                let arr = raw.match(/ss:\/\/.+/g);
                                arr.forEach(i => {
                                    let t = i.trim();
                                    result.push({
                                        checked: false,
                                        origin: t,
                                        decode: decodeURIComponent(t),
                                    });
                                });
                            });

                            panel.webview.postMessage({
                                operation: 'result',
                                parameter: {
                                    list: result,
                                },
                            });
                        }).catch(error => {
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

module.exports = {
    handler,
};