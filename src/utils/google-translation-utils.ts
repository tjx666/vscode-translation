import httpProxy from '../utils/http-proxy.js';
import * as vscode from 'vscode';

const TRANSLATE_API: string = 'https://translate.googleapis.com/translate_a/single';
const TRANSLATE_COMMON_PARAM: string =
    'client=gtx'
    + '&dj=1'
    + '&ie=utf8'
    + '&oe=utf8'
    + '&dt=t&dt=rm&dt=bd&dt=ex&dt=md&dt=ss&dt=at'
    ;

const TTS_API: string = 'https://translate.googleapis.com/translate_tts';
const TTS_COMMON_PARAM: string =
    'client=gtx'
    + '&ie=utf8'
    ;

const getEnableProxy: Function = (): void => vscode.workspace.getConfiguration('translation').get('enable-proxy');

/**
 * Get translation from google.
 * @param param {tl: target-language, sl: source-language, q: query}  
 * @returns 
 */
const getTranslate: Function = (param: any): Promise<any> => {
    return new Promise<any>((resolve: Function, reject: Function) => {
        param.q = encodeURIComponent(param.q.replace(/\r\n/g, ' ').replace(/\n/g, ' '));
        let query: string = Object.keys(param).map(k => `&${k}=${param[k]}`).join('');
        httpProxy.doGet(`${TRANSLATE_API}?${TRANSLATE_COMMON_PARAM}${query}`, getEnableProxy()).then((data: Buffer) => {
            let json: any = JSON.parse(data.toString());
            resolve(json);
        }).catch((error: Error) => reject(error));
    });
};

/**
 * Get pronunciation from google.
 * @param param {tl: target-language, sl: source-language, q: query}  
 * @returns 
 */
const getTts: Function = (param: any): Promise<Buffer> => {
    return new Promise<Buffer>((resolve: Function, reject: Function) => {
        param.q = encodeURIComponent(param.q.replace(/\r\n/g, ' ').replace(/\n/g, ' '));
        let query: string = Object.keys(param).map(k => `&${k}=${param[k]}`).join('');
        httpProxy.doGet(`${TTS_API}?${TTS_COMMON_PARAM}${query}`, getEnableProxy()).then((data: Buffer) => {
            resolve(data);
        }).catch((error: Error) => reject(error));
    });
};

export default {
    getTranslate,
    getTts,
};