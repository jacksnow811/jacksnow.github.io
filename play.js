let musicArray = [];
let playNow;


let SliderRange = document.querySelector('#SliderRange');
let music_name = document.querySelector("#music_name");
let music_time = document.querySelector("#music_time");
let MusicTitle = document.querySelector("#MusicTitle");


(function () {     
    MusicTitle.addEventListener('change', function () {
        InitMediaList(this.value)
    })
    document.querySelector('#SliderRange').addEventListener('change',(event)=>{
        if(playNow.AudioPlayer.duration>0)
        {
            playNow.AudioPlayer.currentTime=Math.round(playNow.AudioPlayer.duration*event.target.value/100)
        }
    })

    InitMediaList(MusicTitle.value);
    let play = document.querySelector('#Div_play').addEventListener('click', PlayHandler)    
    let pause = document.querySelector('#Div_pause').addEventListener('click', PauseHandler)
    let backward = document.querySelector('#backward').addEventListener('click', BackwardHandler)
    let foreward = document.querySelector('#foreward').addEventListener('click', ForwardHandler)
    let repeat = document.querySelector('#repeat').addEventListener('click', RepeatHandler)
    let random = document.querySelector('#random').addEventListener('click', RandomHandler)
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
    InitPlayList(musicArray);
}


function PlayHandler() {
    document.querySelector('#Div_play').style.display = 'none';
    document.querySelector('#Div_pause').style.display = '';
    ChangePlaymusic(null,musicArray[ musicArray.findIndex(e => e == playNow)])
}

function PauseHandler() {
    document.querySelector('#Div_play').style.display = '';
    document.querySelector('#Div_pause').style.display = 'none';
    playNow.AudioPlayer.pause();
}

function ChangePlaymusic(play_object_old, play_object_new) {
    if(play_object_old!==null)
    {        
        if(play_object_old.AudioPlayer!==null){
            play_object_old.playconst.then(()=>{
                play_object_old.AudioPlayer.pause();
                play_object_old.AudioPlayer.currentTime = 0; 
            })
        }
    }
    if (play_object_new == undefined)
        return;
    if(play_object_new.AudioPlayer ==null) {
        var audioPlayer = new Audio(play_object_new.fileUrl);
        audioPlayer.volume=0.5;
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
    play_object_new.playconst = play_object_new.AudioPlayer.play();
    music_name.innerHTML = play_object_new.MusicName;
    playNow = play_object_new;
    document.querySelector('#Div_play').style.display = 'none';
    document.querySelector('#Div_pause').style.display = '';
    
    Array.from(document.querySelector('#oll').children).forEach((e)=>{
        e.classList.remove("oltext");
    })    
    let index=musicArray.findIndex((e)=>e==play_object_new)
    Array.from(document.querySelector('#oll').children)[index].classList.add("oltext");
}


function ForwardHandler(e) {
    if(e.type==='ended' & document.querySelector("#repeat > g > path").classList.contains('fillAll')){
        playNow.AudioPlayer.currentTime = 0;
        playNow.AudioPlayer.play();
        return;
    }
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

function InitPlayList(musicArray) {
    const ol = document.querySelector("#oll");
    ol.innerHTML='';
    for(let i =0 ;i<musicArray.length;i++){
        const li = document.createElement('li');
        li.addEventListener('dblclick',function dbclickEventlistener(){
            let arrayList = Array.from(this.parentNode.children)
            let index = arrayList.indexOf(this);            
            ChangePlaymusic(playNow, musicArray[index]);
        })
        const text = document.createTextNode(musicArray[i].MusicName);
        li.appendChild(text);
        ol.appendChild(li);
    }
}

function RepeatHandler(){
    document.querySelectorAll("#repeat > g > path").forEach((e)=>{
        e.classList.toggle('fillAll');
    })    
}

function RandomHandler(){
    shuffleArray(musicArray);
    InitPlayList(musicArray);
    ChangePlaymusic(playNow,musicArray[0])
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}