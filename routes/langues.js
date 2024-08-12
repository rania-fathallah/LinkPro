const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongoose').Types; 


const user = require('../models/user');

router.post('/ajout_langue', async (req, res) => {
    let e = req.body.email_ajout_langue;
    const langue = {
        langue: req.body.langue,
        niveau: req.body.niveau
    };
    const userr = await user.findOne({ email: e });
    userr.langues.push(langue);
    await userr.save();
    res.redirect(`/user/portfolio-details/${e}`);
});


router.post('/update_langue', async (req, res) => {
    const id = req.body.id_langue;
    let e = req.body.email_update_langue;

    const langueUpdates = {
        langue: req.body.langue_update,
        niveau : req.body.niveau_update
    };
    
    try {
        let userr = await user.findOne({ email: e });

        const indice = userr.langues.findIndex(langue => langue._id.toString() == id);
        console.log(indice);
        
        if (indice !== -1) {
            userr.langues[indice] = langueUpdates;
            await userr.save();
            console.log("Langue mise à jour avec succès !");
            res.redirect(`/user/portfolio-details/${e}`);
        } else {
            res.status(404).send("Langue non trouvée.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour.");
    }
});

router.delete('/delete_langue/:email/:id', async (req, res) => {
    const id = req.params.id;
    let e = req.params.email;
    try {
        const updatedUser = await user.findOneAndUpdate(
            { email: e },
            { $pull: { langues: { _id: new ObjectId(id) } } },
            { new: true } 
        );

        if (updatedUser) {
            res.status(200).json({ message: 'Langue supprimée avec succès.', user: updatedUser });
        } else {
            res.status(404).json({ error: "Aucune langue trouvée avec cet ID ou cet email." });
        }
    } catch (err) {
        res.status(500).json({ error: "La suppression de la langue a échoué." });
    }
});


module.exports = router;