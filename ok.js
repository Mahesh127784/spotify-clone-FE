console.log("Spotify");

let songs = [
  {
    songsname: "Zaalima-Raeez",
    song: "Zalima.mp3",
    Image: "",
    time: "05:06",
    icon: "fa-play-circle",
  },
  {
    songsname: "Letme down mix",
    song: "LetmedownslowlyX.mp3",
    Image: "",
    time: "04:22",
    icon: "fa-play-circle",
  },
  {
    songsname: "Faded-Alen Walker",
    song: "faded.mp3",
    Image: "",
    time: "03:33",
    icon: "fa-play-circle",
  },
  {
    songsname: "Gerua-srk",
    song: "Gerua.mp3",
    Image: "",
    time: "04:47",
    icon: "fa-play-circle",
  },
  {
    songsname: "Dandellians-DuaLipa",
    song: "dandellians.mp3",
    Image: "",
    time: "03:55",
    icon: "fa-play-circle",
  },
  {
    songsname: "Hasi ban gaye",
    song: "hasibangaye.mp3",
    Image: "",
    time: "02:36",
    icon: "fa-play-circle",
  },
  {
    songsname: "Icecream-Anime",
    song: "icecream.mp3",
    Image: "",
    time: "02:00",
    icon: "fa-play-circle",
  },
  {
    songsname: "O re piya",
    song: "orepiya.mp3",
    Image: "",
    time: "04:35",
    icon: "fa-play-circle",
  },
];
iconToggler;
let songsItem = Array.from(document.getElementsByClassName("songItem")); //song info container bar
let playbar = document.querySelector("#Playbar"); //Main play botton
let mybar = document.querySelector("#myProgressBar"); //progress bar
let songIcon = Array.from(document.getElementsByClassName("songIcons")); //Play button inside song info bar
let song1 = new Audio(songs[0].song);
let previous = document.querySelector("#previous"); //Previous Button
let forward = document.querySelector("#forward"); //Forward button

//main play button
playbar.addEventListener("click", () => {
  songplay();
});

function iconPauser(playbar) {
  playbar.classList.remove("fa-play-circle");
  playbar.classList.add("fa-pause-circle");
}

function iconPlayer(playbar) {
  playbar.classList.remove("fa-pause-circle");
  playbar.classList.add("fa-play-circle");
}

//Main song player
function songplay() {
  if (song1.paused || song1.currentTime <= 0) {
    song1.play();
    iconPauser(playbar);
    songtimer();
  } else {
    song1.pause();
    player();
    iconPlayer(playbar);
  }
}

//Progress bar updater
function songtimer() {
  song1.addEventListener("timeupdate", () => {
    progressPercentage = parseInt((song1.currentTime / song1.duration) * 100);
    mybar.value = progressPercentage;
  });
}

//Looping song info container bar for adding info of song
songsItem.forEach((element, i) => {
  gifCreator(element);
  element.getElementsByClassName("songname")[0].innerHTML = songs[i].songsname;
  element.querySelector(".timespan").innerHTML = songs[i].time;
});

//gif setter in song info bar
function gifCreator(element) {
  let a = document.createElement("img");
  a.src = "gif.gif";
  a.className = "gif";
  element.appendChild(a);
}

//Progress bar play section
mybar.addEventListener("change", () => {
  newTime = parseInt((mybar.value * song1.duration) / 100);
  song1.currentTime = newTime;
});

//Song player according to info bar button event
songIcon.forEach((element, i) => {
  element.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-pause-circle")) {
      iconPlayer(element);
      songStoper(i);
    } else {
      player();
      if (e.target.classList.contains("fa-play-circle")) {
        iconPauser(e.target);
        songInitializer(i);
      } else {
        iconPlayer(e.target);
      }
    }
  });
});

function songStoper(i) {
  song1.pause();
  let gif = document.getElementsByClassName("gif")[i];
  gif.style.opacity = 0;
  iconPlayer(playbar);
}

function songInitializer(i) {
  song1 = new Audio(songs[i].song);
  songplay();
  song1.currentTime = 0;
  let gif = document.getElementsByClassName("gif")[i];
  gif.style.opacity = 1;
}
//Resetting default look of song info bar before playing song
function player() {
  songIcon.forEach((element) => {
    iconPlayer(element);
    song1.pause();
  });
  let gifs = Array.from(document.getElementsByClassName("gif"));
  gifs.forEach((elem) => {
    elem.style.opacity = 0;
  });
}

//forwarding song section
forward.addEventListener("click", () => {
  if (song1.src !== "") {
    player();
    let songIndex;
    // To find the index of the currently playing song
    songs.forEach((elem, i) => {
      if (song1.src.includes(elem.song)) {
        console.log(i);
        songIndex = i;
      }
    });
    if (songIndex < songs.length - 1) {
      song1.pause();
      song1 = new Audio(songs[songIndex + 1].song);
      songplay();
      let icons = document.getElementsByClassName("songIcons")[songIndex + 1];
      iconPauser(icons);
      let gif = document.getElementsByClassName("gif")[songIndex + 1];
      gif.style.opacity = 1;
    }
  } else {
    console.log("Play a song");
  }
});

//Previous button section
previous.addEventListener("click", () => {
  if (song1.src !== "") {
    player();
    songs.forEach((elem, i) => {
      if (song1.src.includes(elem.song)) {
        console.log(i);
        if (i >= 1) {
          song1.pause();
          song1 = new Audio(songs[i - 1].song);
          songplay();
          let icons = document.getElementsByClassName("songIcons")[i - 1];
          iconPauser(icons);
          let gif = document.getElementsByClassName("gif")[i - 1];
          gif.style.opacity = 1;
        }
      }
    });
  } else {
    song1 = new Audio("hasibangaye.mp3");
    songplay();
  }
});
