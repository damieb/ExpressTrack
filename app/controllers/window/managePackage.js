/*
 * Manage package
 * @author Yanis Adoui & Damien Lehericy
 * @version 1.0.0
 *
 */
var $,
    DB = Alloy.Globals.libs.DBmanager,
    manage = {
        openAddModal: function (e) {
            "use strict";
            $.modal_addCode.open();
        },
        getList: function () {
            "use strict";
            var data = DB.fetch(),
                dataContainer = [],
                wordOne = '',
                wordTwo,
                wordThree = '';
                
                if (data.length > 0) {
                    _.each(data, function (item) {
                        wordTwo = item.alias + ' (';
                        console.log(item);
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
                            url: item.postLink
                        };
                        dataContainer.push(Alloy.createController('elements/rowHome', arg).getView());
                        $.results.setData(dataContainer);
                    });
                }
        },
        editPackage: function () {
            "use strict";
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
            $.modal_addCode.close();
            manage.getList();
        },
        deletePackage: function () {
            "use strict";
        }
    };
    
DB.initialize();
manage.getList();

$.addCode.addEventListener('click', manage.openAddModal);
$.validateAdd.addEventListener('click', manage.addPackage);
