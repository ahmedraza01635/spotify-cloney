



// // console.log("Let's write javascript");

// // async function main() {
// //     let a = await fetch("http://127.0.0.1:5500/songs/");
// //     let response = await a.text();

// //     let div = document.createElement("div");
// //     div.innerHTML = response;

// //     let links = div.getElementsByTagName("a");

// //     let songs = [];

// //     for (let i = 0; i < links.length; i++) {
// //         let songName = links[i].innerText;

// //         if (songName.endsWith(".mp3")) {
// //             songs.push({
// //                 No: songs.length + 1,
// //                 Song: songName
// //             });
// //         }
// //     }

// //     console.table(songs);
// // }

// // main();
// console.log("Let's write javascript");

// async function main() {
//     let a = await fetch("http://127.0.0.1:5500/songs/");
//     let response = await a.text();

//     let div = document.createElement("div");
//     div.innerHTML = response;

//     let links = div.querySelectorAll("#files a"); // IMPORTANT

//     console.log("Total links found:", links.length);

//     let songs = [];

//     links.forEach((link, index) => {
// //         let name = link.textContent.trim();
// //         console.log("Found:", name); // debugging

// //         if (name.toLowerCase().includes(".mp3")) {
// //             songs.push({
// //                 No: songs.length + 1,
// //                 Song: name
// //             });
// //         }
// //     });

// //     console.table(songs);
// // }

// // main();

// console.log("Let's write javascript");

// async function getSongs() {
//     let res = await fetch("/songs/"); // relative path better hai
//     let text = await res.text();

//     let div = document.createElement("div");
//     div.innerHTML = text;

//     let anchors = div.querySelectorAll("#files a");

//     let songs = [];
//     console.log("Anchors found:", anchors.length);


//     anchors.forEach(a => {
//         let fileName = a.textContent.trim();

//         if (fileName.toLowerCase().endsWith(".mp3")) {
//             songs.push(fileName);
//         }
//     });

//     return songs;
// }

// async function main() {
//     let songs = await getSongs();
//     console.table(songs);
// }

// main();

let currentsong = new Audio();
let songs = [];
let currfolder = "";

function secondsToMinutesSecond(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currfolder = folder;
    let res = await fetch(`/${folder}/`);
    let text = await res.text();

    let div = document.createElement("div");
    div.innerHTML = text;

    let anchors = div.querySelectorAll(" a");

    songs = [];

    anchors.forEach(a => {
        let href = a.getAttribute("href");

        if (href && href.toLowerCase().endsWith(".mp3")) {
            songs.push(href.split(`/${currfolder}/`)[1]);
        }
    });
    return songs;

    
}


const playmusic = (track, pause=false) => {
    currentsong.src = `/${currfolder}/` + track
    if (!pause) {
        currentsong.play()
        
        play.src = "images/pause.svg";
    }

    
    document.querySelector(".soo").innerHTML =decodeURI(track) 
}

document.querySelector(".sooo").innerHTML = "00:00 / 00:00"


async function displayAlbums(){
    let res = await fetch(`/songs/`);
    let text = await res.text();
    let cardcontainer = document.querySelector(".cardcontainer")

    let div = document.createElement("div");
    div.innerHTML = text;
    let anchors = div.getElementsByTagName("a")
    let array =Array.from(anchors)
        for (let index = 0; index < array.length; index++) {
            const e = array[index];
            
        
        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/").slice(-3)[2];
            //get mete data
            let res = await fetch(`/songs/${folder}/info.json`);
            let text = await res.json();
            console.log(text);
            cardcontainer.innerHTML = cardcontainer.innerHTML + `<div data-folder="${folder}" class="card">
            <div  class="play">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="45" height="45">

                    <!-- Green Background Circle -->
                    <circle cx="12" cy="12" r="10" fill="#3ee477" />

                    <!-- Black Play Triangle -->
                    <path
                        d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                        fill="#000000" />

                </svg>
            </div>
            <img src="/songs/${folder}/cover.jpg" alt="">
            <h2>${text.title}</h2>
            <p>${text.description}</p>
        </div>`
    }
        }
       
    console.log(anchors);
    console.log(div);


        }
    
    
// } 



async function main() {

    await getSongs('songs/ncs');
    console.log(songs);
    playmusic(songs[0], true)

    //dispaly all the albums on the page
  

    
    function renderSongs() {
        let songUL = document.querySelector(".songlist ul");
        songUL.innerHTML = "";
    
        for (const song of songs) {
            songUL.innerHTML += `<li>
                <img class="invert" src="images/music.svg" alt="">
                <div class="info">
                    <div>${song.replaceAll("%20", " ")}</div>
                    <div>harry</div>
                </div>
                <div class="jjj"> 
                    <span>Play Now</span>
                    <img class="invert" src="images/play.svg" alt="">
                </div>
            </li>`;
        }
    
        Array.from(songUL.getElementsByTagName("li")).forEach(li => {
            li.addEventListener("click", () => {
                playmusic(li.querySelector(".info").firstElementChild.innerHTML.trim());
            });
        });
    }
   
    

    renderSongs();

    displayAlbums();
 
    //attach an event listner to each song

    // Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    //     e.addEventListener("click", element => {

    //         console.log(e.querySelector(".info").firstElementChild.innerHTML);
    //         playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    //     })

    // })


    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "images/pause.svg"

        } else {
            currentsong.pause()
            play.src = "images/play.svg"
        }
    })


    currentsong.addEventListener("timeupdate", () => {
        console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".sooo").innerHTML = `${secondsToMinutesSecond(currentsong.currentTime)}/${secondsToMinutesSecond(currentsong.duration)}`;
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    })


 //add eventlistner to seekbar

 document.querySelector(".seekbar").addEventListener("click", e => {
    let seekbar = e.currentTarget;
    let width = seekbar.getBoundingClientRect().width;
    let percent = (e.offsetX / width) * 100;

    document.querySelector(".circle").style.left = percent + "%";

    currentsong.currentTime = (percent / 100) * currentsong.duration;
});


// add eventlistner for hamburger

    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = 0
    })
    //add eventlistner for close button
    document.querySelector(".close").addEventListener("click", ()=>{
        document.querySelector(".left").style.left =  "-100%"
    })

    //add eventlistner to previous  and next
    
    previous.addEventListener("click", ()=>{
        console.log("previous clicked");
        console.log(currentsong)
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index-1)>= 0) {
            playmusic(songs[index-1])
            
        }
    })

    next.addEventListener("click", ()=>{
        currentsong.pause()
        
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        
        
        if((index+1)< songs.length ){

            playmusic(songs[index+1])
            
        }
    })
    // add event to volume

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
        console.log(e, e.target.value)
        currentsong.volume = parseInt(e.target.value)/100
    })
    // load the playlist card is clicked
    document.querySelector(".cardcontainer").addEventListener("click", async function(e){

        let card = e.target.closest(".card");
        if (!card) return;
    
        let folder = card.dataset.folder;
        if (!folder) return;
    
        await getSongs(`songs/${folder}`);
        renderSongs();
        playmusic(songs[0]);

    
    });
    // add eventlistner to mute the track

    document.querySelector(".volume>img").addEventListener("click", e=>{
        
        if (e.target.src.includes("images/volume.svg")) {
            e.target.src = e.target.src.replace("images/volume.svg", "images/mute.svg")
            currentsong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;

        }else{
            e.target.src = e.target.src.replace("images/mute.svg", "images/volume.svg") 
            currentsong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
            
            
        }
    })

    


}

main(); 
