function signUp() {
    var modal = document.getElementById("create_profil");

    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
    modal.style.display = "block";
    }
    
    var i = 0; 
    function f(indice){
        var poste_actuel = document.getElementById("poste_actuel"+indice);
        var fin = document.getElementById("fin"+indice);

        if (poste_actuel.checked) {
            poste_actuel.value = "on";
            fin.disabled = true;
        } else {
            poste_actuel.value = "";
            fin.disabled = false; 
        }
    }
    function ajouterExperience() {
        var experiences = document.getElementById("experiences");
        
        i++;

        var newExperience = document.createElement("div");
        newExperience.id = "experience" + i;

        newExperience.innerHTML = `

            <label for="job_title${i}" class="form-label">Job title</label>
            <input type="text" id="job_title${i}" name="job_title${i}" class="form-control" required>

            <label for="employer${i}" class="form-label">Employer</label>
            <input type="text" id="employer${i}" name="employer${i}" class="form-control" required>

            <div class="my-3">
                <input type="checkbox" id="poste_actuel${i}" name="poste_actuel${i}" class="me-3" value="" onchange="f(${i})"><label> I currently hold this position</label>
            </div>

            <label for="debut${i}" class="form-label">Start date</label>
            <input type="date" id="debut${i}" name="debut${i}" class="form-control" required>
            
            <label for="fin${i}" class="form-label">End date</label>
            <input type="date" id="fin${i}" name="fin${i}" class="form-control" required>

            <label for="lieu${i}" class="form-label">Company location</label>
            <input type="text" id="lieu${i}" name="lieu${i}" class="form-control" required>

            <label for="description${i}" class="form-label">Description</label>
            <textarea class="form-control" id="description${i}" name="description${i}" rows="3" required></textarea>
            <hr>
        `;

        experiences.appendChild(newExperience);
    }
    
    var j =0;
    function ajouterFormation(){

        var formations = document.getElementById("formations");
        
        j++;

        var newFormation = document.createElement("div");
        newFormation.id = "formation" + i;
        newFormation.innerHTML = `
            <label for="etablissement${j}" class="form-label">Institution</label>
            <input type="text" id="etablissement${j}" name="etablissement${j}" class="form-control" required/>
    
            <label for="diplome${j}" class="form-label">Degree</label>
            <input type="text" id="diplome${j}" name="diplome${j}" class="form-control" required/>                                    

            <label for="debut_formation${j}" class="form-label">Start date</label>
            <input type="date" id="debut_formation${j}" name="debut_formation${j}" class="form-control" required/>
                      
            <label for="fin_formation${j}" class="form-label">End date (or scheduled date):</label>
            <input type="date" id="fin_formation${j}" name="fin_formation${j}" class="form-control" required/>
                  
            <label for="resultat${j}" class="form-label">Achieved result</label>
            <input type="text" id="resultat" name="resultat${j}" class="form-control" required/>
                      
            <label for="description_formation${j}" class="form-label">Description</label>
            <textarea class="form-control" id="description_formation${j}" name="description_formation${j}" rows="3" required></textarea>
            <hr>
        `;
        formations.appendChild(newFormation);          
    }
    
    var k =0;
    function ajouterCompetence(){
        var competences = document.getElementById("competences");
        
        k++;

        var newCompetence = document.createElement("div");
        newCompetence.id = "competencee" + i;

        newCompetence.innerHTML = `
            <label for="competence${k}" class="form-label">Skill</label>
            <input type="text" id="competence${k}" name="competence${k}" class="form-control" required/>
            <hr>
        `;
        competences.appendChild(newCompetence);          

    }

    var l=0;
    function ajouterLangue(){
        var langues = document.getElementById("langues");
        
        l++;

        var newLangue = document.createElement("div");
        newLangue.id = "languee" + i;

        newLangue.innerHTML = `
            <label for="langue${l}" class="form-label">Language</label>
            <input type="text" id="langue${l}" name="langue${l}" class="form-control" required/>

            <label for="niveau${l}" class="form-label">Language proficiency</label>
            <select id="niveau${l}" name="niveau${l}" class="form-select" required>
                <option value="" disabled selected>Please select</option>
                <option value="Notions">Basic knowledge</option>
                <option value="Limited professional proficiency">Limited professional proficiency</option>
                <option value="Professional proficiency">Professional proficiency</option>
                <option value="Full professional proficiency">Full professional proficiency</option>
                <option value="Bilingual or native language">Bilingual or native language</option>
            </select>
            <hr>
        `;
        langues.appendChild(newLangue);          

    }
    
    var m=0;
    function ajouterCertification() { 
        var certifications = document.getElementById("certifications");
        
        m++;

        var newCertification = document.createElement("div");
        newCertification.id = "certification" + i;

        newCertification.innerHTML = `
            <label for="certificat${m}" class="form-label">Certificate</label>
            <input type="text" id="certificat${m}" name="certificat${m}" class="form-control" required/>
    
            <label for="plateforme${m}" class="form-label">Platform</label>
            <input type="text" id="plateforme${m}" name="plateforme${m}" class="form-control" required/>
                    
            <label for="code${m}" class="form-label">Code certificate</label>
            <input type="text" id="code${m}" name="code${m}" class="form-control" required/>

            <label for="date_certif${m}" class="form-label">Certification attainment date</label>
            <input type="date" id="date_certif${m}" name="date_certif${m}" class="form-control" required/>

        `;
        certifications.appendChild(newCertification);
    }

    var n=0;

    function toggleFunction(indice){
        var fonction = document.getElementById("fonction"+indice);
        var fonctionStaff = document.getElementById("fonctionStaff"+indice);

        if (fonction.value === "member") {
            fonctionStaff.disabled = true;
            fonctionStaff.value = "";
        } else {
            fonctionStaff.disabled = false;
        }
    }

    function disableActuel(indice) { 
        var poste_actuel = document.getElementById("club_actuel"+indice);
        var fin = document.getElementById("fin_club"+indice);

        if (poste_actuel.checked) {
            poste_actuel.value = "on";
            fin.disabled = true;
        } else {
            poste_actuel.value = "";
            fin.disabled = false; 
        }
     }
    function ajouterClub(){
        var clubs = document.getElementById("clubs");
        
        n++;

        var newClub = document.createElement("div");
        newClub.id = "club" + i;

        newClub.innerHTML = `
                    <label for="nom_club${n}" class="form-label">Club</label>
                    <input type="text" id="nom_club${n}" name="nom_club${n}" class="form-control" required/>
    
                    <label for="fonction${n}" class="form-label">Function</label>
                    <select id="fonction${n}" name="fonction${n}" class="form-select" onchange="toggleFunction(${n})" required>
                      <option value="" disabled selected>Please select</option>
                      <option value="member">Member</option>
                      <option value="staff">Staff</option>
                    </select>

                    <label for="fonctionStaff${n}" class="form-label">Role in the club committee</label>
                    <select id="fonctionStaff${n}" name="fonctionStaff${n}" class="form-select" required>
                        <option value="" disabled selected>Please select</option>
                        <option value="President">President</option>
                        <option value="Vice President">Vice President</option>
                        <option value="Treasurer">Treasurer</option>
                        <option value="General Secretary">General Secretary</option>
                        <option value="Communication Manager">Communication Manager</option>
                        <option value="Event Manager">Event Manager</option>
                        <option value="Other">Other..</option>
                    </select>

                    <div class="my-3">
                      <input type="checkbox" id="club_actuel${n}" name="club_actuel${n}" class="me-3" value="" onchange="disableActuel(${n})"><label> I currently hold this position in the club</label>
                    </div>
                    
                    <label for="debut_club${n}" class="form-label">Start date</label>
                    <input type="date" id="debut_club${n}" name="debut_club${n}" class="form-control" required/>
                    
                    <label for="fin_club${n}" class="form-label">End date</label>
                    <input type="date" id="fin_club${n}" name="fin_club${n}" class="form-control" required/>

                    <label for="description_club${n}" class="form-label">Description</label>
                    <textarea class="form-control" id="description_club${n}" name="description_club${n}" rows="3" required></textarea>
                
        `;
        clubs.appendChild(newClub);
    }