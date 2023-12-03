class Validation {

        /**
     * Validation du formulaire
     * @returns
     */
        valideFormulaire(elForm,elTache, elImportance) {

            let estValide = true;
    
            /* Input 'Nouvelle tâche' */
            if (elTache.value == '') {
                elTache.parentNode.classList.add('error');
                estValide = false;
            } else {
                if (elTache.parentNode.classList.contains('error')) elTache.parentNode.classList.remove('error');
            }
    
            /* Inputs Radio 'Importance' */
            let elCheckedImportance = elForm.querySelector('input[name="importance"]:checked');
    
            if (elCheckedImportance) {
                if (elImportance[0].parentNode.classList.contains('error')) elImportance[0].parentNode.classList.remove('error');
            } else {
                elImportance[0].parentNode.classList.add('error');
                estValide = false;
            }
    
            return estValide;
        }
}

export const { valideFormulaire } = new Validation