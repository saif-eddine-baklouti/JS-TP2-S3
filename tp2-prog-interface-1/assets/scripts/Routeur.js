import { afficheDetail } from './App.js'

export default class Routeur {
    constructor (el) {
        this._el = el;


        // this._elAccueil = this._el.querySelector('[data-js-accueil]');
        // this._elProjets = this._el.querySelector('[data-js-projets]');
        // this._elProjet = this._el.querySelector('[data-js-projet]');
        // console.log(this._el)    
        this._routes = [
            ['/taches/:id', afficheDetail]
        ];



        // this.afficheDetail = this.afficheDetail.bind(this)
        // this.supprimeTache = this.supprimeTache.bind(this)
        // this._path = location.pathname;

        this.init();
    };

    init() {

        let id = this.gereHashbang();
        // if (id) this.gereActif(id);
        console.log(id)

        //  /**
        //  * La gestion suite a l'événment
        //  */


        // this._elProjets.addEventListener('click', function (e) {
        //     e.preventDefault();
        //     let id = e.target.dataset.jsProjetId
        //     if (id) location = `!/projets/${id}`;
        // }.bind(this));

        /**
         * gestion H change
         */


        window.addEventListener('hashchange', function () {        
            this.gereHashbang();
        //     if (id) this.gereActif(id);
        // this.afficheDetail();
            

        }.bind(this))

        // this._elAccueil.addEventListener('click', function (e) {
        //     e.preventDefault();

        //     this._elProjet.innerHTML = '';
        //     this.gereActif();
        //     history.pushState(null, null, this._path)

            
        // }.bind(this))

    };

    

    /**
     * gestion URL
     * @returns 
     */

    gereHashbang() {

        let hash = window.location.hash.slice(2),
            isRoute = false;

        if (hash.endsWith('/')) hash = hash.slice(0, -1);
        
        for (let i = 0, l = this._routes.length ; i < l; i++) {
            
            let route = this._routes[i][0],
                isId = false;            

            if (route.indexOf(':') > -1) {
                route = route.substring(0, route.indexOf('/:'));
                isId = true;
            }

            if (hash.indexOf(route) > -1) {

                    let hashInArray = hash.split(route);

                    if (hashInArray[1]) {
                        if (isId) {
                            let id = hashInArray[1].slice(1);
                            this._routes[i][1](id);
                            isRoute = true;
                        }
                        
                    } else {
                        if (hash === this._routes[i][0]) {
                            this._routes[i][1]();
                            isRoute = true;
                        }
                    }
            }
        }
            if(!isRoute) {
                // accueil();
            }
    };
    
    // gereHashbang() {
    //     let hash = window.location.hash.slice(2),
    //     isRoute = false,
    //     isId;
        
    //     if (hash.endsWith('/')) hash = hash.slice(0,-1);
        

    //     for (let i = 0, l = this._routes.length; i < l; i++) {
    //         let route = this._routes[i][0],
    //         isId = false;

    //         if (route.indexOf(':') > -1) {
                
    //             route = route.substring(0, route.indexOf('/:'))
    //             isId = true
    //         }

    //         if (hash.indexOf(route) > -1) {

    //             let hashInArray = hash.split(route);

    //             if (hashInArray[1]) {
    //                 if (isId) {
    //                     let id = hashInArray[1].slice(1);
    //                     this._routes[i][1](id);
    //                     isRoute = true;
                    
    //                     return id
    //                 }
                    
    //             } else {
    //                 console.log('fausse route')

    //                 if (hash === this._routes[i][0]) {
    //                     this._routes[i][1]();
    //                     isRoute = true;

    //                 }
    //             }
    //         }   
    //     }
    // }

        /**
         * gere les class des balise <a> suite au click
         * @param {string} id 
         */

    // gereActif(id = null) {

    // let Projets = this._elProjets.querySelectorAll(`a[data-js-projet-id]`);
    //     for (let i = 0, l = Projets.length ; i < l; i++) {
    //         Projets[i].classList.remove('active')
    //     }

    //     if(id) this._elProjets.querySelector(`a[data-js-projet-id="${id}"]`).classList.add('active');

    // }
}