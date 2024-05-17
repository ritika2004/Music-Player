// Select all the elements in the HTML page and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_Art_Img = document.querySelector(".track-art img");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement("audio");

// Define the list of tracks that have to be played
let track_list = [
  {
    name: "Aaj Phir Jeene Ki",
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

const queue = track_list;

// function loadTrack(track_index) {
//   // Clear the previous seek timer
//   clearInterval(updateTimer);
//   resetValues();

//   // Load a new track
//   curr_track.src = track_list[track_index].path;
//   curr_track.load();

//   // Update details of the track
//   track_art.style.backgroundImage =
//     "url(" + track_list[track_index].image + ")";
//   // Update the src attribute with the image URL from track_list
//   track_Art_Img.src = track_list[track_index].image;
//   track_name.textContent = track_list[track_index].name;
//   track_artist.textContent = track_list[track_index].artist;
//   now_playing.textContent =
//     // "PLAYING " + (track_index + 1) + " OF " + track_list.length;
//     "PLAYING " + (track_index + 1) + " OF " + track_list.length;

//   // Set an interval of 1000 milliseconds
//   // for updating the seek slider
//   updateTimer = setInterval(seekUpdate, 1000);

//   // Move to the next track if the current finishes playing
//   // using the 'ended' event
//   curr_track.addEventListener("ended", nextTrack);
// }

// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  // console.log("PLayPause is called");
  if (curr_track.paused) {
    curr_track.play();
    isPlaying = true; // Update the isPlaying flag
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'; // Change icon to pause
  } else {
    curr_track.pause();
    isPlaying = false; // Update the isPlaying flag
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'; // Change icon to play
  }
}

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;

  // Load and play the new track
  loadTrack(track_index);
  // playTrack();
  playpauseTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length - 1;

  // Load and play the new track
  loadTrack(track_index);
  playpauseTrack();
}

function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  seekto = curr_track.duration * (seek_slider.value / 100);

  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}

function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    // Add a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Load the first track in the tracklist
loadTrack(track_index);

// NEW PLAYLIST FORM

function removeBlock() {
  const new_playlist = document.querySelector(".new-playlist");
  new_playlist.style.display = "none";
  const lines = document.querySelectorAll(".lines");
  lines.forEach((line) => {
    line.style.opacity = "1";
  });
}

function openBlock() {
  const new_playlist = document.querySelector(".new-playlist");
  new_playlist.style.display = "block";
  const lines = document.querySelectorAll(".lines");
  lines.forEach((line) => {
    line.style.opacity = "0.5";
  });
  new_playlist.style.opacity = "1";
}

function addItem(value) {
  const sidebar = document.querySelector(".sidebar");

  const boxLi = document.createElement("li");
  boxLi.classList.add("box");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-music");

  boxLi.appendChild(icon);

  const playlistName = document.createElement("a");
  playlistName.classList = "openPlaylists";
  playlistName.textContent = `${value}`;

  boxLi.appendChild(playlistName);

  sidebar.appendChild(boxLi);
}

//QUEUELIST

function showQueueList() {
  const songList = document.querySelector(".songLists");
  // console.log("show queue in js file");
  songList.style.display = "block";
  const lines = document.querySelectorAll(".lines");
  lines.forEach((line) => {
    line.style.opacity = "0.5";
  });
  songList.style.opacity = "1";
}

function removeQueueList() {
  const songList = document.querySelector(".songLists");
  // console.log("Remove Queue from js file ");
  songList.style.display = "none";
  const lines = document.querySelectorAll(".lines");
  lines.forEach((line) => {
    line.style.opacity = "1";
  });
}

function toggleSearchBar() {
  const search_box = document.querySelector(".search_box");
  const computedStyle = window.getComputedStyle(search_box);
  const displayPropertyValue = computedStyle.getPropertyValue("display");
  if (displayPropertyValue === "block") {
    search_box.style.display = "none";
  } else {
    search_box.style.display = "block";
  }
}

const searchInput = document.getElementById("searchInput");
function searchSongs(query) {
  const searchQuery = query.toLowerCase();

  const searchResults = track_list.filter((track) => {
    const trackName = track.name.toLowerCase();
    const artistName = track.artist.toLowerCase();

    return trackName.includes(searchQuery) || artistName.includes(searchQuery);
  });

  return searchResults.length > 0
    ? searchResults
    : [
        {
          name: "Track Not Found",
          artist: "Unknown Artist",
          image: "",
          path: "",
        },
      ];
}

function displaySearchResults(results) {
  if (results[0].name === "Track Not Found") {
    results.forEach((song) => {
      const firstSearchLine = document.querySelector("#firstSearchLine");
      firstSearchLine.style.display = "block";
      const li = document.querySelector(".group");
      li.innerHTML = `
          <div class="card">
            No Song Found
          </div>
        `;
    });
  } else {
    results.forEach((song) => {
      const firstSearchLine = document.querySelector("#firstSearchLine");
      firstSearchLine.style.display = "block";
      const li = document.querySelector(".group");
      li.innerHTML = `
          <div class="card">
            <img src="${song.image}" alt="songimage" id="songImage">
            <div class="caption">
              <span class="naming">
                <h5 id="song_name">${song.name}</h5>
                <h5 id="artist_name">${song.artist}</h5>
              </span>
              <div class="playbtn">
                <button class="playButton"><i class="fa-solid fa-play"></i></button>
                <i class="fa-solid fa-circle-plus addToPlaylist"></i>
              </div>
            </div>
          </div>
        `;
      const searchPlayButton = li.querySelector(".playButton");
      searchPlayButton.addEventListener("click", () => {
        const songName = li.querySelector("#song_name").innerText;
        updatePlayerAndPlay(songName);
      });
      const addToPlaylist = li.querySelector(".addToPlaylist");
      addToPlaylist.addEventListener("click", () => {
        const playSong = `${song.name}`;
        openFormToAddToPlayList(playSong);
      });
    });
  }
}

