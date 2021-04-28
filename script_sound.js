var myMusic;
myMusic = document.createElement("audio");
myMusic.src = "sounds/happy_adveture.mp3";
myMusic.play()
myMusic.loop = true;
var play = true;


function play_pause(){
    if(play){
        myMusic.pause();
        play = false;
    }else{
        myMusic.play();
        play = true;
    }
    
}