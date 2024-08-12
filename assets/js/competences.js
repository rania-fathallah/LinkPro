function ajouterCompetence() {
    var modal = document.getElementById("ajout_competence");
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    modal.style.display = "block"; 
  }

function modifierCompetence(id, competence) {
      var modal = document.getElementById("update_competence");
      modal.style.display = "block"; 
      
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
  
      document.getElementById("id_competence").value = id;
      document.getElementById("competence_update").value = competence;
    }
  
  function supprimerCompetence(email,id){
        fetch(`/competence/delete_competence/${email}/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La suppression a échoué.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Compétence supprimée avec succès:', data);
            window.location.reload();
        })
        .catch(error => {
            console.error('Erreur lors de la suppression de la competence:', error);
        });
    }