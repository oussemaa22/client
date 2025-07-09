const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Contact = require('./models/contact');

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://clients:24850093@cluster0.ejylr1n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() =>{
    console.log("connected sucessfully ");
}).catch((error) =>{
    console.log("error with connecting to the DB ",error);
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Route menu principal
app.get('/menu', (req, res) => {
    res.render('menu');
});

// Ajouter un client
app.get('/add', (req, res) => {
    res.render('add');
});
app.post('/add', async (req, res) => {
    const { nom, prenom, telephone } = req.body;
    await Contact.create({ nom, prenom, telephone });
    res.redirect('/menu');
});

// Supprimer un client
app.get('/delete', async (req, res) => {
    const contacts = await Contact.find();
    res.render('delete', { contacts });
});
app.post('/delete/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/delete');
});

// Modifier un client
app.get('/edit', async (req, res) => {
    const contacts = await Contact.find();
    res.render('edit', { contacts });
});
app.post('/edit/:id', async (req, res) => {
    const { nom, prenom, telephone } = req.body;
    await Contact.findByIdAndUpdate(req.params.id, { nom, prenom, telephone });
    res.redirect('/edit');
});

// Redirection par défaut
app.get('/', (req, res) => res.redirect('/menu'));


//affichage

app.get('/clients', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.render('affichage', { contacts });
    } catch (err) {
        res.status(500).send("Erreur lors de la récupération des données.");
    }
});
// Lancer le serveur
app.listen(3000, () => {
    console.log("Server has been launched on port 3000 ...");
});

