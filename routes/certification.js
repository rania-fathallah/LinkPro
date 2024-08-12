const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongoose').Types; 


const user = require('../models/user');

router.post('/ajout_certification', async (req, res) => {
    let e = req.body.email_ajout_certification;
    const certification = {
        certificat: req.body.certificat,
        plateforme: req.body.plateforme,
        code: req.body.code,
        date: req.body.date_certif 
    };
    const userr = await user.findOne({ email: e });
    userr.certifications.push(certification);
    await userr.save();
    res.redirect(`/user/portfolio-details/${e}`);
});


router.post('/update_certification', async (req, res) => {
    const id = req.body.id_certification;
    let e = req.body.email_update_certification;

    const certificationUpdates = {
        certificat : req.body.certificat_update,
        plateforme: req.body.plateforme_update,
        code: req.body.code_update,
        date: req.body.date_certif_update 
    };
    
    try {
        let userr = await user.findOne({ email: e });
        console.log(id);
        const indice = userr.certifications.findIndex(c => c._id.toString() == id);
        console.log(indice);
        
        if (indice !== -1) {
            userr.certifications[indice] = certificationUpdates;
            await userr.save();
            console.log("Certification mise à jour avec succès !");
            res.redirect(`/user/portfolio-details/${e}`);
        } else {
            res.status(404).send("Certification non trouvée.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour.");
    }
});
router.delete('/delete_certification/:email/:id', async (req, res) => {
    const id = req.params.id;
    let e = req.params.email;
    try {
        const updatedUser = await user.findOneAndUpdate(
            { email: e },
            { $pull: { certifications: { _id: new ObjectId(id) } } },
            { new: true } 
        );

        if (updatedUser) {
            res.status(200).json({ message: 'Certification supprimée avec succès.', user: updatedUser });
        } else {
            res.status(404).json({ error: "Aucune certification trouvée avec cet ID ou cet email." });
        }
    } catch (err) {
        res.status(500).json({ error: "La suppression de la certification a échoué." });
    }
});

module.exports = router;