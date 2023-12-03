import Detail from "./Detail.js";
import Tache from "./Tache.js";

class App {

    constructor() {
        this._elTemplateDetail = document.querySelector('[data-template-detail]')
        this._elTacheDetail = document.querySelector('[data-js-tache-detail]');



        this.afficheDetail = this.afficheDetail.bind(this)
        this.supprimeTache = this.supprimeTache.bind(this)
        this.accueil = this.accueil.bind(this)
    }


        /**
     * Affiche le détail d'une tâche
     */
        locationDetail(id) { 
        
            location = `#!/taches/${id}`; 

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
                    if (reponse.ok) return reponse.json();
                    else throw new Error('404')
                })
        
                .then(function(detail) {
                    if (detail['description'] == '') {
                        detail['description'] = 'Aucune description disponible'
                    }

                let elCloneTemplate = this._elTemplateDetail.cloneNode(true);
                
                for (const cle in detail) {
                
                    //g = globale
                    let regex = new RegExp('{{' + cle + '}}', 'g')
                    
                    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, detail[cle]);
                }
                
                let elDetailTache = document.importNode(elCloneTemplate.content, true);
    
                this._elTacheDetail.innerHTML = ""
                this._elTacheDetail.append(elDetailTache)
                window.scrollTo({
                    top: 1000,
                    behavior: "smooth"
                });
                new Detail(this._elTacheDetail.lastElementChild)
    
                }.bind(this))
        
                .catch(function(err) {
                    
                });
        }
    
        /**
         * Supprime la tâche du tableau aTaches et appelle la méthode pour injecter les tâches mises à jour
         */
        supprimeTache(id, elTache, elDetail) { 
    
            let data = {
                action: 'supprimeTache',
                id: id,
                elTache: elTache,
                elDetail: elDetail
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
        
                .then(function() {
                    
                    data.elTache.remove();
                    
                    let elDetail = data.elDetail.lastElementChild   
                    
                    if (elDetail) {
                        let  idDetail = elDetail.dataset.jsDetail;
                        if (data.id == idDetail) data.elDetail.innerHTML = '';
                    }    

                }.bind(this))
        
                .catch(function(erreur) {
                    console.log(erreur.message);
                });
        }

        /**
     * Réordonne le tableau aTaches et appelle la méthode pour injecter les tâches mises à jour
     * @param {String} propriete 
     */
    trieTaches(propriete, template, elTaches) {

        
        let data = {
            action: `trier`,
            propriete: propriete,
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

                if (reponse.ok) return reponse.json();
                else throw new Error('404')
            })
    
            .then(function(data) {

            
            elTaches.innerHTML = ""

            for (let i = 0, l = data.length ; i < l; i++) {
                let elCloneTemplate = template.cloneNode(true);   
                let tache = data[i]
                for (const key in tache) {
                    let regex = new RegExp('{{' + key + '}}', 'g')
                    
                    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, tache[key]);
                }
                
                let elDetailTache = document.importNode(elCloneTemplate.content, true);

                elTaches.append(elDetailTache)

                new Tache(elTaches.lastElementChild)
                
            }

            }.bind(this))
    
            .catch(function(erreur) {
                console.log(erreur.message);
            });
    }

        accueil() {

            this._elTacheDetail.innerHTML = '';
        }
}

export const { afficheDetail, supprimeTache, locationDetail, trieTaches, accueil } = new App();