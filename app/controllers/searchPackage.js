/*
 * Search package
 * @author Yanis Adoui & Damien Leherisson
 * @version 1.0.0
 *
 */
var search = {
    add: function () {},
    search: function () {
        $.search.addEventListener('click', function (e) {
            if (!helper.methods.isValid($.codeInput.value)) return alert('Veuillez indiquer votre numéro de suivi.');
            $.load.text = 'Chargement...';
            if (librarie = helper.methods.whatIs($.codeInput.value)) {
                switch (librarie) {
                case 'colissimo':
                    libraries.colissimo.api.getTracking($.codeInput.value, libraries.colissimo.key, function (data) {
                        var sectionExplain = Ti.UI.createTableViewSection({
                            headerTitle: 'Suivi de votre colis'
                        });
                        for (c = 0; c < data.response.length; c++) {
                            sectionExplain.add(Ti.UI.createTableViewRow({
                                title: data.response[c].date + ' : ' + data.response[c].message + ' | Lieu : ' + data.response[c].lieu
                            }));
                        }
                        //#! TODO : Supprimer la précédente table, sinon les résultats de cumulent.
                        var table = Ti.UI.createTableView({
                            top: 180,
                            data: [sectionExplain]
                        });
                        $.load.text = '';
                        $.searchWindow.add(table);
                    });
                    break;
                case 'fedex':
                    break;
                case 'poste':
                    break;
                default:
                    $.load.text = 'Livreur non-pris en charge.';
                    break;
                }
            } else {
                $.load.text = 'Une erreur est survenue, le livreur ne semble pas pris en charge.';
            }
        });
    }
};