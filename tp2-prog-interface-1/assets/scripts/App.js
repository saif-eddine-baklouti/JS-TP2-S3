class App {

    constructor() {
        this._elTemplateDetail = document.querySelector('[data-template-detail]')
        this._elTacheDetail = document.querySelector('[data-js-tache-detail]');

        this.afficheDetail = this.afficheDetail.bind(this)
        this.supprimeTache = this.supprimeTache.bind(this)
    }
    // /**
    //  * Construit, injecte et lance les comportements de chaque nouvelle tâche
    //  * @param {Int} index 
    //  */
    // injecteTache(index) {

    //     let dom =  `<div data-js-tache=${index}>
    //                     <p>
    //                         <span>
    //                             <small>Tâche : </small>${aTaches[index].tache}
    //                         </span>
    //                         -
    //                         <span>
    //                             <small>Importance : </small>${aTaches[index].importance}
    //                         </span>
    //                         <span data-js-actions>
    //                             <button data-js-action="afficher">Afficher le détail</button>
    //                             <button data-js-action="supprimer">Supprimer</button>
    //                         </span>
    //                     </p>
    //                 </div>`;

    //     this._elTaches.insertAdjacentHTML('beforeend', dom);

    //     new Tache(this._elTaches.lastElementChild);
    // }


        /**
     * Affiche le détail d'une tâche
     */
        locationDetail(id) { 
        
            location = `#!/taches/${id}`; 
    
    
            // let description = aTaches[this._index].description;
    
            // let elDetailDom =  `<div class="detail__info">
            //                         <p><small>Tâche : </small>${aTaches[this._index].tache}</p>
            //                         <p><small>Description : </small>${description ? description : 'Aucune description disponible.'}</p>
            //                         <p><small>Importance : </small>${aTaches[this._index].importance}</p>
            //                     </div>`;
    
            // this._elTacheDetail.innerHTML = elDetailDom;
    
            
        }
    
        afficheDetail(id) {
    
            let data = {
                action: 'afficheDetail',
                id: id
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
                    // console.log(reponse)
                    if (reponse.ok) return reponse.json();
                    else throw new Error('404')
                })
        
                .then(function(detail) {
                    console.log(detail)
                    // console.log(typeof(detail))
                    // data.id = id
                let elCloneTemplate = this._elTemplateDetail.cloneNode(true);
                
                for (const cle in detail) {
                
                    //g = globale
                    let regex = new RegExp('{{' + cle + '}}', 'g')
                    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, detail[cle]);
                }
                
                let elDetailTache = document.importNode(elCloneTemplate.content, true);
    
                console.log(elDetailTache)
                
                this._elTacheDetail.innerHTML = ""
                this._elTacheDetail.append(elDetailTache)
    
                // // new Tache(this._elTaches.lastElementChild)
    
    
        
                }.bind(this))
        
                .catch(function(erreur) {
                    console.log(erreur.message);
                });
    
    
        }
    
    
        /**
         * Supprime la tâche du tableau aTaches et appelle la méthode pour injecter les tâches mises à jour
         */
        supprimeTache(id, elTache) { 
    
            let data = {
                action: 'supprimeTache',
                id: id,
                elTache: elTache
            }
            // console.log(this._index)
    
            
            
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
        
                .then(function() {
                    
                    elTache.remove();
        
                }.bind(this))
        
                .catch(function(erreur) {
                    console.log(erreur.message);
                });
        }
        accueil() {
            // this.#_elMain.innerHTML = '';
        }
}

export const { afficheDetail, supprimeTache, locationDetail, accueil } = new App();