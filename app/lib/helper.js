/**
 * Helper methodes for all libraries
 * @author Yanis Adoui & Damien Lehericy
 * @version 1.0.2
 *
 */
exports.methods = {
    isValid: function (value) {
        "use strict";
        return (_.isUndefined(value) || _.isEmpty(value) || _.isNull(value)) ? false : true;
    },
    transportersRgx: {
        colissimo: {
            regex: '[a-z0-9]{11,13}',
            options: 'i'
        }
    },
    whatIs: function (code) {
        "use strict";
        if (!exports.methods.isValid(code)) return false;
        var transporters = [];
        _.each(exports.methods.transportersRgx, function (data, transporter) {
            if (new RegExp(data.regex, data.options).test(code)) {
                transporters.push(transporter);
            }
        });
        return transporters;
    }
};