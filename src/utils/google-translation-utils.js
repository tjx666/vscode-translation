const https = require('https');

const TRANSLATE_API = 'https://translate.googleapis.com/translate_a/single';
const TRANSLATE_COMMON_PARAM =
    'client=gtx'
    + '&dj=1'
    + '&ie=utf8'
    + '&oe=utf8'
    + '&dt=t&dt=rm&dt=bd&dt=ex&dt=md&dt=ss&dt=at'
;

const TTS_API = 'https://translate.googleapis.com/translate_tts';
const TTS_COMMON_PARAM = 
    'client=gtx'
    + '&ie=utf8'
;

const getTranslate = param => {
    return new Promise((resolve, reject) => {
        param.q = encodeURIComponent(param.q);
        let query = Object.keys(param).map(k => `&${k}=${param[k]}`).join('');
        let request = https.get(`${TRANSLATE_API}?${TRANSLATE_COMMON_PARAM}${query}`, response => {
            let buffer = '';
            response.on('data', data => buffer += data);
            response.on('end', () => {
                try {
                    let json = JSON.parse(buffer);
                    resolve(json);
                } catch (error) {
                    reject(buffer);
                }
            });
            response.on('error', error => reject(error));
        });
        request.on('error', error => reject(error));
        request.end();
    });
};

const getTts =  param => {
    return new Promise((resolve, reject) => {
        param.q = encodeURIComponent(param.q.replace(/\r\n/g, ' ').replace(/\n/g, ' '));
        let query = Object.keys(param).map(k => `&${k}=${param[k]}`).join();
        let request = https.get(`${TTS_API}?${TTS_COMMON_PARAM}${query}`, response => {
            let buffer = '';
            response.on('data', data => buffer += data);
            response.on('end', () => {
                try {
                    // todo
                    let json = JSON.parse(buffer);
                    resolve(json);
                } catch (error) {
                    reject(buffer);
                }
            });
            response.on('error', error => reject(error));
        });
        request.on('error', error => reject(error));
        request.end();
    });
};

module.exports = {
    getTranslate,
    getTts,
};