var myMusic;
myMusic = document.createElement("audio");
myMusic.src = "sounds/happy_adveture.mp3";

myMusic.play()
var play;


function play_pause(){
    if(play){
        myMusic.pause();
        play = false;
    }else{
        myMusic.play();
        play = true;
    }
    
}