//BARRE DE RECHERCHE AVEC FILTRES

// // Écouteur d'événement pour le bouton de recherche
document.getElementById('searchButton').addEventListener('click', function () {
    const radioByAlbum = document.getElementById('ChoixTwo');
    const radioByAuteur = document.getElementById('ChoixOne');
    const radioBySerie = document.getElementById('ChoixThree');
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('results');

    // Efface les résultats précédents
    resultsContainer.innerHTML = '';

    // Recherche en fonction du critère sélectionné
    if (radioByAlbum.checked) {
        console.log("Recherche par album");
        searchByAlbum(searchInput);
    } else if (radioByAuteur.checked) {
        console.log("Recherche par auteur");
        searchByAuteur(searchInput);
    } else if (radioBySerie.checked) {
        console.log("Recherche par série");
        searchBySerie(searchInput);
    } else {
        console.log("Veuillez sélectionner un critère de recherche.");
    }
});



// Fonction pour la recherche par album
function searchByAlbum(searchInput) {
    albums.forEach(album => {
        if (album.titre.toLowerCase().includes(searchInput)) {
            displayResult(album);
        }
    });
}

// Fonction pour la recherche par auteur
function searchByAuteur(searchInput) {
    for (let [idAuteur, auteur] of auteurs.entries()) {
        for (let [idAlbum, album] of albums.entries()) {
            if (album.idAuteur == idAuteur && auteur.nom.toLowerCase().includes(searchInput)) {
                displayResult(album);
            }
        }
    }
}

// Fonction pour la recherche par série
function searchBySerie(searchInput) {
    for (let [idSerie, serie] of series.entries()) {
        for (let [idAlbum, album] of albums.entries()) {
            if (album.idSerie == idSerie && album.titre.toLowerCase().includes(searchInput)) {
                console.log(serie.nom + ", Album N°" + album.numero + " " + album.titre + ", Auteur:" + auteurs.get(album.idAuteur).nom);
                displayResult(album);
            }
        }
    }
}



// AFFICHER LE RESULTAT DE LA RECHERCHE DANS UNE CARD
function displayResult(album) {
    // Crée une card pour chaque résultat
    const card = document.createElement('div');
    card.classList.add();

    // Utilise l'id de la série pour obtenir le nom de la série
    let nomFic = series.get(album.idSerie).nom + "-" + album.numero + "-" + album.titre;

    // Définir le chemin vers l'image par défaut
    const srcImg = "assets/images/noComicsMini.jpeg";

    // Crée l'image de la card
    const image = document.createElement('img');
    image.classList.add('card-img-top');
    image.src = "assets/albums/" + nomFic + ".jpg"; // Ajoute le nom du fichier et l'extension de l'image
    image.alt = 'Card image cap';

    // Gestionnaire d'événements pour l'erreur de chargement de l'image
    image.onerror = function () {
        // En cas d'erreur, charge l'image par défaut
        image.src = srcImg;
    };

    // Crée le corps de la card
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Crée le titre de la card
    const title = document.createElement('p');
    title.classList.add('card-title');
    title.textContent = album.titre;

    // Crée les détails de la card
    const details = document.createElement('p');
    details.classList.add('card-text');
    details.textContent = `N°${album.numero}, Série: ${series.get(album.idSerie).nom}, Auteur: ${auteurs.get(album.idAuteur).nom}`;

    // Crée les boutons "Ajouter au panier" et "Retirer du panier"
    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('btn', 'addToCartButton');
    addToCartButton.textContent = 'Ajouter au panier';
    addToCartButton.addEventListener('click', function () {
        ajouterAuPanier(album); // Appeler la fonction ajouterAuPanier et passer l'album sélectionné
    });

    const removeFromCartButton = document.createElement('button');
    removeFromCartButton.classList.add('btn', 'removeFromCartButton');
    removeFromCartButton.textContent = 'Retirer du panier';
    removeFromCartButton.addEventListener('click', function () {
        retirerDuPanier(album); // Appeler la fonction retirerDuPanier et passer l'album sélectionné
    });

    // Ajoute les éléments à la card
    cardBody.appendChild(title);
    cardBody.appendChild(details);
    cardBody.appendChild(addToCartButton);
    cardBody.appendChild(removeFromCartButton);

    card.appendChild(image);
    card.appendChild(cardBody);

    // Ajoute la card à la zone de résultats
    document.getElementById('results').appendChild(card);
}

// Tableau pour stocker les articles sélectionnés dans le panier
const panier = [];

// Fonction pour ajouter un article au panier
function ajouterAuPanier(album) {
    panier.push(album);
    mettreAJourAffichagePanier();
    afficherDetailPanier();
    console.log('Album ajouté au panier :', album);
}

// Fonction pour retirer un article du panier
function retirerDuPanier(album) {
    const index = panier.indexOf(album);
    if (index !== -1) {
        panier.splice(index, 1);
        mettreAJourAffichagePanier();
        afficherDetailPanier();

        console.log('Album retiré du panier :', album);
    }
}
// Fonction pour mettre à jour l'affichage du panier
function mettreAJourAffichagePanier() {
    const nombreArticlesPanier = document.getElementById('nombre-articles-panier');
    nombreArticlesPanier.textContent = panier.length; // Met à jour le nombre d'articles dans le panier
}


function afficherDetailPanier() {
    const listeArticlesPanier = document.getElementById('liste-articles-panier');
    const totalPanier = document.getElementById('total-panier');
    let total = 0;

    // Efface le contenu actuel du détail du panier
    listeArticlesPanier.innerHTML = '';

    // Boucle à travers les articles du panier et les affiche dans la liste avec leur prix
    panier.forEach(album => {
        const listItem = document.createElement('li');
        listItem.textContent = `${album.titre} - ${album.prix} €`; // Affiche le titre et le prix de l'album
        listeArticlesPanier.appendChild(listItem);
        total += parseFloat(album.prix); // Convertit la chaîne de caractères en nombre et calcule le total du panier
    });

    // Affiche le total du panier
    totalPanier.textContent = `Total : ${total.toFixed(2)} €`;
}

