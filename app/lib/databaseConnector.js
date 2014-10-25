var info = {
        dbname: 'expressTrack'
    };

exports.DBmanager = {   
    initialize: function () {
        "use strict";
        var db = Ti.Database.open(info.dbname);
        db.execute('CREATE TABLE IF NOT EXISTS packages(id INTEGER PRIMARY KEY, alias TEXT, code TEXT);');
        db.close();
    },
    
    fetch: function (id) {
        "use strict";
        var db = Ti.Database.open(info.dbname),
            request,
            results = [];
        if (id === undefined) {
            request = db.execute('SELECT id,alias,code FROM packages');
            while (request.isValidRow()){
                results.push({
                    id   : request.fieldByName('id'),
                    text : request.fieldByName('alias'),
                    title: request.fieldByName('code')
                });
                request.next();
            }
        } else {
            request = db.execute('SELECT id,alias,code FROM packages WHERE id=?', id);
        }
        db.close();
        return results;
    },
    
    save: function (data) {
        "use strict";
        var db = Ti.Database.open(info.dbname);
        
        if (data.id === undefined) {
            db.execute('INSERT INTO packages (alias,code) VALUES (?,?)', data.alias, data.code);
        } else {
            db.execute('UPDATE packages SET alias=? code=? WHERE id=?', data.alias, data.code, data.id);
        }
        db.close();
    },
    
    remove: function (data) {
        "use strict";
        var db = Ti.Database.open(info.dbname);
        db.execute('DELETE FROM packages WHERE id=?', data.id);
        db.close();
    }
};
