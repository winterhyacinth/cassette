///i'm losing it i'm going cray cray
// 
let player;
let timeUpdater;
let seeking = false;

const default_playlist = "PLqSGRtSP56Po1RuM8aN5SdfM-dJiEPR9n";
const params = new URLSearchParams(window.location.search);
const list = params.get("list") || default_playlist; 


const nodes = {
    playBtn: document.getElementById("music-toggle"),
    prevBtn: document.getElementById("music-prev"),
    nextBtn: document.getElementById("music-next"),
    thumbnail: document.getElementById("music-logo"),
    labelName: document.getElementById("label-song-title"),
    titleName: document.getElementById("song-name"),
    uploader: document.getElementById("song-uploader"),
    playbackBar: document.getElementById("playback-bar"),
    playbackFill: document.getElementById("playback-fill"),
    volIcon: document.getElementById("volume-icon"),
    volWrap: document.getElementById("volume-area"),
    volBar: document.getElementById("volume-bar"),
    volFill: document.getElementById("volume-fill"),
    timeDisplay: document.getElementById("playtime"),
    playlistInput: document.getElementById("playlist-input")
};

const icons = {
    play: "/assets/music_play.png",
    pause: "/assets/music_pause.png",
    volume:{
        normal: "/assets/music_volume_100.png",
        low: "/assets/music_volume_50.png",
        lowest: "/assets/music_volume_20.png",
        mute: "/assets/music_volume_mute.png"
    }
}

let defaultIcon =icons.volume.normal;
nodes.volIcon.addEventListener("click", (e) => {
    if(player.isMuted()){
        nodes.volIcon.src = defaultIcon;
        player.unMute();
    } else {
        nodes.volIcon.src = icons.volume.mute;
        player.mute();
    }
});

nodes.playBtn.addEventListener('click', function(){
      togglePlay();
  });
  nodes.prevBtn.addEventListener('click', function(){
      player.previousVideo();
  });
  nodes.nextBtn.addEventListener('click', function(){
      player.nextVideo();
  });

function togglePlay(){
    if(player.getPlayerState() === YT.PlayerState.PLAYING){
        player.pauseVideo();
        nodes.playBtn.src = icons.play;
    }
    else{
        player.playVideo();
        nodes.playBtn.src = icons.pause;
    }
}
//vol bar...
nodes.volBar.addEventListener("mousedown", (e) => {
    updateVolume(e.clientX);
    const move = (e) => updateVolume(e.clientX);
    const stop = () => {
        document.documentElement.removeEventListener("mousemove", move,);
        document.documentElement.removeEventListener("mouseup", stop);
    };
    document.documentElement.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseup", stop);
});

function updateVolume(x){
    const rectang = nodes.volBar.getBoundingClientRect();
    let vol = ((x-rectang.left) / rectang.width) * 100;
    vol = Math.max(0, Math.min(vol,100));
    nodes.volFill.style.width = vol + "%";
    if(player){
        player.unMute();
        player.setVolume(vol);
    }

    if (vol >= 50) {
    nodes.volIcon.src = icons.volume.normal;
  } else if (vol >= 20) {
    nodes.volIcon.src = icons.volume.low;
  } else if (vol > 0) {
    nodes.volIcon.src = icons.volume.lowest;
  } else {
    nodes.volIcon.src = icons.volume.mute;
  }
}

nodes.playbackBar.addEventListener("mousedown", (e) => {
    updatePlayback(e.clientX);
    const move = (e) => updatePlayback(e.clientX);
    const stop = () => {
        document.documentElement.removeEventListener("mousemove", move,);
        document.documentElement.removeEventListener("mouseup", stop);
    };
    document.documentElement.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseup", stop);
});

function updatePlayback(x){
    const rectang = nodes.playbackBar.getBoundingClientRect();
    let percent = (x - rectang.left) / rectang.width;
    percent = Math.max(0, Math.min(percent,1));
    
    nodes.playbackFill.style.width = (percent * 100) + "%";
    if(player){
        const duration = player.getDuration();
        player.seekTo(duration * percent, true);
    }
}

function timeChange(seconds){
    const hour =  Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    const second = Math.floor(seconds % 60);
    const pad = (n) => String(n).padStart(2,'0');

    return hour > 0
        ? `${hour}:${pad(minute)}:${pad(second)}`
        : `${minute}:${pad(second)}`;
}

function updateTime() {
  if(player && !seeking) {
    nodes.playbackFill.style.width = (player.getCurrentTime() / player.getDuration() * 100) + "%";
    nodes.timeDisplay.innerText = timeChange(Math.floor(player.getCurrentTime())) + " / " + timeChange(Math.floor(player.getDuration()));
  }
  console.log("updateTime running");

}

function createPlaylist(){
    let url = document.getElementById("playlist-input").value;
    let urlPart = url.split("?");
    if(urlPart.length != 2)return;

    let trueUrl = "?" + urlPart[1];
    const params = new URLSearchParams(trueUrl);

    let newURL = new URL(document.location);
    newURL.searchParams.set('list', params.get('list'));
    newURL.searchParams.set('index',params.has('index')? params.get('index'):0);    
    window.location.href = newURL.href;
}

function onYouTubeIframeAPIReady(){
    player = new YT.Player('player', {
        height: '200',
        width: '200',
        playerVars: {
            playsinline: 1,
            disablekb: 1,
            list: list,
            autoplay: params.has("autoplay") ? params.get("autoplay") :0, 
            controls: 0,
            loop:1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

function onPlayerReady(event) {
  event.target.mute();           
  event.target.setVolume(10);
  event.target.setLoop(true);
  event.target.playVideo();
  nodes.playBtn.src = icons.pause;
  
  setTimeout(() => {
  player.unMute();
}, 1000);

timeUpdater = setInterval(updateTime, 250);

}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        timeUpdater = setInterval(updateTime, 250);
        setTimeout(updateVideoInfo, 500); 
        } else {
    clearInterval(timeUpdater);
    }
}

function updateVideoInfo(){
    const videoData = player.getVideoData();
    const videoId = videoData.video_id || player.getVideoUrl().split("v=")[1]?.split("&")[0];
    nodes.titleName.textContent = videoData.title || "Unknown";
    nodes.labelName.textContent = videoData.title || "Unknown";
    nodes.uploader.textContent = videoData.author || "Unknown";
    nodes.thumbnail.src = `https://img.youtube.com/vi/${videoId}/default.jpg`;
    nodes.thumbnail.parentNode.href = player.getVideoUrl();    
}