// update the track to the player
function updatePlayerAndPlay(trackName) {
  var foundTrack = track_list.find((track) => track.name === trackName);
  var index = track_list.indexOf(foundTrack);
  loadTrack(index);
}

//manage playlist

function openManageList() {
  const deleteList = document.querySelector(".delete");
  deleteList.style.display = "block";
  const lines = document.querySelectorAll(".lines");
  lines.forEach((line) => {
    line.style.opacity = "0.5";
  });
}

function closeManageList() {
  const deleteList = document.querySelector(".delete");
  deleteList.style.display = "none";
  const lines = document.querySelectorAll(".lines");
  lines.forEach((line) => {
    line.style.opacity = "1";
  });
}

// showplaylists

function showPlayLists(play_list_name) {
  const playlistForm = document.querySelector(".playlist");
  const playListName = document.querySelector(".playListName");
  playListName.textContent = play_list_name;

  playlistForm.style.display = "block";
  const lines = document.querySelectorAll(".lines");
  lines.forEach((line) => {
    line.style.opacity = "0";
  });
}

function updatePlaylist(playlistData) {
  console.log("PlaylistData : ", playlistData);
  const songListOfPlaylist = document.querySelector(".songListOfPlaylist");
  songListOfPlaylist.innerHTML = "";
  for (let p in playlistData) {
    const listItem = document.createElement("li");
    listItem.classList.add("listOfSongs");
    listItem.innerHTML = `
          <img src="${playlistData[p].image}" alt="songImage" id="indSong">
          <p class="songName" id="name_of_song">${playlistData[p].name}</p>
          <p class="artistName">${playlistData[p].artist}</p>
          <i class="fa-solid fa-play playPlayList"></i>
      `;
    songListOfPlaylist.appendChild(listItem);
    const playPlayList = document.querySelectorAll(".playPlayList");
    playPlayList.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        const list = btn.closest(".listOfSongs");
        const trackName = list.querySelector("#name_of_song").innerText;
        updatePlayerAndPlay(trackName);
      });
    });
  }
}

//hide playlists

function hidePlayLists() {
  const playlist = document.querySelector(".playlist");
  playlist.style.display = "none";
  const lines = document.querySelectorAll(".lines");
  lines.forEach((line) => {
    line.style.opacity = "1";
  });
}

//add to playlist functions

function closeFormForAddingANewSong() {
  const addToPlaylistForm = document.querySelector(".addToPlaylistForm");
  addToPlaylistForm.style.display = "none";
  const lines = document.querySelectorAll(".lines");
  lines.forEach((line) => {
    line.style.opacity = "1";
  });
}

function openFormToAddToPlayList(currSongName) {
  const addToPlaylistForm = document.querySelector(".addToPlaylistForm");
  addToPlaylistForm.style.display = "block";
  const selectedSongName = document.querySelector(".selectedSongName");
  selectedSongName.innerText = `${currSongName}`;
  // console.log(currSongName);
  const lines = document.querySelectorAll(".lines");
  lines.forEach((line) => {
    line.style.opacity = "0.5";
  });
}

function foundSong(nameOfSong) {
  for (let v in track_list) {
    // const str = "Ve Haaniyaan";
    if (track_list[v].name == nameOfSong) {
      return track_list[v];
    }
  }
}

// saved to queue
function saveSongToQueue(nameOfSong) {
  // console.log("inside : ", nameOfSong);
  if (queue.length === 0) {
    let songObj = foundSong(nameOfSong);
    console.log("Found Song", songObj);
    queue.push(songObj);
    displayQueueAdded(nameOfSong);
    console.log(queue);
  } else {
    let lastInQueue = queue[queue.length - 1];
    if (lastInQueue !== nameOfSong) {
      let songObj = foundSong(nameOfSong);
      // console.log("Found Song", songObj);
      queue.push(songObj);
      displayQueueAdded(nameOfSong);
      console.log(queue);
    } else {
      alert("This song is already in the Queue.");
    }
  }
}

function displayQueueAdded(nameOfSong) {
  const songListItems = document.querySelector(".songListItems");
  const li = document.createElement("li");
  li.classList = "songItem";
  const h5 = document.createElement("h5");
  h5.classList = "queueSong";
  h5.textContent = `${nameOfSong}`;
  const button = document.createElement("button");
  button.classList = "playQueue";
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-play");
  button.appendChild(icon);
  li.appendChild(h5);
  li.appendChild(button);
  songListItems.append(li);
  // updatePlayerAndPlay(nameOfSong);
}

function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();

  // Load a new track
  curr_track.src = queue[track_index].path;
  curr_track.load();

  // Update details of the track
  track_art.style.backgroundImage = "url(" + queue[track_index].image + ")";
  // Update the src attribute with the image URL from track_list
  track_Art_Img.src = queue[track_index].image;
  track_name.textContent = queue[track_index].name;
  track_artist.textContent = queue[track_index].artist;
  // now_playing.textContent =
  //   // "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  //   "PLAYING " + (track_index + 1) + " OF " + queue.length;

  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);

  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
}
