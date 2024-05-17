// Define a schema for the songs
const mongoose = require('mongoose');


const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
});

// Create a model for the songs using the schema
const Song = mongoose.model('songs', songSchema);

module.exports = Song;
