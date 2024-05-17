const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  playlist: [
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Song",
    // },
    {
      name: {
        type: String,
        required: true,
      },
      artist: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
  ],
});

// Create a model for the songs using the schema
const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
