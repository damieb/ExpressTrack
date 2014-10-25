/*
 * Manage package
 * @author Yanis Adoui & Damien Leherisson
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
            var data = DB.fetch();
            console.log(data);
        },
        editPackage: function () {
            "use strict";
        },
        addPackage: function () {
            "use strict";
            var data = {
                alias: $.aliasInput.value,
                code: $.codeInput.value
            };
            DB.save(data);
            $.modal_addCode.close();
        },
        deletePackage: function () {
            "use strict";
        }
    };
    
DB.initialize();
manage.getList();

$.addCode.addEventListener('click', manage.openAddModal);
$.validateAdd.addEventListener('click', manage.addPackage);
