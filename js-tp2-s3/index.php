<!DOCTYPE html>
<html lang="fr_CA">
<head>
    <!-- meta -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>TP2 | SaifEddine B</title>
	<meta name="description" content="TP2 du cours 582-21F-MA Programmation d'interface Web 1">

	<!-- styles -->
	<link rel="stylesheet" type="text/css" href="./assets/styles/styles.css">

	<!-- scripts -->

	<script type="module" src="./assets/scripts/main.js" defer></script>
</head>

<body data-js-component="Routeur">
	<header>
		<h1>TP2</h1>
        <p>Un gestionnaire de tâches (to-do-list) en POO.</p>
        <hr>
	</header>
	<main>

        <!-- Section ajout d'une tâche -->
        <section>
            <h3>Ajouter une tâche</h3>
            <form data-js-component="Formulaire" >
                <div>
                    <label for="tache">Nouvelle tâche : </label>
                    <input type="text" id="tache" name="tache">
                </div>

                <div>
                    <label for="description">Description : </label>
                    <input type="text" id="description" name="description">
                </div>

                <div>
                    <label for="haute">Haute : </label>
                    <input type="radio" id="haute" name="importance" value="1">
                    <label for="moyenne">Moyenne : </label>
                    <input type="radio" id="moyenne" name="importance" value="2">
                    <label for="basse">Basse : </label>
                    <input type="radio" id="basse" name="importance" value="3">
                </div>

                <div>
                    <button data-js-btn>Ajouter</button>
                </div>
            </form>
        </section>

        <section class="to-do-list">
                <h3>Liste des tâches</h3>
            
                <div data-js-taches>
                <?php 
					// Générer les équipes dynamiquement
					require_once('requetes/fonctionsDB.php');
					$taches = getAllTaches();
					
					// Récupération des résultats sous forme de tableau associatif
					while ($tache= mysqli_fetch_assoc($taches)) {
						echo '<div data-js-tache='.$tache['id'] .'>
                        <p>
                            <span>
                                <small>Tâche : </small>'.$tache['tache'] .'
                            </span>
                            -
                            <span>
                                <small>Importance : </small>'.$tache['importance'] .'
                            </span>
                            <span data-js-actions>
                                <button data-js-action="afficher">Afficher le détail</button>
                                <button data-js-action="supprimer">Supprimer</button>
                            </span>
                        </p>
                    </div>';
						
					}
				?>
                </div>

                <div class="to-do-list__actions" data-js-component="TrierTaches">
                    <button data-js-trier="tache">Trier par ordre alphabétique</button>
                    <button data-js-trier="importance">Trier par importance</button>
                </div>

        </section>

        <!-- Template liste des tâches -->
        <template data-template-tache>

        <div data-js-tache={{id}}>
                        <p>
                            <span>
                                <small>Tâche : </small>{{tache}}
                            </span>
                            -
                            <span>
                                <small>Importance : </small>{{importance}}
                            </span>
                            <span data-js-actions>
                                <button data-js-action="afficher">Afficher le détail</button>
                                <button data-js-action="supprimer">Supprimer</button>
                            </span>
                        </p>
                    </div>
        </template>

        <!-- Template détail d'une tâche -->
        <section class="detail detail--ouvert" data-js-component="Detail">
            <h3>Détail d'une tâche</h3>
            
            <div class="chevron chevron--top" data-js-chevron></div>
            
            <div class="detail__tache" data-js-tache-detail></div>
            </section>
            
            <template data-template-detail=>
                            <div class="detail__info" data-js-detail={{id}}>
                                <p><small>Tâche : </small>{{tache}}</p>
                                <p><small>Description : </small>{{description}}</p>
                                <p><small>Importance : </small>{{importance}}</p>
                            </div>
            </template>
</body>
</html>