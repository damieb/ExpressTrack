/**
 * Helper methodes for all libraries
 * @author Yanis Adoui & Damien Lehericy
 * @version 1.0.1
 * 
 */
exports.methods = {
	isValid: function(value) {
	    "use strict";
		return (typeof value === undefined || !value.length || value === null) ? false : true;
	},
	transportersRgx: {
		colissimo: '[a-z0-9]{11,13}'
	},
	whatIs: function(code) {
	    "use strict";
		if (!exports.methods.isValid(code)) {
		    return false;
		}
		//TODO explorer l'objet transportsRgx
		if(new RegExp(exports.methods.transportersRgx[transporter], 'i').test(code)) {
			return 'colissimo';
		}
		/**
		 * Un switch pour organiser les différentes libs/regex à mettre en place au lieu des ifelse
		 * @FIXME 
		 */
			/*case new RegExp(includes.colissimo.utilities.format, 'i').test(code):
				return 'colissimo';
				break;
			default:
				console.log(code);
				return false;
				break;*/
	}
};