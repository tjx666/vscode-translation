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
    array.forEach(i => {
        let truePath = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, i.path)));
        result = result.replace(i.src, truePath);
    });
    return result;
}

module.exports = {
    renderReources,
};