const vscode = require('vscode');
const path = require('path');

/**
 * Render webview resource
 * @param context context of plugin
 * @param panel webview panel
 * @param content webview html content
 * @param array [{src: src-uri-text-in-html, path: true-uri-path}]
 * @returns renderered content
 */
const renderReources = (context, panel, content, array) => {
    let result = '' + content;
    [...[
        {
            src: 'vscode-webview-ui-toolkit',
            path: 'node_modules/@vscode/webview-ui-toolkit/dist/toolkit.min.js',
        },
        {
            src: 'vscode-codicons',
            path: 'node_modules/@vscode/codicons/dist/codicon.css',
        },
        {
            src: 'js/vue3.js',
            path: 'src/webview/js/vue@next.min.js',
        },
        {
            src: 'js/common.js',
            path: 'src/webview/js/common.js',
        },
        {
            src: 'css/common.css',
            path: 'src/webview/css/common.css',
        },
    ], ...array].forEach(i => {
        let truePath = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, i.path)));
        result = result.replace(i.src, truePath);
    });
    return result;
}

module.exports = {
    renderReources,
};