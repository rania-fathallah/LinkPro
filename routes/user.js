const express = require('express');
const router = express.Router();
const user = require('../models/user');
const multer = require('multer');   
const upload = multer({ dest: 'images/' }); 
const fs = require('fs'); 


router.get("/", (req, res) => {
  res.render("connect.ejs",{error_message:""});
});


router.get("/portfolio-details/:email", async(req, res) => {
    let e = req.params.email;
    let userr = await user.findOne({ email: e });
    res.render("portfolio-details.ejs",{users: userr});
});


router.post("/login", async (req, res) => {
    const userr ={
        email: req.body.email,
        password: req.body.password
    };
    const existingUser = await user.findOne({ email: userr['email'] });
    
    if (!existingUser) {
      res.render('connect.ejs',{error_message: "Incorrect email or password"});
    } else {
      req.session.userId = existingUser._id;
      res.redirect('/feed')
      //res.redirect(`/user/portfolio-details/${userr['email']}`);
    }
   });


router.post("/create_profil", upload.single('image'), async (req, res) => {
      
    var data = null;
    if (req.file) {
        data = await fs.promises.readFile(req.file.path);
    } 
    const userr = {
      email: req.body.email,
      password: req.body.password,
      image: data,
      nom: req.body.nom,
      prenom: req.body.prenom,
      telephone: req.body.telephone,
      adresse: req.body.adresse,
      pays: req.body.pays,
      date_anniversaire: req.body.date_anniversaire,
      titre: req.body.profil_title,
      description: req.body.description,
  
      experiences:[],
      formations:[],
      competences:[],
      langues:[],
      certifications:[],
      clubs:[] 
    };
  
    console.log(userr);

    let i = 1;
    while (req.body["job_title" + i] !== undefined) {
    const experience = {
        intitule: req.body["job_title" + i],
        employeur: req.body["employer" + i],
        logo: null,
        actuel: req.body["poste_actuel" + i] === 'on',
        debut: req.body["debut" + i],
        fin: req.body["poste_actuel" + i] === 'on' ? null : req.body["fin" + i],
        lieu: req.body["lieu" + i],
        description: req.body["description" + i]
    };
    console.log(experience);
    userr.experiences.push(experience);
    i++;
    }

    i = 1;
    while (req.body["etablissement" + i] !== undefined) {
    const formation = {
        etablissement: req.body["etablissement" + i],
        diplome: req.body["diplome" + i],
        debut: req.body["debut_formation" + i],
        fin: req.body["fin_formation" + i],
        resultat: req.body["resultat" + i],
        description: req.body["description_formation" + i]
    };
    userr.formations.push(formation);
    i++;
    }

    i=1;
    while (req.body["competence" + i] !== undefined) {
        const competence = {
          competence: req.body["competence" + i] 
        };
        userr.competences.push(competence); 
        i++;
      }
      
    i=1;
    while (req.body["langue" + i] !== undefined) {
        const langue = {
          langue: req.body["langue" + i],
          niveau: req.body["niveau" + i]
        };
        userr.langues.push(langue); 
        i++;
      }
      
      i=1;
      while (req.body["certificat" + i] !== undefined) {
        const certification = {
          certificat: req.body["certificat" + i],
          plateforme: req.body["plateforme" + i],
          code: req.body["code" + i],
          date: req.body["date_certif" + i]
        };
        userr.certifications.push(certification); 
        i++;
      }

      i=1;
      while (req.body["nom_club" + i] !== undefined) {
        const club = {
          nom: req.body["nom_club" + i],
          fonction: req.body["fonction" + i] === "staff" ? req.body["fonctionStaff" + i] : req.body["fonction" + i],
          actuel: req.body["club_actuel" + i] === 'on', 
          debut: req.body["debut_club" + i],
          fin: req.body["club_actuel" + i] === 'on' ? null : req.body["fin_club" + i],
          description: req.body["description_club" + i]
        };
        userr.clubs.push(club); 
        i++;
      }
      
  
    const existingUser = await user.findOne({ email: userr['email'] });
  
    if (!existingUser) {
        const newUser = await user.create(userr);
        res.redirect(`/user/portfolio-details/${newUser['email']}`);
    } else {
        res.render('connect.ejs', {error_message : "An account with this email already exists"})
    }

  });


  module.exports = router;