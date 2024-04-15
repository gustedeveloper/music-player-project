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
    img: "images/img0.png"
},
{
    id: 1,
    title: "Get Wiser",
    artist: "DJ Zinc, Mozey, M.A.R.Y",
    duration: "2:36",
    src: "songs/song1.mp3",
    img: "images/img1.png"
},
{
    id: 2,
    title: "Faded - Odesza Remix",
    artist: "ZH, ODESZA",
    duration: "3:58",
    src: "songs/song2.mp3",
    img: "images/img2.png"
},
{
    id: 3,
    title: "Green Light",
    artist: "goddard., Megan Linnell",
    duration: "3:33",
    src: "songs/song3.mp3",
    img: "images/img3.png"
},
{
    id: 4,
    title: "Wasted Youth",
    artist: "goddard., Cat Burns",
    duration: "2:27",
    src: "songs/song4.mp3",
    img: "images/img4.png"
},
{
    id: 5,
    title: "Chase The Sun",
    artist: "Koven",
    duration: "3:09",
    src: "songs/song5.mp3",
    img: "images/img5.png"
},
{
    id: 6,
    title: "Foget It",
    artist: "Matroda",
    duration: "2:53",
    src: "songs/song6.mp3",
    img: "images/img6.png"
},
{
    id: 7,
    title: "CALMNESS",
    artist: "MVTRIIIX, Kingpin Skinny Pimp",
    duration: "2:28",
    src: "songs/song7.mp3",
    img: "images/img7.png"
},
{
    id: 8,
    title: "Lifetime",
    artist: "Tobiahs",
    duration: "2:38",
    src: "songs/song8.mp3",
    img: "images/img8.png"
},
{
    id: 9,
    title: "Rave Out",
    artist: "Turno, Skepsis, Charlotte Plank",
    duration: "2:28",
    src: "songs/song9.mp3",
    img: "images/img9.png"
}];

const audio = new Audio();

let userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0
};

const renderSongs = (array) => {
    const songsHTML = array.map((song)=> {
    return `
    <li id="song-${song.id}" class="playlist-song">
    <button class="playlist-song-info">
        <span class="playlist-song-title">${song.title}</span>
        <span class="playlist-song-artist">${song.artist}</span>
        <span class="playlist-song-duration">${song.duration}</span>
    </button>
    <button class="playlist-song-delete" aria-label="Delete ${song.title}"><svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
    </button>
    </li>
    `;
    }).join("");

    playlistSongs.innerHTML = songsHTML;
}

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