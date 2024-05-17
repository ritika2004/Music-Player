const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    const uniqueNames = await Playlist.distinct("name");
    const users = await User.find();
    const playlistData = await Playlist.find();

    let username = "";
    users.forEach((user) => {
      if (user.name) {
        username = user.name;
      }
    });

    res.render("index", {
      songs: songs,
      uniqueNames: uniqueNames,
      username: username,
      playlistData: playlistData,
    });
  } catch (error) {
    console.error("Error getting songs:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  const { action } = req.body;

  try {
    if (action === "addToPlaylist") {
      // console.log("Inside AddToPlaylist");
      const { songName, playlistName } = req.body;
      console.log(req.body);
      if (!songName || !playlistName) {
        return res
          .status(400)
          .json({ error: "Song name and playlist name are required" });
      }
      const playlist = await Playlist.findOne({ name: playlistName });

      console.log("Selected Playlist : ", playlist);
      // Create a new song document if it doesn't already exist
      let song = await Song.findOne({ name: songName });
      console.log("selected song : ", song);

      // Push the ID of the new song document to the playlist
      playlist.playlist.push(song);
      await playlist.save();
      return res
        .status(200)
        .json({ message: "Song added to playlist successfully" });
    } else if (action === "createPlaylist") {
      // Handle creating a new playlist
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: "Playlist name is required" });
      }

      const newPlaylist = new Playlist({ name });
      await newPlaylist.save();
      // return res.status(200).json({ message: "Playlist created successfully" });
    } else if (action === "deletePlaylist") {
      // Handle deleting the selected playlist
      const { playlistName } = req.body;
      const playlist = await Playlist.findOneAndDelete({ name: playlistName });
      console.log("Deleted Playlist Name : ", playlist);
    } else if (action === "showPlayList") {
      const { play_list_name } = req.body;
      // console.log("play_list_name : ", play_list_name);
      const playListSongs = await Playlist.findOne({ name: play_list_name });
      // console.log(playListSongs);
      // console.log(playListSongs.playlist);
      return res.status(200).json({ songs: playListSongs.playlist });
    } else {
      // Invalid action
      return res.status(400).json({ error: "Invalid action" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
