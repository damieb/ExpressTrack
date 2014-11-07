/**
 * Common library
 * @author Yanis Adoui & Damien Lehericy
 * @version 1.0.0
 *
 * @param  {string}     transporter The current transporter
 * @param  {string}     method      Method of request (GET, POST, DELETE, ...)
 * @param  {object}     request     Information with respect to the url
 * @param  {string}     code        Tracking code
 * @return {function}   An object with three information: the numeric code, text response, the JSON response (or boolean)
 *
 * NOTE : Mapping request
 *  request = {
 *      protocol: 'http',
 *      domain: 'google.fr',
 *      path: '/track/',
 *      params: '?toto=titi&tutu=tata'
 *  }
 *
 */
var isValid = Alloy.Globals.libs.helper.methods.isValid, API, code;
exports.client = function (transporter, code, method, request, callback) {
    "use strict";
    if (!isValid(method) || !isValid(transporter) || !isValid(request)) {
        return {
            code: 403,
            state: 'A valid params are required to access the API.',
            response: false
        };
    }
    //# TODO : Prise en charge de la méthode POST.
    API = {
        url: request.protocol + request.domain + request.path + request.params,
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
    };
    if (!new RegExp(Alloy.Globals.libs.helper.methods.transportersRgx[transporter], 'i').test(code)) {
        return callback({
            code: 403,
            state: 'Please, enter a valid code for ' + transporter + ' .',
            response: false
        });
    }
    API.client.open(method, API.url);
    API.client.send();
};