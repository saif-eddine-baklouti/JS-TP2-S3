<?php
	$connexion = connexionDB();
		
	/**
	 * Connection avec la base de données
	 */
	function connexionDB() {
		// define('DB_HOST', 'localhost');
		// define('DB_USER', 'root');
		// // define('DB_PASSWORD', 'root');			// MAC
		// define('DB_PASSWORD', '');			// Windows
		
		define('DB_HOST', 'localhost');
		define('DB_USER', 'e2395393');
		// define('DB_PASSWORD', 'root');			// MAC
		define('DB_PASSWORD', 'VnY8XluICKYcbHSPvcmx');			// Windows
		

		$laConnexion = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
				
		if (!$laConnexion) {
			// La connexion n'a pas fonctionné
			die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
		}
		
		$db = mysqli_select_db($laConnexion, 'e2395393');

		if (!$db) {
			die ('La base de données n\'existe pas.');
		}
		
		mysqli_query($laConnexion, 'SET NAMES "utf8"');
		return $laConnexion;
	}


	/**
	 * Exécute la requête SQL
	 * Si le paramètre $insert est true, retourne l'id de la ressource ajoutée à la db
	 */
	function executeRequete($requete, $insert = false) {
		global $connexion;
		if ($insert) {
			mysqli_query($connexion, $requete);
			return $connexion->insert_id;
		} else {
			$resultats = mysqli_query($connexion, $requete);
			return $resultats;
		}
	}


	/**
	 * Retourne la liste des équipes
	 */
	function getAllTaches() {
		return executeRequete("SELECT * FROM taches");		
	}
	
	function getTrieTaches($propriete) {
		return executeRequete("SELECT * FROM taches ORDER BY $propriete");		
	}


	/**
	 * Retourne la liste des joueurs de l'équipe spécifiée en paramètre
	 */
	function getDetail($id_tache) {
		
			// La fonction mysqli_real_escape_string est utilisée pour créer une chaîne SQL légale qui peut être utilisée dans une instruction SQL, en tenant compte du jeu de caractères (charset) actuel de la connexion.
			// global $connexion;
			// $id = mysqli_real_escape_string($connexion, $id_tache);
			return executeRequete('SELECT * FROM taches WHERE id=' . $id_tache);		
	}


	function ajouteTache($tache, $importance, $description="Aucune description disponible.") {
		$query = "INSERT INTO taches (`tache`, `description`, `importance`) 
		VALUES ('" . $tache . "','" . $description . "','".$importance."')";
	return executeRequete($query, true);
		
	}

	function supprimeTache($id_tache) {
		return executeRequete(" DELETE FROM taches WHERE id = " . $id_tache, true);	
	}
?>