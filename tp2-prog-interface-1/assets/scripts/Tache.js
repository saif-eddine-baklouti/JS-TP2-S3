import {  supprimeTache, locationDetail, accueil } from './App.js'


export default class Tache  {
    constructor(el) {
        
        this._el = el;
        this._index = this._el.dataset.jsTache;
        this._elActions = this._el.querySelector('[data-js-actions]');
        
        this._elTaches = this._el.closest('[data-js-taches]');
        

        // this._elDetail = this._el.querySelector('[data-js-tache-detail]')

        // this.supprimeTache = this.supprimeTache.bind(this)
        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elActions.addEventListener('click', function(e) {
            e.preventDefault();

            if (e.target.dataset.jsAction == 'afficher') locationDetail(this._index);
            else 
            if (e.target.dataset.jsAction == 'supprimer') supprimeTache(this._index, this._el);
            //Location
        }.bind(this));
    }



}