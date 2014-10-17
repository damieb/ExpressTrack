/**
 * Tracking of package Colissimo
 * @author Yanis Adoui
 * 
 * @param  {string}     code        The tracking code provided by the user
 * @param  {string}     key         Current necessary key to access the API
 * @param  {function}   callback    Result return by API
 * @return {object}     An object with three information: the numeric code, text response, the JSON response (or boolean)
 *
 * Demo : 8G45430516790
 */
var helper = require('helper');
exports.utilities = {
    format: '[a-z0-9]{11,13}',
    getTracking: function (code, key, callback) {
        if (!helper.methods.isValid(code) || !helper.methods.isValid(key)) {
            return {
                code: 403,
                state: 'A key and a valid code are required to access the API.',
                response: false
            };
        }
        API = {
            url: 'http://yanisadouiudy.power-heberg.com/api_colissimo/?code=' + code + '&key=' + key,
            data: false,
            client: Ti.Network.createHTTPClient({
                onload: function (e) {
                    return callback({
                        code: 200,
                        state: 'The application received a response from the API.',
                        response: JSON.parse(this.responseText)
                    });
                },
                onerror: function (e) {
                    return callback({
                        code: 500,
                        state: 'An internal error occurred, check your internet connection.',
                        response: false
                    });
                }
            })
        }
        if (!new RegExp(exports.utilities.format, 'i').test(code)) {
            return callback({
                code: 403,
                state: 'Please, enter a valid code for Colissimo.',
                response: false
            });
        }
        API.client.open('GET', API.url);
        API.client.send();
    }
};