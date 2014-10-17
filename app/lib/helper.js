/**
 * Helper methodes for all libraries.
 * @version 1.0.0
 * @author Yanis Adoui
 *
 * NOTE : Please, if you want include lib/helper, use the object "includes".
 */
var includes = {
	colissimo: require('colissimo')
}
exports.methods = {
	isValid: function(value) {
		return (typeof value == 'undefined' || !value.length || value == null) ? false : true;
	},
	whatIs: function(code) {
		if(!exports.methods.isValid(code)) return false;
		if(new RegExp(includes.colissimo.utilities.format, 'i').test(code)) {
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