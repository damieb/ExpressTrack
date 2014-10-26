/*
 * Search package
 * @author Yanis Adoui & Damien Le Hérisson
 * @version 1.0.0
 *
 */
var search = {
    helper: Alloy.Globals.libs.helper,
    parameters: require('transporterProvider'),
    add: function () {
        "use strict";
    },
    load: function () {
        "use strict";
        var librarie, currentParams;
        $.searchLoad.addEventListener('click', function (e) {
            $.searchCode.blur();
            if (!search.helper.methods.isValid($.searchCode.value)) return alert('Indiquez votre numéro de suivi.');
            Alloy.Globals.loading.show('Patientez, nous recherchons...', false);
            if (librarie = search.helper.methods.whatIs($.searchCode.value)) {
                if (!search.helper.methods.isValid(librarie)) {
                    Alloy.Globals.loading.hide();
                    return alert('Livreur non-pris en charge !');
                } else if(librarie.length > 1) {
                    // TODO : Proposer à l'utilisateur une liste à puce pour sélectionner le livreur.
                } else {
                    librarie = librarie[0];
                }
                switch (librarie) {
                    case 'colissimo':
                        // TODO : Régler le problème de scope de transporterProvider
                        currentParams = search.parameters.of(librarie);
                        currentParams.request.params =+ $.searchCode.value;
                        Alloy.Globals.libs.transporters(currentParams.name, $.searchCode.value, currentParams.method, currentParams.request, function (data) {
                            // TODO : Récupérer les résultats et les afficher.
                            // Bien prévoir le cas ou il n'y a pas de résultats (ou autres erreurs).
                            // User de la DB pour proposer un enregistrement si ce n'est pas déjà le cas.
                            // Ensuite, on a terminé donc on affiche : 
                            // Alloy.Globals.loading.hide();
                        });
                    break;
                }
            }
        });
    }
};
search.load();