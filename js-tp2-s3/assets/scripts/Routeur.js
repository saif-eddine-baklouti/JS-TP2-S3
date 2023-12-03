import { afficheDetail, accueil } from './App.js'

export default class Routeur {
    constructor (el) {
        this._el = el;

        this._routes = [
            ['/taches/:id', afficheDetail]
        ];

        this.init();
    };

    init() {

        this.gereHashbang();

        /**
         * gestion H change
         */
        window.addEventListener('hashchange', function () {        
            this.gereHashbang();

        }.bind(this))
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
                accueil();
            }
    };
    
}