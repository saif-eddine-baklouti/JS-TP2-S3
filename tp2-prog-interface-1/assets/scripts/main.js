import Tache from "./Tache.js";
import { classesMapping } from './classMapping.js';


(function() {

    let elComponents = document.querySelectorAll('[data-js-component]');
    let elTaches = document.querySelectorAll('[data-js-tache]');
    
    for (let i = 0, l = elComponents.length; i < l; i++) {
        let datasetComponent = elComponents[i].dataset.jsComponent, 			// => string
			elComponent = elComponents[i];

            for (let key in classesMapping) {
                if (datasetComponent == key) new classesMapping[datasetComponent](elComponent);
            }
    }

    for (let i = 0, l = elTaches.length; i < l; i++) {
        if (elTaches[i].dataset.jsTache){
            new Tache(elTaches[i])
        } 
        

    }
    
})(); 