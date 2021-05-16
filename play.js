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
let MusicList = document.querySelector("#MusicList");
//let timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
/*
class playNow_object {
    constructor(AudioPlayer, MusicName) {
        this.AudioPlayer = AudioPlayer;
        this.MusicName = MusicName;
    }
}
*/

(function () {     
    MusicList.addEventListener('change', function () {
        InitMediaList(this.value)
    })
    document.querySelector('#SliderRange').addEventListener('change',(event)=>{
        if(playNow.AudioPlayer.duration>0)
        {
            playNow.AudioPlayer.currentTime=Math.round(playNow.AudioPlayer.duration*event.target.value/100)
        }
    })

    InitMediaList(MusicList.value);

    let play = document.querySelector('#Div_play').addEventListener('click', PlayHandler)    
    let pause = document.querySelector('#Div_pause').addEventListener('click', PauseHandler)
    let backward = document.querySelector('#backward').addEventListener('click', BackwardHandler)
    let foreward = document.querySelector('#foreward').addEventListener('click', ForwardHandler)

})();
function InitMediaList(InListName){
    if (playNow !== undefined) {
        if(playNow.AudioPlayer!==null)
        {
            PauseHandler();
            playNow.AudioPlayer.currentTime=0;
        }
    }
    musicArray=PlayTotalAry[PlayTotalAry.findIndex(e=>e.ListName==InListName)].play_objectAry;
    playNow = musicArray[0];
    music_name.innerHTML = playNow.MusicName;
}

/*
function InitMediaList(MediaArray) {
    if (playNow !== undefined) {
        PauseHandler();
        playNow.AudioPlayer.currentTime=0;
    }
    musicArray.length=0;
    for (let a = 0; a < MediaArray.length; a++) {
        var audioPlayer = new Audio(MediaArray[a].fileUrl);
        audioPlayer.addEventListener("timeupdate", function () {
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
*/

function PlayHandler() {
    //if (playNow == undefined)
    //    playNow = musicArray[0];
    document.querySelector('#Div_play').style.display = 'none';
    document.querySelector('#Div_pause').style.display = '';
    ChangePlaymusic(null,musicArray[ musicArray.findIndex(e => e == playNow)])
}

function PauseHandler() {
    document.querySelector('#Div_play').style.display = '';
    document.querySelector('#Div_pause').style.display = 'none';
    playNow.AudioPlayer.pause();
}
/*InitMediaList
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
*/
function ChangePlaymusic(play_object_old, play_object_new) {
    if(play_object_old!==null)
    {
        if(play_object_old.AudioPlayer!==null){
            play_object_old.AudioPlayer.pause();
            play_object_old.AudioPlayer.currentTime = 0; 
        }
    }
    if (play_object_new == undefined)
        return;
    if(play_object_new.AudioPlayer ==null) {
        var audioPlayer = new Audio(play_object_new.fileUrl);
        audioPlayer.addEventListener("timeupdate", function () {
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
        play_object_new.AudioPlayer=audioPlayer;
    }
    play_object_new.AudioPlayer.play();
    music_name.innerHTML = play_object_new.MusicName;
    playNow = play_object_new;
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
