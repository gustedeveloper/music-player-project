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