const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: Buffer,
    nom: String,
    prenom: String,
    telephone: Number,
    adresse: String,
    pays: String,
    date_anniversaire: Date,
    titre: String,
    description: String,
    experiences: [
        {
            intitule: String,
            logo: Buffer,
            employeur: String,
            actuel: { type: Number, enum: [0, 1] },
            debut: Date,
            fin: Date,
            lieu: String,
            description: String
          }
    ],
    formations: [
        {
            etablissement: String,
            diplome: String,
            debut: Date,
            fin: Date,
            resultat: String,
            description: String
          }
    ],
    competences: [
        {
            competence: String
        }
    ],
    langues: [
        {
            langue: String,
            niveau: String,
          }
    ],
    certifications: [
        {
            certificat: String,
            plateforme: String,
            code: String,
            date: Date
          }
    ],
    clubs: [
        {
            nom: String,
            fonction: String,
            actuel: { type: Number, enum: [0, 1] },
            debut: Date,
            fin: Date,
            description: String
          }
    ]
});

module.exports = mongoose.model('User', userSchema);