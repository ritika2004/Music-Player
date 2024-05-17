// seeds/songSeed.js
const mongoose = require("mongoose");
const Song = require("../models/Song");

const songs = [
  {
    name: "Aaj Phir Jeene Ki ",
    artist: "Lata Mangeshkar",
    image: "/image/1.jpg",
    path: "/songsList/1.mp3",
  },
  {
    name: "Still With You",
    artist: "JJk",
    image: "/image/2.jpg",
    path: "/songsList/2.mp3",
  },
  {
    name: "Excuses",
    artist: "AP Dhillon",
    image: "/image/3.jpeg",
    path: "/songsList/3.mp3",
  },
  {
    name: "Ve Haaniyaan",
    artist: "Avvy Sara",
    image: "/image/4.jpeg",
    path: "/songsList/4.mp3",
  },
  {
    name: "Munda Sona Hun Main",
    artist: "Diljit Dosanjh",
    image: "/image/5.jpeg",
    path: "/songsList/5.mp3",
  },
];

async function seedSongs() {
  try {
    await Song.insertMany(songs);
    console.log("Songs seeded successfully");
  } catch (error) {
    console.error("Error seeding songs:", error);
  }
}

// seedSongs();

module.exports = {
  songs: songs,
  seedSongs: seedSongs,
};
