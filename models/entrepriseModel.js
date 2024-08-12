const mongoose = require('mongoose');

// Assuming you have a schema for Entreprise
const entrepriseSchema = new mongoose.Schema({
    name: String,
    location: String,
    fiscal_code: String,
    logo: String,
    offers: [
        {
            title: String,
            description: String,
            type: String,
            mode: String,
            duration_type: String,
            minimal_duration: Number,
            maximal_duration: Number,
            expiration_date: Date,
            phone_number: String,
            email: String
        }
    ]
});

const Entreprise = mongoose.model('Entreprise', entrepriseSchema);



// Get entreprise with location 'Tunisia'
async function getEntreprise() {
    try {
        const entreprise = await Entreprise.findOne({ location: 'Tunisia' });
        return entreprise;
    } catch (error) {
        console.error('Error getting entreprise:', error);
    }
}

// List entreprises based on filter
async function listEntreprises(filter) {
    try {
        const entreprisesList = await Entreprise.find(filter);
        return entreprisesList;
    } catch (error) {
        console.error('Error listing entreprises:', error);
    }
}

// Aggregate entreprises
async function aggregateEntreprises() {
    try {
        const entreprisesList = await Entreprise.aggregate([
            {
                $unwind: "$offers"
            },
            {
                $group: {
                    _id: "$location",
                    totalOffers: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: null,
                    locations: { $push: { k: "$_id", v: "$totalOffers" } }
                }
            },
            {
                $replaceRoot: {
                    newRoot: { $arrayToObject: "$locations" }
                }
            }
        ]);
        console.log(entreprisesList);
        return entreprisesList;
    } catch (error) {
        console.error('Error aggregating entreprises:', error);
    }
}

// Add or update entreprise
async function addEntreprises(body) {
    try {
        const entreprise = await Entreprise.findOne({ name: body.nomsociete, location: body.countries });
        if (entreprise == null) {
            await Entreprise.create({
                name: body.nomsociete,
                location: body.countries,
                fiscal_code: body.codefiscal,
                logo: body.logoentreprise,
                offers: [
                    {
                        title: body.titre,
                        description: body.description,
                        type: body.type,
                        mode: body.mode,
                        duration_type: body.dureetype,
                        minimal_duration: body.dureemin,
                        maximal_duration: body.dureemax,
                        expiration_date: body.dateexp,
                        phone_number: body.contactp1,
                        email: body.contacte1
                    }
                ]
            });
        } else {
            entreprise["offers"].push({
                title: body.titre,
                description: body.description,
                type: body.type,
                mode: body.mode,
                minimal_duration: body.dureemin,
                maximal_duration: body.dureemax,
                duration_type: body.dureetype,
                expiration_date: body.dateexp,
                phone_number: body.contactp1,
                email: body.contacte1
            });
            await entreprise.save();
        }
    } catch (error) {
        console.error('Error adding/updating entreprise:', error);
    }
}


module.exports = { Entreprise, listEntreprises, getEntreprise, addEntreprises, aggregateEntreprises };
