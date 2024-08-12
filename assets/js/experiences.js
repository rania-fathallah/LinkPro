function ajouterExperience() {
  var modal = document.getElementById("formulaire_ajout");

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  modal.style.display = "block"; // Affiche le formulaire
}
  
function f() {
  var poste_actuel = document.getElementById("poste_actuel");
  var fin = document.getElementById("fin");

  if (poste_actuel.checked) {
    poste_actuel.value = "on";
    fin.disabled = true;
  } else {
    poste_actuel.value = "";
    fin.disabled = false; 
  }
}

  function f1() {
  var poste_actuel = document.getElementById("poste_actuel1");
  var fin = document.getElementById("fin1");

  if (poste_actuel.checked) {
      poste_actuel.value = "on";
      fin.disabled = true;
  } else {
      poste_actuel.value = "";
      fin.disabled = false; 
  }
  }
  function modifierExperience(id, intitule, employeur, posteActuel, dateDebut, dateFin, lieu, description) {
    var modal = document.getElementById("formulaire_update");
    modal.style.display = "block"; // Affiche le formulaire
    
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    document.getElementById("id").value = id;
    document.getElementById("intitule1").value = intitule;
    
    document.getElementById("employeur1").value = employeur;
    if(posteActuel === "1"){
        document.getElementById("poste_actuel1").value = "on";
        document.getElementById("poste_actuel1").checked = true;
        document.getElementById("fin1").disabled = true;
    }else{
        document.getElementById("poste_actuel1").value = "";
        document.getElementById("poste_actuel1").checked = false;
        document.getElementById("fin1").disabled = false;
        document.getElementById("fin1").value = new Date(dateFin).toISOString().substring(0, 10);
    }

    document.getElementById("debut1").value = new Date(dateDebut).toISOString().substring(0, 10);

    document.getElementById("lieu1").value = lieu;
    document.getElementById("description1").value = description;
  }

function supprimerExperience(email, id){
      fetch(`/experience/delete_experience/${email}/${id}`, {
          method: 'DELETE',
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('La suppression a échoué.');
          }
          return response.json();
      })
      .then(data => {
          console.log('Expérience supprimé avec succès:', data);
          window.location.reload();
      })
      .catch(error => {
          console.error('Erreur lors de la suppression de l\'expérience:', error);
      });
  }

function validateDates(){
  var debut = new Date(document.getElementById("debut").value);
  var fin = new Date(document.getElementById("fin").value);
  var poste_actuel = document.getElementById("poste_actuel").value;
  if(fin < debut && poste_actuel !== "on"){
    alert("La date de début doit être antérieure à la date de fin");
    return false;
  }
  return true;
}

function validateDatesEdit(){
  var debut = new Date(document.getElementById("debut1").value);
  var fin = new Date(document.getElementById("fin1").value);
  var poste_actuel = document.getElementById("poste_actuel1").value;
  if(fin < debut && poste_actuel !== "on"){
    alert("La date de début doit être antérieure à la date de fin");
    return false;
  }
  return true;
}