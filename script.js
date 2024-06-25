let songs = [
  {
    songsname: "Zaalima-Raeez",
    song: "songs/Zalima.mp3",
    Image: "images/zalma.jpg",
    time: "05:06",
    icon: "fa-play-circle",
  },
  {
    songsname: "Letme down mix",
    song: "songs/LetmedownslowlyX.mp3",
    Image: "",
    time: "04:22",
    icon: "fa-play-circle",
  },
  {
    songsname: "Faded-Alen Walker",
    song: "songs/faded.mp3",
    Image: "",
    time: "03:33",
    icon: "fa-play-circle",
  },
  {
    songsname: "Gerua-srk",
    song: "songs/Gerua.mp3",
    Image: "",
    time: "04:47",
    icon: "fa-play-circle",
  },
  {
    songsname: "Dandellians-DuaLipa",
    song: "songs/dandellians.mp3",
    Image: "",
    time: "03:55",
    icon: "fa-play-circle",
  },
  {
    songsname: "Hasi ban gaye",
    song: "songs/hasibangaye.mp3",
    Image: "",
    time: "02:36",
    icon: "fa-play-circle",
  },
  {
    songsname: "Icecream-Anime",
    song: "songs/icecream.mp3",
    Image: "",
    time: "02:00",
    icon: "fa-play-circle",
  },
  {
    songsname: "O re piya",
    song: "songs/orepiya.mp3",
    Image: "",
    time: "04:35",
    icon: "fa-play-circle",
  },
];

let songsContainer = document.querySelector(".songContainer"); //song info container bar
let playbar = document.querySelector("#Playbar"); //Main play botton
let mybar = document.querySelector("#myProgressBar"); //progress bar
let song1 = new Audio(songs[0].song);
let previous = document.querySelector("#previous"); //Previous Button
let forward = document.querySelector("#forward"); //Forward button
let gif = document.getElementsByClassName("gif");

function songsBox(songs) {
  let songsHTML = "";

  songs.forEach((song, i) => {
    songsHTML += `<div class="songItem">
    <img src="${song.Image}" alt="1" />
    <span class="songlistplay">
    <i class="far songIcons fa-play-circle"></i>
    </span>
    <span class="songname">${song.songsname}</span>
    <span class="timespan">${song.time}</span>
   <img src="images/gif.gif" class="gif" alt="" />
    </div>`;
  });

  songsContainer.innerHTML = songsHTML;
}

songsBox(songs);

//find the index of currenltly playing or paused song
function pausedSongIndex() {
  return songs.findIndex((song) => song.song === song1.attributes.src.value);
}
//main play button
playbar.addEventListener("click", () => {
  songplay(pausedSongIndex());
});

function iconPlayer(elem) {
  elem.classList.remove("fa-play-circle");
  elem.classList.add("fa-pause-circle");
}

function iconPauser(elem) {
  elem.classList.remove("fa-pause-circle");
  elem.classList.add("fa-play-circle");
}

//Main song player
function songplay(i) {
  if (song1.paused || song1.currentTime <= 0) {
    song1.play();
    iconPlayer(playbar);
    iconPlayer(songIcon[i]);
    songtimer();
    gif[i].style.opacity = 1;
  } else {
    songStoper(i);
  }
}
//Resetting default look of song info bar before playing song
function initialState() {
  Array.from(songIcon).forEach((element, i) => {
    iconPauser(element);
    gif[i].style.opacity = 0;
  });
  song1.pause();
}

//Progress bar updater
function songtimer() {
  song1.addEventListener("timeupdate", () => {
    progressPercentage = parseInt((song1.currentTime / song1.duration) * 100);
    mybar.value = progressPercentage;
  });
}

//Progress bar play section
mybar.addEventListener("change", () => {
  newTime = parseInt((mybar.value * song1.duration) / 100);
  song1.currentTime = newTime;
});

//Listener to all song icons to play specifically cliked
let songIcon = document.getElementsByClassName("songIcons");
Array.from(songIcon).forEach((element, i) => {
  element.addEventListener("click", function (e) {
    if (e.target.classList.contains("fa-pause-circle")) {
      iconPauser(e.target);
      songStoper(i);
    } else if (e.target.classList.contains("fa-play-circle")) {
      song1.pause();
      let songIndex = pausedSongIndex();
      gif[songIndex].style.opacity = 0;
      iconPauser(songIcon[songIndex]);
      iconPlayer(e.target);
      songInitializer(i);
    } else {
      iconPauser(e.target);
      song1.pause();
    }
  });
});

//code to stop a song and specific songs gif and pause icon
function songStoper(i) {
  song1.pause();
  gif[i].style.opacity = 0;
  iconPauser(playbar);
  iconPauser(songIcon[i]);
}

function songInitializer(i) {
  song1 = new Audio(songs[i].song);
  songplay(i);
  song1.currentTime = 0;
}

//forwarding song section
forward.addEventListener("click", () => {
  if (song1.src !== "") {
    let songIndex = pausedSongIndex();

    if (songIndex < songs.length - 1) {
      gif[songIndex].style.opacity = 0;
      iconPauser(songIcon[songIndex]);
      song1.pause();
      songInitializer(songIndex + 1);
    }
  } else {
    songInitializer(0);
  }
});

//Previous button section
previous.addEventListener("click", () => {
  if (song1.src !== "") {
    let songIndex = pausedSongIndex();

    if (songIndex >= 1) {
      gif[songIndex].style.opacity = 0;
      iconPauser(songIcon[songIndex]);
      song1.pause();
      songInitializer(songIndex - 1);
    }
  } else {
    songInitializer(0);
  }
});
