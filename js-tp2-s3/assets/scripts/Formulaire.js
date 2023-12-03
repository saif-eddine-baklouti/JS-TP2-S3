import { valideFormulaire } from "./Validation.js";
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

        this._elDetail = document.querySelector(`[data-js-detail]`)

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
            let estValide = valideFormulaire(this._el, this._elInputTache, this._elsInputImportance);
            if (estValide) {
                this.ajouteTache();
                
                this._el.reset();
            }
        }.bind(this));
    }
    /**
     * Ajoute la tâche au tableau aTaches et appelle la méthode pour injecter la nouvelle tâche
     */
    ajouteTache() {

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
                
                if (reponse.ok) return reponse.text();
                else throw new Error('404')
            })
    
            .then(function(id) {

                data.id = id
            let elCloneTemplate = this._elTemplateTache.cloneNode(true);
            
            for (const cle in data) {
                //g = globale
                let regex = new RegExp('{{' + cle + '}}', 'g')
                elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, data[cle]);
            }
            
            let elNouveauTache = document.importNode(elCloneTemplate.content, true);

            this._elTaches.append(elNouveauTache)

            new Tache(this._elTaches.lastElementChild)

            }.bind(this))
    
            .catch(function(erreur) {
                console.log(erreur.message);
            });
    }
}