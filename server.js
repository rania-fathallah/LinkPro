//import dependencies
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config({ path: '.env.local' });

//import utils
const { connectToDB } = require('./utils/db');

//import routes
const feedRoutes = require('./routes/feed');
const certificationRoutes = require('./routes/certification');
const clubRoutes = require('./routes/club');
const competenceRoutes = require('./routes/competence');
const experienceRoutes = require('./routes/experience');
const formationRoutes = require('./routes/formation');
const infoRoutes = require('./routes/info');
const languesRoutes = require('./routes/langues');
const userRoutes = require('./routes/user');
const entRoutes = require('./routes/entrepriseRoutes');


const PORT = process.env.PORT || 8080; // Use 8080 if PORT is not defined
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(express.static('assets'));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));
app.set('view engine', 'ejs'); 
app.set('layout','/views/layouts/about_us_layout')
app.set('layout','/views/layouts/job_search_layout')


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('home');
});

//use routes
app.use('/user', userRoutes);
app.use('/langue', languesRoutes);
app.use('/info', infoRoutes);
app.use('/formation', formationRoutes);
app.use('/experience', experienceRoutes);
app.use('/competence', competenceRoutes);
app.use('/club', clubRoutes);
app.use('/certification', certificationRoutes);
app.use('/feed', feedRoutes);
app.use('/ent', entRoutes);




app.listen(PORT, async() => {
    await connectToDB();
    console.log(`ProjetWeb app listening at http://localhost:${PORT}`);
});
