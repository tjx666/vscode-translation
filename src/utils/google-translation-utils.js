const https = require('https');

const TRANSLATE_API = 'https://translate.googleapis.com/translate_a/single';
const TRANSLATE_COMMON_PARAM =
    'client=dict-chrome-ex'
    + '&dj=1'
    + '&ie=utf8'
    + '&oe=utf8'
    + '&dt=t&dt=rm&dt=bd&dt=ex&dt=md&dt=ss&dt=at'
    ;

const TTS_API = 'https://translate.googleapis.com/translate_tts';
const TTS_COMMON_PARAM =
    'client=dict-chrome-ex'
    + '&ie=utf8'
    ;

/**
 * Get translation from google.
 * @param param {tl: target-language, sl: source-language, q: query}  
 * @returns 
 */
const getTranslate = param => {
    return new Promise((resolve, reject) => {
        param.q = encodeURIComponent(param.q.replace(/\r\n/g, ' ').replace(/\n/g, ' '));
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

/**
 * Get pronunciation from google.
 * @param param {tl: target-language, sl: source-language, q: query}  
 * @returns 
 */
const getTts = param => {
    return new Promise((resolve, reject) => {
        param.q = encodeURIComponent(param.q.replace(/\r\n/g, ' ').replace(/\n/g, ' '));
        let query = Object.keys(param).map(k => `&${k}=${param[k]}`).join();
        let request = https.get(`${TTS_API}?${TTS_COMMON_PARAM}${query}`, response => {
            let buffer = '';
            response.on('data', data => buffer += data);
            response.on('end', () => {
                try {
                    // TODO
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