<?php
    require_once('fonctionsDB.php');

    $request_payload = file_get_contents('php://input');
    $data = json_decode($request_payload, true);

    // print_r($data);
    // die();


    if (isset($data['action'])) {

        // Switch en fonction de l'action envoyée
        switch ($data['action']) {
            case 'getTaches':
                if (isset($data['id'])) {

                    $taches = getAllTaches();
                    $data = [];

                    if (mysqli_num_rows($taches) > 0) {
                        // Récupérer la ligne suivante d'un ensemble de résultats sous forme de tableau associatif
                        while ($tache = mysqli_fetch_assoc($taches)) { 
                            $data[] = $tache;
                        }
                    }

                    header('Content-type: application/json; charset=utf-8');
					echo json_encode($data);
                }
                break;

                case 'ajouteTache':


    if (isset($data['tache']) && isset($data['importance'])) {
        
        $return_id = ajouteTache($data['tache'], $data['importance'], $data['description']);

        echo $return_id;

        

    } else {
        
        echo 'Erreur query string';
    }


                break;    
                case 'supprimeTache':
                    if (isset($data['id'])) {
                        

                        $tacheId = supprimeTache($data['id']);
                        echo $tacheId;

                    }
                    break;

                        case 'afficheDetail':
                            if (isset($data['id'])) {

                                $data = mysqli_fetch_assoc(getDetail($data['id']));
                                
                                header('Content-type: application/json; charset=utf-8');
                                echo json_encode($data);
                            }
                            break;
        }
    } else {
        echo 'Erreur action';					
    }
?>