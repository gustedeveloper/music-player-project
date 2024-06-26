const playlistSongs = document.getElementById('playlist-songs');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const shuffleButton = document.getElementById('shuffle');

const allSongs = [{
    id: 0,
    title: "Save Me",
    artist: "Anyma, Cassian, Poppy Baskcomb",
    duration: "3:09",
    src: "songs/song0.mp3",
    img: "./images/img0.png"
},
{
    id: 1,
    title: "Get Wiser",
    artist: "DJ Zinc, Mozey, M.A.R.Y",
    duration: "2:36",
    src: "songs/song1.mp3",
    img: "./images/img1.png"
},
{
    id: 2,
    title: "Faded - Odesza Remix",
    artist: "ZH, ODESZA",
    duration: "3:58",
    src: "songs/song2.mp3",
    img: "./images/img2.png"
},
{
    id: 3,
    title: "Green Light",
    artist: "goddard., Megan Linnell",
    duration: "3:33",
    src: "songs/song3.mp3",
    img: "./images/img3.png"
},
{
    id: 4,
    title: "Wasted Youth",
    artist: "goddard., Cat Burns",
    duration: "2:27",
    src: "songs/song4.mp3",
    img: "./images/img4.png"
},
{
    id: 5,
    title: "Chase The Sun",
    artist: "Koven",
    duration: "3:09",
    src: "songs/song5.mp3",
    img: "./images/img5.png"
},
{
    id: 6,
    title: "Foget It",
    artist: "Matroda",
    duration: "2:53",
    src: "songs/song6.mp3",
    img: "./images/img6.png"
},
{
    id: 7,
    title: "CALMNESS",
    artist: "MVTRIIIX, Kingpin Skinny Pimp",
    duration: "2:28",
    src: "songs/song7.mp3",
    img: "./images/img7.png"
},
{
    id: 8,
    title: "Lifetime",
    artist: "Tobiahs",
    duration: "2:38",
    src: "songs/song8.mp3",
    img: "./images/img8.png"
},
{
    id: 9,
    title: "Rave Out",
    artist: "Turno, Skepsis, Charlotte Plank",
    duration: "2:28",
    src: "songs/song9.mp3",
    img: "./images/img9.png"
}];

const audio = new Audio();

const progressBar = document.getElementById('progress-bar');

// Función para actualizar el valor máximo de la barra de progreso cuando se carga una nueva canción
const updateMaxDuration = () => {
    progressBar.max = audio.duration;
};

// Evento para actualizar el valor máximo de la barra de progreso cuando se carga una nueva canción
audio.addEventListener('loadedmetadata', updateMaxDuration);

// Evento para actualizar el valor máximo de la barra de progreso cuando la canción se cambia
audio.addEventListener('timeupdate', updateMaxDuration);

// Evento para actualizar la posición de la barra de progreso conforme avanza la canción
audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime;
});

// Evento para permitir controlar la canción al mover la barra de progreso
progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
});


let userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0,
};

const playSong = (id) => {
    const song = userData?.songs.find((song) => song.id === id);
    audio.src = song.src;
    audio.title = song.title;

    if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
        audio.currentTime = 0;
    } else {
        audio.currentTime = userData?.songCurrentTime;
    }
    userData.currentSong = song;
    playButton.classList.add("playing");
    pauseButton.classList.remove("pausing");
    setCurrentSongImg();
    highlightCurrentSong();
    setPlayerDisplay();
    audio.play();
}

const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime;
    playButton.classList.remove("playing");
    pauseButton.classList.add("pausing");
    audio.pause();
}

const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

const playPreviousSong = () => {

    if (userData?.currentSong === null) {
        return;
    } else if (audio.currentTime > 8) {
        audio.currentTime = 0;
        playSong(userData?.currentSong.id);
    } else {
        const currentSongIndex = getCurrentSongIndex();
        const previousSong = userData?.songs[currentSongIndex - 1];
        playSong(previousSong.id);
    }
}

