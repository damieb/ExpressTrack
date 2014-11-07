/**
 * Transporters informations
 * @author Yanis Adoui & Damien Lehericy
 * @version 1.0.0
 */
/*jslint nomen: true*/
/*global _ */
var libraries = {
    colissimo: {
        request: {
            name: 'colissimo',
            method: 'GET',
            protocol: 'http://',
            domain: 'yanisadouiudy.power-heberg.com',
            path: '/api_colissimo/',
            params: '?code='
        }
    }
};
exports.of = function (name) {
    "use strict";
    if(_.isUndefined(libraries[name])) return false;
    return libraries[name];
};