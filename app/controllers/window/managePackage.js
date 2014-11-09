/*
 * Manage package
 * @author Yanis Adoui & Damien Lehericy
 * @version 1.0.0
 *
 */
var DB = Alloy.Globals.libs.DBmanager,
    manage = {
        openAddModal: function (e) {
            "use strict";
            $.modal_addCode.open();
        },
        /**
         * @description refresh list of packages
         * @param {Boolean} refresh
         */
        getList: function (refresh) {
            "use strict";
            var data = DB.fetch(),
                dataContainer = [],
                wordOne = '',
                wordTwo,
                wordThree = '';
                
            (refresh) ? $.results.setData([]) : '';
            
            if (!_.isEmpty(data)) {
                _.each(data, function (item) {
                    wordTwo = item.alias + ' (';
                    if (item.transporter) {
                        wordOne = item.transporter + ' - ';
                    }
                    if (item.alias === '') {
                        wordTwo = item.code;
                    }
                    if (item.status) {
                        wordThree = item.status + ')';
                    }
                    var args = {
                        title: wordOne + wordTwo + wordThree,
                        url: item.postLink,
                        id: item.id
                    };
                    $.results.appendRow(Alloy.createController('elements/rowHome', args).getView());
                });
            }
        },
        
        editPackage: function (event) {
            "use strict";
            var data = {
                alias: $.aliasEditInput.value,
                id : $.aliasEditInput.db_id
            },
            res = DB.save(data);
            console.log(res);
            if (res === 42) {
                alert('Vérifier vos informations !');
            } else if (typeof res === 'undefined') {
                $.modal_editCode.close();
                manage.getList(true);
            } else {
                alert('Vérifier vos informations !');
            }
        },
        
        addPackage: function () {
            "use strict";
            // TODO : Passer par tout le process de vérification et dynamique
            var data = {
                alias: $.aliasInput.value,
                code: $.codeInput.value,
                status : 'En cours', 
                transporter : 'Collisimo'
            },
            res = DB.save(data);
            if (res === 42) {
                alert('Vous devez rentrer un code de suivi !');
            } else if (typeof res === 'undefined') {
                $.aliasInput.value = '';
                $.codeInput.value = '';
                $.modal_addCode.close();
                manage.getList(true);
            } else {
                alert('Vérifier vos informations !');
            }
        },
        
        deletePackage: function (event) {
            "use strict";
            if (typeof event.row !== 'undefined') {
                if (typeof event.row.id !== 'undefined') {
                    var res = DB.remove(event.row.id);
                    if (typeof res === 'undefined') {
                        $.results.deleteRow(event.row); 
                    } else if (res === 42) {
                        alert('Impossible de supprimer le code de suivi !');
                    }
                }
            }
        },
        /**
         * @description Check gestures
         * @param {Object} event
         */
        swipeAction: function (event) {
            "use strict";
            var data, i;
            console.log(event.direction);
            switch (event.direction) {
                case 'right':
                    manage.deletePackage(event);
                break;
                case 'left':
                if (typeof event.row !== 'undefined') {
                    if (typeof event.row.id !== 'undefined') {
                        data = DB.fetch(event.row.id);
                        $.aliasEditInput.value = data[0].alias;
                        $.aliasEditInput.db_id = event.row.id;
                        $.modal_editCode.open();
                    }
                }
                break;
                case 'up':
                    console.log('up swipe');
                break;
                case 'down':
                    console.log('down swipe');
                break;
            }
        },
        cleanDb: function (event) {
            "use strict";
            var reset = DB.reset(),
                init;
            if (typeof reset === 'undefined') {
               init = DB.initialize();
               if (typeof init === 'undefined') {
                   manage.getList(true);
               } else {
                   alert('Impossible de réinitialiser vos suivis !');
               }
            } else {
                alert('Impossible de réinitialiser vos suivis !');
            }
        }
    };
    
DB.initialize();
manage.getList(false);

$.addCode.addEventListener('click', manage.openAddModal);
$.validateAdd.addEventListener('click', manage.addPackage);
$.validateEdit.addEventListener('click', manage.editPackage);
$.results.addEventListener('swipe', manage.swipeAction);
Ti.Gesture.addEventListener('shake', manage.cleanDb);
