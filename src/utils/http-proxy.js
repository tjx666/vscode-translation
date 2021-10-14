const http = require('http');
const https = require('https');
const { URL } = require('url');
const vscode = require('vscode');

/**
 * http proxy for get request.
 * @param {*} api URL of request
 * @param {*} enableProxy enable to use proxy
 * @returns 
 */
const doGet = (api, enableProxy) => {
    let proxyUrl = new URL(vscode.workspace.getConfiguration('translation').get('proxy-url'));
    let apiUrl = new URL(api);

    let proxyClient = proxyUrl.protocol === 'http:' ? http : https;
    let apiClient = apiUrl.protocol === 'http:' ? http : https;

    return new Promise((resolve, reject) => {
        if (enableProxy) {
            let request = proxyClient.request(proxyUrl.href, {
                method: 'CONNECT',
                path: apiUrl.hostname + ':' + (apiUrl.port ? apiUrl.port : apiUrl.protocol === 'http:' ? '80' : '443'),
            });
            request.on('connect', (response, socket, head) => {
                let requestKeep = apiClient.request(apiUrl.href, {
                    method: 'GET',
                    socket,
                }, response => {
                    let buffer = '';
                    response.on('data', data => buffer += data);
                    response.on('end', () => resolve(buffer));
                    response.on('error', error => reject(error));
                });
                requestKeep.on('error', error => reject(error));
                requestKeep.end();
            });
            request.on('error', error => reject(error));
            request.end();
        } else {
            let requestKeep = apiClient.request(apiUrl.href, {
                method: 'GET',
            }, response => {
                let buffer = '';
                response.on('data', data => buffer += data);
                response.on('end', () => resolve(buffer));
                response.on('error', error => reject(error));
            });
            requestKeep.on('error', error => reject(error));
            requestKeep.end();
        }
    });
};

module.exports = {
    doGet,
};