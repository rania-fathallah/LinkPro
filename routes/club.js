const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongoose').Types; 


const user = require('../models/user');

router.post('/ajout_club', async (req, res) => {

    let e = req.body.email_ajout_club;
    const club = {
        nom : req.body.nom_club,
        fonction : req.body.fonction === "staff" ? req.body.fonctionStaff : req.body.fonction,
        actuel : req.body.club_actuel === "on" ? 1 : 0,
        debut : req.body.debut_club,
        fin : req.body.fin_club,
        description : req.body.description_club
    }
    const userr = await user.findOne({ email: e });
    userr.clubs.push(club);
    await userr.save();
    res.redirect(`/user/portfolio-details/${e}`);
});


router.post('/update_club', async (req, res) => {
    const id = req.body.id_club;
    let e = req.body.email_update_club;

    const clubUpdates = {
        nom : req.body.nom_update,
        fonction: req.body.fonction_update === "staff" ? req.body.fonctionStaff_update : req.body.fonction_update,
        actuel: req.body.club_actuel_update === "on" ? 1 : 0,
        debut: req.body.debut_club_update, 
        fin: req.body.fin_club_update, 
        description : req.body.description_club_update
    }

    try {
        let userr = await user.findOne({ email: e });
        const indice = userr.clubs.findIndex(c => c._id.toString() == id);
        
        if (indice !== -1) {
            userr.clubs[indice] = clubUpdates;
            await userr.save();
            console.log("Club mise à jour avec succès !");
            res.redirect(`/user/portfolio-details/${e}`);
        } else {
            res.status(404).send("Club non trouvée.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour.");
    }
});

router.delete('/delete_club/:email/:id', async (req, res) => {
    const id = req.params.id;
    let e = req.params.email;
    try {
        const updatedUser = await user.findOneAndUpdate(
            { email: e },
            { $pull: { clubs: { _id: new ObjectId(id) } } },
            { new: true } 
        );

        if (updatedUser) {
            res.status(200).json({ message: 'Club supprimée avec succès.', user: updatedUser });
        } else {
            res.status(404).json({ error: "Aucun club trouvée avec cet ID ou cet email." });
        }
    } catch (err) {
        res.status(500).json({ error: "La suppression du club a échoué." });
    }
});

module.exports = router;