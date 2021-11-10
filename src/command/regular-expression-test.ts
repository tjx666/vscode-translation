import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import webviewUtils from '../utils/webview-utils.js';

let panel: vscode.WebviewPanel | null = null;

const handler: Function = (context: vscode.ExtensionContext): void => {
    if (panel) {
        panel.reveal();
    } else {
        fs.readFile(`${context.extensionPath}/src/webview/regular-expression-test.html`, (error: NodeJS.ErrnoException | null, content: Buffer) => {
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

export default {
    handler,
};