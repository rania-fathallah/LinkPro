function ajouterCertification() {
    var modal = document.getElementById("ajout_certification");
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    modal.style.display = "block"; 
  }

function modifierCertification(id, certificat, plateforme, code, date) {
      var modal = document.getElementById("update_certification");
      modal.style.display = "block"; 
      
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      document.getElementById("id_certification").value = id;
      document.getElementById("certificat_update").value = certificat;
      document.getElementById("plateforme_update").value = plateforme;
      document.getElementById("code_update").value = code;
      document.getElementById("date_certif_update").value = new Date(date).toISOString().substring(0, 10);
      }
  
  function supprimerCertification(email, id){
        fetch(`/certification/delete_certification/${email}/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La suppression a échoué.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Certification supprimé avec succès:', data);
            window.location.reload();
        })
        .catch(error => {
            console.error('Erreur lors de la suppression de la certification:', error);
        });
    }
