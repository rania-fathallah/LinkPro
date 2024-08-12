const express = require('express');
const router = express.Router();
const { Entreprise, getEntreprise, listEntreprises, aggregateEntreprises, addEntreprises } = require('../models/entrepriseModel');


router.get('/', async (_, res) => {
    try {
        const resultat = await Entreprise.findOne({ location: 'Tunisia' });
        res.render('formentre',);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const existingEntreprise = await Entreprise.findOne({ name: req.body.nomsociete, location: req.body.countries });

        if (!existingEntreprise) {
            await Entreprise.create({
                name: req.body.nomsociete,
                location: req.body.countries,
                fiscal_code: req.body.codefiscal,
                logo: req.body.logoentreprise,
                offers: [
                    {
                        title: req.body.titre,
                        description: req.body.description,
                        type: req.body.type,
                        mode: req.body.mode,
                        duration_type: req.body.dureetype,
                        minimal_duration: req.body.dureemin,
                        maximal_duration: req.body.dureemax,
                        expiration_date: req.body.dateexp,
                        phone_number: req.body.contactp1,
                        email: req.body.contacte1
                    }
                ]
            });
        } else {
            existingEntreprise.offers.push({
                title: req.body.titre,
                description: req.body.description,
                type: req.body.type,
                mode: req.body.mode,
                minimal_duration: req.body.dureemin,
                maximal_duration: req.body.dureemax,
                duration_type: req.body.dureetype,
                expiration_date: req.body.dateexp,
                phone_number: req.body.contactp1,
                email: req.body.contacte1
            });

            await existingEntreprise.save();
        }
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
    res.render("formaffiche", {
        titre: req.body.titre,
        nomsociete: req.body.nomsociete,
        localisation: req.body.countries,
        type: req.body.type,
        dateexp: req.body.dateexp,
        dureemin: req.body.dureemin,
        dureemax: req.body.dureemax,
        description: req.body.description
    });
});

router.get('/about_us', async (_, res) => {
    try {
        const examples = await Entreprise.find();
        res.render('about_us', { examples: examples || [] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/job_search', async (req, res) => {
    try {
        const examples = await Entreprise.find();
        const aggregate = await Entreprise.aggregate([
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

        res.render('job_search', { examples: examples || [], aggregate: aggregate });
    } catch (error) {
        console.error('Error fetching examples from database:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/filter_examples', async (req, res) => {
    try {
        const { name, localisations, keywords } = req.body;

        // Construct the filter based on received localisations and keywords
        const filter = {};

        console.log('hello', name);
        if (localisations && localisations.length > 0) {
            filter.location = { $in: localisations };
        }
        console.log(localisations);
        if (keywords && keywords.length > 0) {
            filter.keywords = { $in: keywords };
        }

        if (name) {
            filter.$or = [
                { "name": { "$regex": name, "$options": "i" } },
                { "offers": { "$elemMatch": { "title": { "$regex": name, "$options": "i" } } } }
            ]
        }

        // Use the find method and chain with exec to execute the query
        const filteredExamples = await Entreprise.find(filter);
        console.log(filter);
        console.log("lo" + filteredExamples);
        // Send the filtered examples to the client
        res.json(filteredExamples);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;

