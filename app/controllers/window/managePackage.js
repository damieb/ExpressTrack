/*
 * Manage package
 * @author Yanis Adoui & Damien Lehericy
 * @version 1.0.0
 *
 */
/*jslint nomen: true*/
/*global _, console */
var $,
    DB = Alloy.Globals.libs.DBmanager,
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
                
                if (refresh) {
                    $.results.setData([]);   
                }
                
                if (data.length > 0) {
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
                        var arg = {
                            title: wordOne + wordTwo + wordThree,
                            url: item.postLink,
                            id: item.id
                        };
                        $.results.appendRow(Alloy.createController('elements/rowHome', arg).getView());
                    });
                }
        },
        
        editPackage: function (event) {
            "use strict";
            var data = {
                alias: $.aliasEditInput.value,
                id : $.aliasEditInput.db_id
            };
            DB.save(data);
            $.modal_editCode.close();
            manage.getList(true);
        },
        
        addPackage: function () {
            "use strict";
            var data = {
                alias: $.aliasInput.value,
                code: $.codeInput.value,
                status : 'En cours',
                transporter : 'Collisimo'
            };
            DB.save(data);
            $.aliasInput.value = '';
            $.codeInput.value = '';
            $.modal_addCode.close();
            manage.getList(true);
        },
        
        deletePackage: function (event) {
            "use strict";
            DB.remove(event.row.id);
            $.results.deleteRow(event.row);  
        },
        
        /**
         * @description Check gestures
         * @param {Object} event
         */
        swipeAction: function (event) {
            "use strict";
            // Right swipe = delete
            var data, i;
            if (event.direction === 'right') {
                manage.deletePackage(event);
            }
            // Left swipe = edit
            if (event.direction === 'left') {
                data = DB.fetch(event.row.id);
                $.aliasEditInput.value = data[0].alias;
                $.aliasEditInput.db_id = event.row.id;
                $.modal_editCode.open();
            } 
        }
    };
    
DB.initialize();
manage.getList(false);

$.addCode.addEventListener('click', manage.openAddModal);
$.results.addEventListener('swipe', manage.swipeAction);
$.validateAdd.addEventListener('click', manage.addPackage);
$.validateEdit.addEventListener('click', manage.editPackage);