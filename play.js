/*
const mediaData = [
    {
        fileUrl: 'https://s3-ap-northeast-1.amazonaws.com/dazedbear-assets/custom-audio-player/Swing_Theory.mp3',
    },
    {
        fileUrl: 'https://s3-ap-northeast-1.amazonaws.com/dazedbear-assets/custom-audio-player/It_s_All_Happening.mp3',
    },
    {
        fileUrl: 'https://s3-ap-northeast-1.amazonaws.com/dazedbear-assets/custom-audio-player/So_Smooth.mp3',
    },
    {
        fileUrl: 'https://s3-ap-northeast-1.amazonaws.com/dazedbear-assets/custom-audio-player/Sinking_Ship.mp3',
    },
    {
        fileUrl: 'https://s3-ap-northeast-1.amazonaws.com/dazedbear-assets/custom-audio-player/Trap_Unboxing.mp3',
    },
]
*/

let musicArray = [];
let playNow;

//let playhead = document.querySelector("#elapsed");
//let timeline = document.querySelector("#slider");
let SliderRange = document.querySelector('#SliderRange');
let music_name = document.querySelector("#music_name");
let music_time = document.querySelector("#music_time");

//let timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

class playNow_object {
    constructor(AudioPlayer, MusicName) {
        this.AudioPlayer = AudioPlayer;
        this.MusicName = MusicName;
    }
}

(function () {
    document.querySelector('#MusicList').addEventListener('change', function () {
        if (this.value === 'Japanese')
            InitMediaList(mediaJapanese);
        else if (this.value === 'English')
            InitMediaList(mediaEnglish);
    })
    document.querySelector('#SliderRange').addEventListener('change',(event)=>{
        playNow.AudioPlayer.currentTime=Math.round(playNow.AudioPlayer.duration*event.target.value/100)
    })

    InitMediaList(mediaJapanese);

    let play = document.querySelector('#Div_play').addEventListener('click', PlayHandler)    
    let pause = document.querySelector('#Div_pause').addEventListener('click', PauseHandler)
    let backward = document.querySelector('#backward').addEventListener('click', BackwardHandler)
    let foreward = document.querySelector('#foreward').addEventListener('click', ForwardHandler)

})();

function InitMediaList(MediaArray) {
    if (playNow !== undefined) {
        PauseHandler();
        playNow.AudioPlayer.currentTime=0;
    }
    musicArray.length=0;
    for (let a = 0; a < MediaArray.length; a++) {
        var audioPlayer = new Audio(MediaArray[a].fileUrl);
        audioPlayer.addEventListener("timeupdate", function () {
            //var playPercent = timelineWidth * (this.currentTime / this.duration);
            //playhead.style.width = playPercent + "px";
            let Min = Math.floor(this.currentTime / 60)
            let sec = Math.floor(this.currentTime % 60)
            if (sec <= 9) {
                music_time.innerHTML = Min + ":0" + sec;
            } else {
                music_time.innerHTML = Min + ":" + sec;
            }
            SliderRange.value=this.currentTime / this.duration * 100 ;         

        }, false);
        audioPlayer.addEventListener("ended", ForwardHandler);
        let array = MediaArray[a].fileUrl.split('/');
        let object = new playNow_object(audioPlayer, array[array.length - 1]);
        musicArray.push(object);
    }
    playNow = musicArray[0];
    music_name.innerHTML = playNow.MusicName;
}

function PlayHandler() {
    //if (playNow == undefined)
    //    playNow = musicArray[0];
    document.querySelector('#Div_play').style.display = 'none';
    document.querySelector('#Div_pause').style.display = '';
    playNow.AudioPlayer.play();
    music_name.innerHTML = playNow.MusicName;
}

function PauseHandler() {
    document.querySelector('#Div_play').style.display = '';
    document.querySelector('#Div_pause').style.display = 'none';
    playNow.AudioPlayer.pause();
}

function ChangePlaymusic(playNow_object_old, playNow_object_new) {
    playNow_object_old.AudioPlayer.pause();
    playNow_object_old.AudioPlayer.currentTime = 0;
    if (playNow_object_new == undefined)
        return;
    playNow_object_new.AudioPlayer.play();
    music_name.innerHTML = playNow_object_new.MusicName;
    playNow = playNow_object_new;
    document.querySelector('#Div_play').style.display = 'none';
    document.querySelector('#Div_pause').style.display = '';
}

function ForwardHandler() {
    let index = musicArray.findIndex(e => e == playNow);
    if (index == musicArray.length - 1) {
        playNow.AudioPlayer.currentTime = 0;
        alert('播放完畢!')
    } else {
        ChangePlaymusic(playNow, musicArray[index + 1]);
    }
}

function BackwardHandler() {
    let index = musicArray.findIndex(e => e == playNow);
    if (index == 0) {
        playNow.AudioPlayer.currentTime = 0;
    } else {
        ChangePlaymusic(playNow, musicArray[index - 1]);
    }
}
