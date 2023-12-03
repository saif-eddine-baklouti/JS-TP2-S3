import { trieTaches } from './App.js'

export default class TrierTaches {
    constructor(el) {
        
        this._el = el;

        this._elTemplateTache = document.querySelector('[data-template-tache]');
        this._elTaches = document.querySelector('[data-js-taches]');


        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._el.addEventListener('click', function(e) {
            let ordre = e.target.dataset.jsTrier;
                trieTaches(ordre,this._elTemplateTache, this._elTaches);
        }.bind(this));
    }


   
}