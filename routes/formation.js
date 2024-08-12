const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongoose').Types; 
 

const user = require('../models/user');

router.post('/ajout_formation', async (req, res) => {

    let e = req.body.email_ajout_formation;
    const formation = {
        etablissement: req.body.etablissement,
        diplome: req.body.diplome,
        debut: req.body.debut_formation,
        fin: req.body.fin_formation,
        resultat: req.body.resultat,
        description: req.body.description_formation,
    };

    const userr = await user.findOne({ email: e });
    userr.formations.push(formation);
    console.log(userr);
    await userr.save();
    res.redirect(`/user/portfolio-details/${e}`);

});

router.post('/update_formation', async (req, res) => {
    const id = req.body.id_formation;
    let e = req.body.email_update_formation;

    const formationUpdates = {
        etablissement: req.body.etablissement_update,
        diplome: req.body.diplome_update,
        debut: req.body.debut_formation_update,
        fin: req.body.fin_formation_update,
        resultat: req.body.resultat_update,
        description: req.body.description_update,
    };

    try {
        let userr = await user.findOne({ email: e });

        const indice = userr.formations.findIndex(formation => formation._id.toString() == id);
        console.log(indice);
        
        if (indice !== -1) {
            userr.formations[indice] = formationUpdates;
            await userr.save();
            console.log("Formation mise à jour avec succès !");
            res.redirect(`/user/portfolio-details/${e}`);
        } else {
            res.status(404).send("Formation non trouvée.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour.");
    }
});

router.delete('/delete_formation/:email/:id', async (req, res) => {
    const id = req.params.id;
    let e = req.params.email;
    try {
        const updatedUser = await user.findOneAndUpdate(
            { email: e },
            { $pull: { formations: { _id: new ObjectId(id) } } },
            { new: true } 
        );

        if (updatedUser) {
            res.status(200).json({ message: 'Formation supprimée avec succès.', user: updatedUser });
        } else {
            res.status(404).json({ error: "Aucune formation trouvée avec cet ID ou cet email." });
        }
    } catch (err) {
        res.status(500).json({ error: "La suppression de la formation a échoué." });
    }
});

module.exports = router;