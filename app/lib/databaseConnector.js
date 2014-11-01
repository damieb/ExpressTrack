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
    
    fetch: function (id) {
        "use strict";
        var db = Ti.Database.open(info.dbname),
            request,
            results = [];
        if (id === undefined) {
            request = db.execute('SELECT id,alias,code, status, transporter FROM packages');
            while (request.isValidRow()){
                results.push({
                    id          : request.fieldByName('id'),
                    alias       : request.fieldByName('alias'),
                    code       : request.fieldByName('code'), //required
                    status      : request.fieldByName('status'), 
                    transporter : request.fieldByName('transporter') //required
                });
                request.next();
            }
        } else {
            request = db.execute('SELECT id,alias,code,status,transporter FROM packages WHERE id=?', id);
        }
        db.close();
        return results;
    },
    
    save: function (data) {
        "use strict";
        var db = Ti.Database.open(info.dbname);
        
        if (data.id === undefined) {
            db.execute(
                'INSERT INTO packages (alias,code,status,transporter) VALUES (?,?,?,?)',
                data.alias,
                data.code,
                data.status,
                data.transporter
            );
        } else {
            db.execute(
                'UPDATE packages SET alias=? code=? status=? WHERE id=?',
                data.alias,
                data.code,
                data.status,
                data.id
            );
        }
        db.close();
    },
    
    reset: function () {
        var db = Ti.Database.open(info.dbname);
        db.remove();
    },
    
    remove: function (data) {
        "use strict";
        var db = Ti.Database.open(info.dbname);
        db.execute('DELETE FROM packages WHERE code=?', data.code);
        db.close();
    }
};
