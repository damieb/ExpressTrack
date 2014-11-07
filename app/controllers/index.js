/*
 * Main file of application
 * @author Yanis Adoui & Damien Lehericy
 * @version 1.0.1
 *
 */
$.index.open();
var $,
    DB = Alloy.Globals.libs.DBmanager,
    options = {
        reset: function () {
            "use strict";
            DB.reset();
            DB.initialize();
        }
    };
  
//# This function reset your database when you start your app
//# options.reset();
