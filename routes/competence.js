const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongoose').Types;


const user = require('../models/user');

router.post('/ajout_competence', async (req, res) => {
    let e = req.body.email_ajout_competence;
    const competence = {
        competence: req.body.competence,
    };

    const userr = await user.findOne({ email: e });
    userr.competences.push(competence);
    console.log(userr);
    await userr.save();
    res.redirect(`/user/portfolio-details/${e}`);
});


router.post('/update_competence', async (req, res) => {
    const id = req.body.id_competence;
    let e = req.body.email_update_competence;

    const competenceUpdates = {
        competence: req.body.competence_update,
    };

    try {
        let userr = await user.findOne({ email: e });

        const indice = userr.competences.findIndex(competence => competence._id.toString() == id);
        console.log(indice);
        
        if (indice !== -1) {
            userr.competences[indice] = competenceUpdates;
            await userr.save();
            console.log("Compétence mise à jour avec succès !");
            res.redirect(`/user/portfolio-details/${e}`);
        } else {
            res.status(404).send("Compétence non trouvée.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour.");
    }
});


router.delete('/delete_competence/:email/:id', async (req, res) => {
    const id = req.params.id;
    let e = req.params.email;
    try {
        const updatedUser = await user.findOneAndUpdate(
            { email: e },
            { $pull: { competences: { _id: new ObjectId(id) } } },
            { new: true } 
        );

        if (updatedUser) {
            res.status(200).json({ message: 'Competence supprimée avec succès.', user: updatedUser });
        } else {
            res.status(404).json({ error: "Aucune competence trouvée avec cet ID ou cet email." });
        }
    } catch (err) {
        res.status(500).json({ error: "La suppression de la competence a échoué." });
    }
});

module.exports = router;