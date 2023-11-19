// Semi Fonctionnel




// Récupérer le formulaire d'inscription
const signupForm = document.getElementById('signupForm');

// Ajouter un événement lors de la soumission du formulaire
signupForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les valeurs des champs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simuler un enregistrement (remplacer cela par une vraie logique d'enregistrement)
    if (username && password) {
        // Si l'enregistrement est réussi, rediriger vers la page d'accueil
        window.location.href = 'index.html';
    } else {
        // Sinon, afficher un message d'erreur ou effectuer une autre action
        alert('Veuillez remplir tous les champs.');
    }
});
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Vérifiez ici si le compte existe (par exemple, via une base de données ou un stockage)
    const compteExiste = /* logique pour vérifier si le compte existe déjà */ false;

    if (compteExiste) {
        // Redirigez vers la page d'accueil si le compte existe
        window.location.href = 'index.html';
    } else {
        // Affichez le message d'erreur si le compte n'existe pas
        errorMessage.style.display = 'block';
    }
});
// Enregistrement des informations dans le stockage local lors de l'inscription
signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Enregistrement dans le stockage local
        localStorage.setItem(username, password);
        window.location.href = 'index.html';
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

// Vérification des informations dans le stockage local lors de la connexion
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Vérification des informations dans le stockage local
    const storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
        window.location.href = 'index.html';
    } else {
        errorMessage.style.display = 'block';
    }
});
// Vérification de l'inscription
window.addEventListener('DOMContentLoaded', function () {
    const hasRegistered = localStorage.getItem('hasRegistered');

    if (!hasRegistered || hasRegistered === 'false') {
        // Rediriger vers la page d'inscription si l'utilisateur n'est pas enregistré
        window.location.href = 'inscription.html';
    }
});

// Enregistrement des informations dans le stockage local lors de l'inscription

signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Enregistrement dans le stockage local
        localStorage.setItem(username, password);

        // Marquer que l'utilisateur s'est enregistré
        localStorage.setItem('hasRegistered', 'true');

        window.location.href = 'index.html';
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

// Vérification des informations dans le stockage local lors de la connexion

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
        window.location.href = 'index.html';
    } else {
        errorMessage.style.display = 'block';
    }
});
