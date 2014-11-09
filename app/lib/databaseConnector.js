/*
 * Database Manager
 * @author Yanis Adoui & Damien Lehericy
 * @version 1.0.1
 *
 */
var info = {
        dbname: 'expressTrack'
    };

exports.DBmanager = {   
    initialize: function () {
        "use strict";
        var db = Ti.Database.open(info.dbname);
        db.execute('CREATE TABLE IF NOT EXISTS packages(id INTEGER PRIMARY KEY, alias TEXT, code TEXT UNIQUE, status TEXT, transporter TEXT);');
        db.close();
    },
    
    /**
     * @description fetch packages
     * @param {Object} id
     */
    fetch: function (data) {
        "use strict";
        var db = Ti.Database.open(info.dbname),
            request,
            results = [];
        if (_.isUndefined(data)) {
            request = db.execute('SELECT id, alias, code, status, transporter FROM packages');
            while (request.isValidRow()) {
                results.push({
                    id          : request.fieldByName('id'),
                    alias       : request.fieldByName('alias'),
                    code        : request.fieldByName('code'), //# required
                    status      : request.fieldByName('status'), 
                    transporter : request.fieldByName('transporter') //# required
                });
                request.next();
            }
        } else {
            request = (_.isNumber(data)) ? db.execute('SELECT id, alias, code, status, transporter FROM packages WHERE id = ?', data) : db.execute('SELECT id, alias, code, status, transporter FROM packages WHERE code = ?', data);
            if(request.rowCount > 0) {
                results.push({
                    id          : request.fieldByName('id'),
                    alias       : request.fieldByName('alias'),
                    code        : request.fieldByName('code'), //# required
                    status      : request.fieldByName('status'), 
                    transporter : request.fieldByName('transporter') //# required
                });
            }
        }
        return results;
    },
    
    /**
     * @description Save or update your data, by passing a simple object
     * @param {Object} data
     */
    save: function (data) {
        "use strict";
        var db = Ti.Database.open(info.dbname);
        if (typeof data.id === 'undefined') {
            try {
                if (typeof data.code !== 'undefined' && data.code !== '') {
                    db.execute(
                        'INSERT INTO packages (alias,code,status,transporter) VALUES (?,?,?,?)',
                        data.alias,
                        data.code,
                        data.status,
                        data.transporter
                    );
                } else {
                    throw 42;
                }
            } catch (e) {
                   return e;
            }
        } else {
            try {
                if (typeof data.id !== 'undefined' && data.alias !== 'undefined' && data.alias !== '') {
                    db.execute(
                        'UPDATE packages SET alias=? WHERE id=?',
                        data.alias,
                        data.id
                    );
                } else {
                    throw 42;
                }
            } catch (error) {
                return error;
            }
        }
        db.close();
    },
    
    reset: function () {
        "use strict";
        try {
            var db = Ti.Database.open(info.dbname);
            db.remove();
        } catch (e) {
            return e;
        }
    },
    
    remove: function (data) {
        "use strict";
        var db = Ti.Database.open(info.dbname);
        try {
            if (typeof data !== 'undefined' && data !== '') {
                db.execute('DELETE FROM packages WHERE id=?', data);
            } else {
                throw 42;
            }
        } catch (e) {
            return e;
        }
        db.close();
    }
};
