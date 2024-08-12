const express = require('express');
const router = express.Router();
const multer = require('multer');   
const upload = multer({ dest: 'images/' }); 
const fs = require('fs'); 


const user = require('../models/user');

router.post('/update_infos', upload.single("userProfil"), async (req, res) => {
    const id = req.body.userID;

    const updates = {
        nom : req.body.userName,
        prenom: req.body.userLastName,
        telephone: req.body.userPhone,
        adresse: req.body.userAdresse,
        pays: req.body.userPays,
        date_anniversaire : req.body.userBirth,
        titre: req.body.usertitle,
        description: req.body.userAbout
    };

    if (!id) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        const userr = await user.findByIdAndUpdate(id, updates, { new: true });
        if (!userr) {
            return res.status(404).json({ error: "User not found" });
        }
        const file = req.file;
        if (file) {
            const filePath = file.path;
            const data = await fs.promises.readFile(filePath);
            userr.image = data; 
            await userr.save(); 
        }
        console.log('Utilisateur mis à jour avec succès :', userr);
        res.redirect(`/user/portfolio-details/${userr['email']}`);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "La mise à jour échoue!" });
    }
});

module.exports = router;