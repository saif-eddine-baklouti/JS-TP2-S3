(function() {

    let elsFormulaire = document.querySelectorAll('[data-js-formulaire]'),
        elsTrierTaches = document.querySelectorAll('[data-js-trier-taches]'),
        elsDetail = document.querySelectorAll('[data-js-detail]');

    for (let i = 0, l = elsFormulaire.length; i < l; i++) {
        new Formulaire(elsFormulaire[i]);
    }

    for (let i = 0, l = elsTrierTaches.length; i < l; i++) {
        new TrierTaches(elsTrierTaches[i]);
    }

    for (let i = 0, l = elsDetail.length; i < l; i++) {
        new Detail(elsDetail[i]);
    }
})(); 