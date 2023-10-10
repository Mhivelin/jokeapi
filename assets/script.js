// jokeapi







afficher_tableau();

// fonction qui affiche le tableau
function afficher_tableau() {
    // on vérifie si le tableau existe dans le local storage
    if (localStorage.getItem("etat") != null && localStorage.getItem("etat") != "[]") {
        // on récupère le tableau dans le local storage
        let table = localStorage.getItem("etat");


        // on le transforme en tableau JS
        table = JSON.parse(table);

        // on remplit le tableau HTML avec #joke-table
        document.querySelector("#joke-table").innerHTML = table;

        // on initialise la variable qui va contenir le code HTML
        let tableHTML = '';

        // on parcourt le tableau JS
        for (let i = table.length - 1; i >= 0; i--) {
            // on crée le code HTML pour chaque ligne
            // bouton supprimer avec un attribut data-index qui contient l'index de la blague dans le tableau
            let bouton_supprimer = "<button class='btn btn-danger supprimer' data-index='" + i + "'>Supprimer</button>";
            // ligne du tableau
            let joke = "<tr><td>" + table[i].setup + "</td><td>" + table[i].delivery + "</td> <td>" + bouton_supprimer + "</td></tr>";
            tableHTML += joke;
        }

        // on actualise le tableau HTML
        document.querySelector("#joke-table").innerHTML = tableHTML;


    } else {
        // si le tableau n'existe pas, on affiche un message
        document.querySelector("#joke-table").innerHTML = "<tr><td colspan='3'>Aucune blague enregistrée</td></tr>";

    }
}



// on detecte le click sur le bouton
document.querySelector("#get-joke").addEventListener("click", () => {

    // on construit l'url avec la catégorie
    let url = "https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist&type=twopart";

    // on récupère les données de l'API avec fetch
    fetch(url)
        // on transforme les données en JSON
        .then(response => response.json())

        // on récupère les données JSON
        .then(data => {
            // on verifie si le tableau existe dans le local storage
            if (localStorage.getItem("etat") == null) {
                // si le tableau n'existe pas, on le crée avec la première donnée
                localStorage.setItem("etat", JSON.stringify([data])); // Créez un tableau avec la première donnée
            } else {
                // si le tableau existe, on le récupère et on ajoute la nouvelle donnée
                let jokes = JSON.parse(localStorage.getItem("etat"));
                // on ajoute la nouvelle donnée
                jokes.push(data);
                // on enregistre le nouveau tableau dans le local storage
                localStorage.setItem("etat", JSON.stringify(jokes));
            }

            // on lance la fonction qui affiche le tableau
            afficher_tableau();
        })
        // on affiche les erreurs dans la console
        .catch(error => console.error("Erreur lors de la récupération des données :", error));
});



// supprimer une blague

// on detecte le click sur le bouton supprimer
document.querySelector("#joke-table").addEventListener("click", (event) => {
    // on vérifie que le clic est sur un bouton supprimer
    if (event.target.classList.contains("supprimer")) {
        // on récupère l'index de la blague dans le tableau
        let index = event.target.getAttribute("data-index");
        // on récupère le tableau dans le local storage
        let jokes = JSON.parse(localStorage.getItem("etat"));
        // on supprime la blague du tableau
        jokes.splice(index, 1);
        localStorage.setItem("etat", JSON.stringify(jokes));
        afficher_tableau();
    }
}
);

// supprimer toutes les blagues

// on detecte le click sur le bouton supprimer delete-all
document.querySelector("#delete-all").addEventListener("click", () => {
    // on supprime le local storage
    localStorage.removeItem("etat");
    // on affiche le tableau
    afficher_tableau();
}
);