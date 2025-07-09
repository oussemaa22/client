const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    telephone: String
});

module.exports = mongoose.model('Contact', contactSchema);
