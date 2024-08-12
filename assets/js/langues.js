function ajouterLangue() {
    var modal = document.getElementById("ajout_langue");
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    modal.style.display = "block"; 
  }

function modifierLangue(id, langue, niveau) {
      var modal = document.getElementById("update_langue");
      modal.style.display = "block"; 
      
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
  
      document.getElementById("id_langue").value = id;
      document.getElementById("langue_update").value = langue;
      document.getElementById("niveau_update").value = niveau;

    }
  
  function supprimerLangue(email, id){
        fetch(`/langue/delete_langue/${email}/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La suppression a échoué.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Langue supprimé avec succès:', data);
            window.location.reload();
        })
        .catch(error => {
            console.error('Erreur lors de la suppression de la langue:', error);
        });
    }


