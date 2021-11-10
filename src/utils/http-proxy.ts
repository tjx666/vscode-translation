import * as http from 'http';
import * as https from 'https';
import { URL } from 'url';
import * as vscode from 'vscode';

const handleResponse: Function = (response: http.IncomingMessage, resolve: Function, reject: Function): void => {
    let chunks: Array<any> = [];
    response.on('data', (data: any) => chunks.push(data));
    response.on('end', () => resolve(Buffer.concat(chunks)));
    response.on('error', (error: Error) => reject(error));
};

/**
 * http proxy for get request.
 * @param {*} api URL of request
 * @param {*} enableProxy enable to use proxy
 * @returns 
 */
const doGet: Function = (api: string, enableProxy: boolean): Promise<Buffer> => {
    let proxyUrl: URL = new URL(vscode.workspace.getConfiguration('translation').get<string>('proxy-url') || '');
    let apiUrl: URL = new URL(api);

    let proxyClient: any = proxyUrl.protocol === 'http:' ? http : https;
    let apiClient: any = apiUrl.protocol === 'http:' ? http : https;

    return new Promise<Buffer>((resolve: Function, reject: Function) => {
        if (enableProxy) {
            let request: http.ClientRequest = proxyClient.request(proxyUrl.href, {
                method: 'CONNECT',
                path: apiUrl.hostname + ':' + (apiUrl.port ? apiUrl.port : apiUrl.protocol === 'http:' ? '80' : '443'),
            });
            request.on('connect', (response, socket, head) => {
                let requestKeep: http.ClientRequest = apiClient.request(apiUrl.href, {
                    method: 'GET',
                }, (response: http.IncomingMessage) => {
                    handleResponse(response, resolve, reject);
                });
                requestKeep.on('error', (error: Error) => reject(error));
                requestKeep.end();
            });
            request.on('error', error => reject(error));
            request.end();
        } else {
            let requestKeep: http.ClientRequest = apiClient.request(apiUrl.href, {
                method: 'GET',
            }, (response: http.IncomingMessage) => {
                handleResponse(response, resolve, reject);
            });
            requestKeep.on('error', (error: Error) => reject(error));
            requestKeep.end();
        }
    });
};

export default {
    doGet,
};