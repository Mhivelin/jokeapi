// jokeapi



afficher_tableau();


function afficher_tableau() {
    if (localStorage.getItem("etat") != null) {
        let table = localStorage.getItem("etat");
        table = JSON.parse(table);
        document.querySelector("#joke-table").innerHTML = table;
        let tableHTML = '';
        for (let i = 0; i < table.length; i++) {
            let bouton_supprimer = "<button class='btn btn-danger supprimer' data-index='" + i + "'>Supprimer</button>";
            let joke = "<tr><td>" + table[i].setup + "</td><td>" + table[i].delivery + "</td> <td>" + bouton_supprimer + "</td></tr>";
            tableHTML += joke;
        }
        document.querySelector("#joke-table").innerHTML = tableHTML;



    }
}


// detecter le clic sur le bouton 

document.querySelector("#get-joke").addEventListener("click", () => {
    let url = "https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (localStorage.getItem("etat") == null) {
                localStorage.setItem("etat", JSON.stringify([data])); // Créez un tableau avec la première donnée
            } else {
                let jokes = JSON.parse(localStorage.getItem("etat"));
                jokes.push(data); // Ajoutez la nouvelle blague au tableau existant
                localStorage.setItem("etat", JSON.stringify(jokes));
            }

            afficher_tableau();
        })
        .catch(error => console.error("Erreur lors de la récupération des données :", error));
});



// supprimer une blague
document.querySelector("#joke-table").addEventListener("click", (event) => {
    if (event.target.classList.contains("supprimer")) {
        let index = event.target.getAttribute("data-index");
        let jokes = JSON.parse(localStorage.getItem("etat"));
        jokes.splice(index, 1);
        localStorage.setItem("etat", JSON.stringify(jokes));
        afficher_tableau();
    }
}
);