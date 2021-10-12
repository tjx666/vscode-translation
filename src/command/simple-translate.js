const vscode = require('vscode');
const googleTranslateUtils = require('../utils/google-translation-utils.js');

const handler = context => {
    let selection = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
    selection = selection.replace(/\r\n/g, ' ').replace(/\n/g, ' ');
    let config = vscode.workspace.getConfiguration('translation');
    googleTranslateUtils.getTranslate({
        sl: config.get('source-language'),
        tl: config.get('target-language'),
        q: selection,
    }).then(data => {
        let message = `${selection} ⇨ ${data.sentences[0].trans} `;
        if (data.alternative_translations) data.alternative_translations[0].alternative.forEach(i => message += ` ◇ ${i.word_postproc} `);
        vscode.window.showInformationMessage(message);
    }).catch(error => {
        vscode.window.showErrorMessage(error);
    });
};

module.exports = {
    handler,
};