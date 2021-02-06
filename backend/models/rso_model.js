const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsoSchema = new Schema({
});

const RSO = mongoose.model('Rso', rsoSchema);

module.exports = RSO;