import * as vscode from 'vscode';
import googleTranslateUtils from '../utils/google-translation-utils.js';

const handler: Function = (context: vscode.ExtensionContext): void => {
    let selection: string | undefined = vscode.window.activeTextEditor?.document.getText(vscode.window.activeTextEditor?.selection);
    let config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('translation');
    googleTranslateUtils.getTranslate({
        sl: config.get<string>('source-language'),
        tl: config.get<string>('target-language'),
        q: selection,
    }).then((data: any) => {
        let message = `${selection} 💬 ${data.sentences[0].trans} `;
        if (data.alternative_translations) data.alternative_translations[0].alternative.forEach((i: any) => message += `🔹 ${i.word_postproc} `);
        vscode.window.showInformationMessage(message);
    }).catch((error: Error) => {
        console.log(error);
        vscode.window.showErrorMessage(error.toString());
    });
};

export default {
    handler,
};