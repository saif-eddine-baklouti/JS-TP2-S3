
import Tache from "./Tache.js";


export default class Formulaire {
    constructor(el) {
        
        this._el = el;
        this._elInputTache = this._el.tache;
        this._elInputDescription = this._el.description;
        this._elsInputImportance = this._el.querySelectorAll('input[name="importance"]');

        this._elBouton = this._el.querySelector('[data-js-btn]'); 
        
        this._elTaches = document.querySelector('[data-js-taches]');

        this._elTemplateTache = document.querySelector('[data-template-tache]');

        this.ajouteTache = this.ajouteTache.bind(this);

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elBouton.addEventListener('click', function(e) {
            e.preventDefault();

            /* Si valide */
            let estValide = this.valideFormulaire();
            if (estValide) {
                this.ajouteTache();
                console.log('yes')
                this._el.reset();
            }
        }.bind(this));
    }


    /**
     * Validation du formulaire
     * @returns
     */
    valideFormulaire() {

        let estValide = true;

        /* Input 'Nouvelle tâche' */
        if (this._elInputTache.value == '') {
            this._elInputTache.parentNode.classList.add('error');
            estValide = false;
        } else {
            if (this._elInputTache.parentNode.classList.contains('error')) this._elInputTache.parentNode.classList.remove('error');
        }

        /* Inputs Radio 'Importance' */
        let elCheckedImportance = this._el.querySelector('input[name="importance"]:checked');
        console.log(elCheckedImportance)

        if (elCheckedImportance) {
            if (this._elsInputImportance[0].parentNode.classList.contains('error')) this._elsInputImportance[0].parentNode.classList.remove('error');
        } else {
            this._elsInputImportance[0].parentNode.classList.add('error');
            estValide = false;
        }

        return estValide;
    }


    /**
     * Ajoute la tâche au tableau aTaches et appelle la méthode pour injecter la nouvelle tâche
     */
    ajouteTache() {
        // let tache = {
        //     tache: this._elInputTache.value,
        //     description: this._elInputDescription.value,
        //     importance: this._el.querySelector('input[name="importance"]:checked').value
        // }

        // aTaches.push(tache);

        // // Injecte la tâche
        // this.injecteTache(aTaches.length - 1);

        let elCheckedImportance = this._el.querySelector('input[name="importance"]:checked');
        
        
        let data = {
            action: 'ajouteTache',
            tache: this._elInputTache.value,
            description: this._elInputDescription.value, 
            importance: elCheckedImportance.value
        }

        
        
        let oOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    
        fetch('requetes/requetesAsync.php', oOptions)
    
            .then(function(reponse) {
                console.log(reponse.ok)
                if (reponse.ok) return reponse.text();
                else throw new Error('404')
            })
    
            .then(function(id) {
                // console.log(id)
                data.id = id
            let elCloneTemplate = this._elTemplateTache.cloneNode(true);
            
            for (const cle in data) {
                //g = globale
                let regex = new RegExp('{{' + cle + '}}', 'g')
                elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, data[cle]);
            }
            
            let elNouveauTache = document.importNode(elCloneTemplate.content, true);

            // console.log(this._elTaches)
            
            this._elTaches.append(elNouveauTache)

            new Tache(this._elTaches.lastElementChild)


    
            }.bind(this))
    
            .catch(function(erreur) {
                console.log(erreur.message);
            });
    }
}