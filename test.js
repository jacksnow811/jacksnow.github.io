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
const mediaData = [
	{
		fileUrl: 'sounds/clap.wav',
	},
	{
		fileUrl: 'sounds/hihat.wav',
	},
	{
		fileUrl: 'sounds/kick.wav',
	},
	{
		fileUrl: 'sounds/openhat.wav',
	},
	{
		fileUrl: 'sounds/boom.wav',
	},
]



let musicArray=[];
let playNow;

let playhead = document.getElementById("elapsed");
let timeline = document.getElementById("slider");
let timer = document.getElementById("timer");

let timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

(function(){
    for(let a = 0 ; a < mediaData.length ; a++)
    {        
        var audioPlayer = new Audio(mediaData[a].fileUrl);
        audioPlayer.addEventListener("timeupdate", timeUpdateHandler, false);
        audioPlayer.addEventListener("ended", onendedHandler);

        musicArray.push(audioPlayer);
    }
    function timeUpdateHandler(){
        var playPercent = timelineWidth * (this.currentTime / this.duration);
        playhead.style.width = playPercent + "px";
        let Min = Math.floor(this.currentTime/60)
        let sec = Math.floor(this.currentTime%60)
        if (sec <= 9) {
            timer.innerHTML = Min+":0" + sec;
        } else {
            timer.innerHTML = Min+":" + sec;
        } 
    }

    function onendedHandler(){
        playNow.currentTime = 0;
        if(musicArray.findIndex(e=>e==playNow)==musicArray.length-1)
        {
            alert('播放完畢!');
            return;
        }
        playNow=musicArray[musicArray.findIndex(e=>e==playNow)+1];
        playNow.play();
    }

    let play = document.querySelector('#play').addEventListener('click',playHandler)
    function playHandler(){    
        if(playNow==undefined)    
            playNow=musicArray[0];
       // playNow.currentTime=playNow.duration-3;
        playNow.play();
    }

    let pause = document.querySelector('#pause').addEventListener('click',pauseHandler)
    function pauseHandler(){
        playNow.pause();
    }

    let backward = document.querySelector('#backward').addEventListener('click',backwardHandler)
    function backwardHandler(){
        playNow.pause();
        playNow.currentTime = 0;
        if(musicArray.findIndex(e=>e==playNow)==0)
            return;
        playNow=musicArray[musicArray.findIndex(e=>e==playNow)-1];
        playNow.play();
    }

    let foreward = document.querySelector('#foreward').addEventListener('click',forewardHandler)
    function forewardHandler(){
        playNow.pause();
        playNow.currentTime = 0;
        if(musicArray.findIndex(e=>e==playNow)==musicArray.length-1)
            return;
        playNow=musicArray[musicArray.findIndex(e=>e==playNow)+1];
        playNow.play();
    }

    musicArray.findIndex(e=>e==playNow)
})();
