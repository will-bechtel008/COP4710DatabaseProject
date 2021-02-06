const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const universitySchema = new Schema({
});

const University = mongoose.model('University', universitySchema);

module.exports = University;