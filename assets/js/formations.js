function ajouterFormation() {
    var modal = document.getElementById("ajout_formation");
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    modal.style.display = "block"; 
  }

function modifierFormation(id, etablissement, diplome, debut, fin, resultat, description) {
      var modal = document.getElementById("update_formation");
      modal.style.display = "block"; 
      
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
  
      document.getElementById("id_formation").value = id;
      document.getElementById("etablissement_update").value = etablissement;
      document.getElementById("diplome_update").value = diplome;
  
      document.getElementById("debut_formation_update").value = new Date(debut).toISOString().substring(0, 10);
      document.getElementById("fin_formation_update").value = new Date(fin).toISOString().substring(0, 10);
  
      document.getElementById("resultat_update").value = resultat;
      document.getElementById("description_update").value = description;
    }
  
  function supprimerFormation(email, id){
        fetch(`/formation/delete_formation/${email}/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La suppression a échoué.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Formation supprimé avec succès:', data);
            window.location.reload();
        })
        .catch(error => {
            console.error('Erreur lors de la suppression de la formation:', error);
        });
    }
  
  function validateDatesFormation(){
    var debut = new Date(document.getElementById("debut_formation").value);
    var fin = new Date(document.getElementById("fin_formation").value);
    if(fin < debut){
      alert("La date de début doit être antérieure à la date de fin");
      return false;
    }
    return true;
  }

  function validateDatesFormationEdit(){
    var debut = new Date(document.getElementById("debut_formation_update").value);
    var fin = new Date(document.getElementById("fin_formation_update").value);
    if(fin < debut){
      alert("La date de début doit être antérieure à la date de fin");
      return false;
    }
    return true;
  }

