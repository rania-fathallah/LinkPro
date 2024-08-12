function disableActuel(){
    var club_actuel = document.getElementById("club_actuel");
    var fin = document.getElementById("fin_club")
    if(club_actuel.checked){
        club_actuel.value = "on";
        fin.disabled = true;
    }else{
        club_actuel.value = "";
        fin.disabled = false;
    }
}

function disableActuelUpdate(){
    var club_actuel = document.getElementById("club_actuel_update");
    var fin = document.getElementById("fin_club_update")
    if(club_actuel.checked){
        club_actuel.value = "on";
        fin.disabled = true;
    }else{
        club_actuel.value = "";
        fin.disabled = false;
    }
}

function ajouterClub() {
    var modal = document.getElementById("ajout_club");
  
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    modal.style.display = "block"; 
}
function modifierClub(id, nom, fonction, actuel, debut, fin, description){
    var modal = document.getElementById("update_club");
    modal.style.display = "block"; 
      
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
    document.getElementById("id_club").value = id;
    document.getElementById("nom_update").value = nom;

    if(fonction === "membre"){
        document.getElementById("fonction_update").value = fonction;
        document.getElementById("fonctionStaff_update").disabled = true;
        document.getElementById("fonctionStaff_update").value = "";
    }else{
        document.getElementById("fonction_update").value = "staff";
        document.getElementById("fonctionStaff_update").value = fonction;
    }

    document.getElementById("debut_club_update").value = new Date(debut).toISOString().substring(0, 10);
    if(actuel === "1"){
        document.getElementById("club_actuel_update").value = "on";
        document.getElementById("club_actuel_update").checked = true;
        document.getElementById("fin_club_update").disabled = true;
    }else{
        document.getElementById("club_actuel_update").value = "";
        document.getElementById("club_actuel_update").checked = false;
        document.getElementById("fin_club_update").disabled = false;
        document.getElementById("fin_club_update").value = new Date(fin).toISOString().substring(0, 10);
    }
    
    document.getElementById("description_club_update").value = description;
    
} 

function supprimerClub(email, id){
    fetch(`/club/delete_club/${email}/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La suppression a échoué.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Club supprimé avec succès:', data);
        window.location.reload();
    })
    .catch(error => {
        console.error('Erreur lors de la suppression du Club:', error);
    });
}