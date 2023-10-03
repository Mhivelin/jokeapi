// jokeapi



// detecter le clic sur le bouton 

document.querySelector("#get-joke").addEventListener("click", () => {
    let url = "https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let joke = "";


       let bouton_supprimer = "<button class='btn btn-danger supprimer' + data.id + '>Supprimer</button>";

        // ajout d'une ligne dans le tableau id ="joke-table"
        joke += "<tr><td>" + data.setup + "</td><td>" + data.delivery + "</td> <td>" + bouton_supprimer + "</td></tr>";
        document.querySelector("#joke-table").innerHTML += joke;

    })

    .catch(error => console.error("Erreur lors de la récupération des données :", error));
}
)


// supprimer une blague