const playNextSong = () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id);
    } else {
        const currentSongIndex = getCurrentSongIndex();
        const nextSong = userData?.songs[currentSongIndex + 1];
        playSong(nextSong.id);
    }
}

const shuffle = () => {
    userData?.songs.sort(() => Math.random() - 0.5);
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    renderSongs(userData?.songs);
    setPlayButtonAccessibleText();
}

const deleteSong = (id) => {
    if (userData?.currentSong?.id === id) {
        userData.currentSong = null;
        userData.songCurrentTime = 0;

        pauseSong();
        setPlayerDisplay();
    }

    userData.songs = userData?.songs.filter((song) => song.id !== id);
    renderSongs(userData?.songs);
    highlightCurrentSong();
    setPlayButtonAccessibleText();

    if (userData?.songs.length === 0) {
        const resetButton = document.createElement("button");
        const resetText = document.createTextNode("Reset Playlist");

        resetButton.id = "reset";
        resetButton.ariaLabel = "Reset playlist";
        resetButton.appendChild(resetText);
        playlistSongs.appendChild(resetButton);

        resetButton.addEventListener("click", () => {
            userData.songs = [...allSongs];

            renderSongs(sortSongs());
            setPlayButtonAccessibleText();
            resetButton.remove();
        })
    }
}

const setCurrentSongImg = () => {
     const playerDisplayImage = document.getElementById("player-display-image");
        
     if (userData?.currentSong === null) {
        playerDisplayImage.setAttribute("src", `${userData?.songs[0].img}`);
    } else {
        playerDisplayImage.setAttribute("src", `${userData?.currentSong.img}`);
    }
}

const setPlayerDisplay = () => {
    const playingSong = document.getElementById("player-song-title");
    const songArtist = document.getElementById("player-song-artist");

    const currentTitle = userData?.currentSong?.title;
    const currentArtist = userData?.currentSong?.artist;

    playingSong.textContent = currentTitle ? currentTitle : "";
    songArtist.textContent = currentArtist ? currentArtist : "";
}

const highlightCurrentSong = () => {
    const playlistSongsElements = document.querySelectorAll(".playlist-song");
    const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`)

    playlistSongsElements.forEach((songEl) => {
        songEl.removeAttribute("aria-current");
    });

    if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
}

const renderSongs = (array) => {
    const songsHTML = array.map((song)=> {
    return `
    <li id="song-${song.id}" class="playlist-song">
    <button class="playlist-song-info" onclick="playSong(${song.id})">
        <span class="playlist-song-title">${song.title}</span>
        <span class="playlist-song-artist">${song.artist}</span>
        <span class="playlist-song-duration">${song.duration}</span>
    </button>
    <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}"><svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
    </button>
    </li>
    `;
    }).join("");

    playlistSongs.innerHTML = songsHTML;
}

const setPlayButtonAccessibleText = () => {
    const song = userData?.currentSong || userData?.songs[0];
  
    playButton.setAttribute(
      "aria-label",
      song?.title ? `Play ${song.title}` : "Play"
    );
  };

playButton.addEventListener("click", () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id);
    } else {
        playSong(userData?.currentSong.id);
    }
});

pauseButton.addEventListener("click", pauseSong);

nextButton.addEventListener("click", playNextSong);

previousButton.addEventListener("click", playPreviousSong);

shuffleButton.addEventListener("click", shuffle);

audio.addEventListener("ended", () => {
    const currentSongIndex = getCurrentSongIndex();
    const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

    if (nextSongExists) {
        playNextSong();
    } else {
        userData.currentSong = null;
        userData.songCurrentTime = 0;
        pauseSong();
        setPlayerDisplay();
        highlightCurrentSong();
        setPlayButtonAccessibleText();
    }
})

const sortSongs = () =>  {
    userData?.songs.sort((a, b) => {
        if (a.title < b.title)  {
            return -1;
        }

        if (a.title > b.title) {
            return 1;
        }

        return 0;
    
    })

    return userData?.songs;
}


renderSongs(sortSongs());
