const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongoose').Types;
const multer = require('multer');   
const upload = multer({ dest: 'images/' }); 
const fs = require('fs'); 

const user = require('../models/user');

router.post('/ajout_experience', upload.single('logo'), async (req, res) => {

    let e = req.body.email_ajout_experience;
    let experience = {
        intitule: req.body.intitule,
        employeur: req.body.employeur,
        actuel: req.body.poste_actuel === 'on',
        debut: req.body.debut,
        fin: req.body.poste_actuel === 'on' ? null : req.body.fin,
        lieu: req.body.lieu,
        description: req.body.description,
    };

    const file = req.file;
  
    if (!file) {
        experience.logo =  null;
    }else{
        const filePath = file.path;
        const data = await fs.promises.readFile(filePath);
        experience.logo = data;
    }

    const userr = await user.findOne({ email: e });
    userr.experiences.push(experience);
    await userr.save();
    res.redirect(`/user/portfolio-details/${e}`);

  });

router.post('/update_experience', upload.single('logo1'), async (req, res) => {
    let id = req.body.id;
    let e = req.body.email_update_experience;

    let experienceUpdates = {
        intitule: req.body.intitule1,
        employeur: req.body.employeur1,
        actuel: req.body.poste_actuel1 === "on",
        debut: req.body.debut1,
        fin: req.body.poste_actuel1 === "on" ? null : req.body.fin1,
        lieu: req.body.lieu1,
        description: req.body.description1
    };

    try {
        let userr = await user.findOne({ email: e });

        const experienceIndex = userr.experiences.findIndex(exp => exp._id.toString() == id);
        console.log(experienceIndex);
        
        if (experienceIndex !== -1) {
            if (req.file) {
                const data = await fs.promises.readFile(req.file.path);
                experienceUpdates.logo = data;
            } else {
                experienceUpdates.logo = userr.experimodule.exports = mongoose.model('Post', postSchema);ences[experienceIndex].logo;
            }

            userr.experiences[experienceIndex] = experienceUpdates;

            await userr.save();

            console.log("Expérience mise à jour avec succès !");
            res.redirect(`/user/portfolio-details/${e}`);
        } else {
            res.status(404).send("Expérience non trouvée.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour.");
    }
});

router.delete('/delete_experience/:email/:id', async (req, res) => {
    let e = req.params.email;
    const experienceId = req.params.id; 

    try {
        const updatedUser = await user.findOneAndUpdate(
            { email: e },
            { $pull: { experiences: { _id: new ObjectId(experienceId) } } },
            { new: true } 
        );

        if (updatedUser) {
            res.status(200).json({ message: 'Expérience supprimée avec succès.', user: updatedUser });
        } else {
            res.status(404).json({ error: "Aucune expérience trouvée avec cet ID ou cet email." });
        }
    } catch (err) {
        res.status(500).json({ error: "La suppression de l'expérience a échoué." });
    }
});


module.exports = router;