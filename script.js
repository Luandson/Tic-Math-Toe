var monster_player1 = [];
var monster_player2 = [];
var turn = true;
var count = 0;


createMonster();
populateMonster();
generatePossibilities();
playerTurn();

function createMonster(){
    for(var i = 0; i < 8; i++){
        monster_player1[i] = getRandomMonster();
        monster_player2[i] = getRandomMonster();
    }
}

function getRandomIndex(min, max){
    var number;
    number = Math.floor(Math.random() * (max - min + 1) ) + min; // entre 0 (min) e 7 (max)
    return number;
    
}

function getRandomMonster(){
    var number;
    var max = 5;
    var min = 0;
    do {
        number = Math.floor(Math.random() * (max - min + 1) ) + min; // entre 0 (min) e 5 (max)
    }
    while(!validMonster(number));
    return number;
    
}

function validMonster(number){
    switch(number){
        case 0:
            return true;
        case 1:
            return true;
        case 2:
            return true;
        case 5:
            return true;
        default:
            return false;
    }
}

function populateMonster(){
    var monsterSlot1;
    var monsterSlot2;
    for(var i = 0; i < 8; i++){
        monsterSlot1 = document.getElementById("player1_monsters_slot"+i+"");
        monsterSlot1.style.backgroundImage = "url(images/"+monster_player1[i]+".png)";
        monsterSlot1.setAttribute("data-value",monster_player1[i]);
        monsterSlot1.setAttribute("draggable",true);
        

        monsterSlot2 = document.getElementById("player2_monsters_slot"+i+"");
        monsterSlot2.style.backgroundImage = "url(images/"+monster_player2[i]+".png)";
        monsterSlot2.setAttribute("data-value",monster_player2[i]);
        monsterSlot2.setAttribute("draggable",true);
        
    }
}



function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var dropData = document.getElementById(data);
    if(dropData){
        dropData.removeAttribute("class");
        dropData.removeAttribute("draggable");
        dropData.removeAttribute("ondragstart");
        dropData.style.height = "100%";
        dropData.style.width = "100%";
        ev.target.appendChild(dropData);
        ev.target.removeAttribute("ondrop");
        ev.target.removeAttribute("ondragover");
        ev.target.setAttribute("data-value",dropData.getAttribute("data-value"));
        if(hasWinner(ev.target)){
            if(turn){
                alert("Jogador 1 VENCEU!!!");
            }else{
                alert("Jogador 2 VENCEU!!!");
            }
            
            console.log("TEVE VENCEDOR");
        }else{
            turn = !turn;
            playerTurn();
        }
        if(draw()){
            alert("EMPATOU");
            console.log("EMPATOU");
        }
    }
    
  }


function generatePossibilities(){
    var base = [...monster_player1, ...monster_player2];
    var unique = base.filter(onlyUnique);
    var max = unique.length - 1;
    var min = Math.min(...unique);
    var resultArea;
    var results = [];
    
    for(var i = 0; i < 8; i++){
        results[i] = unique[getRandomIndex(min, max)] + unique[getRandomIndex(min, max)] + unique[getRandomIndex(min, max)]
        resultArea = document.getElementById("r"+i);
        resultArea.setAttribute("data-value",results[i]);
        var r_img = document.createElement("img");
        r_img.src = "images/numbers/"+results[i]+".png";
        r_img.style.height = "3vh";
        r_img.setAttribute("draggable",false);
        resultArea.appendChild(r_img);
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function playerTurn(){
    var player;
    var playerOfTurn;
    var setTurn;
    if(turn){
        // COLOCAR AQUI A VEZ DO JOGADOR 1
        player = document.getElementById("player2_monsters_slot").children;
        playerOfTurn = document.getElementById("player1_monsters_slot").children;
        for(var i = 0; i < player.length; i++){
            player[i].setAttribute("draggable",false);
            player[i].removeAttribute("ondragstart");
        }
        for(var i = 0; i < playerOfTurn.length; i++){
            playerOfTurn[i].setAttribute("draggable",true);
            playerOfTurn[i].setAttribute("ondragstart","drag(event)");
        }
        setTurn = document.getElementById("turn");
        setTurn.style.backgroundImage = "url(images/TurnP1.png)";
    }else{
        // COLOCAR AQUI A VEZ DO JOGADOR 2
        player = document.getElementById("player1_monsters_slot").children;
        playerOfTurn = document.getElementById("player2_monsters_slot").children;
        for(var i = 0; i < player.length; i++){
            player[i].setAttribute("draggable",false);
            player[i].removeAttribute("ondragstart");
        }
        for(var i = 0; i < playerOfTurn.length; i++){
            playerOfTurn[i].setAttribute("draggable",true);
            playerOfTurn[i].setAttribute("ondragstart","drag(event)");
        }
        setTurn = document.getElementById("turn");
        setTurn.style.backgroundImage = "url(images/TurnP2.png)";
    }
}

function hasWinner(target){
    var sum = 0;
    var n1;
    var n2;
    var n3;
    
    switch(target.getAttribute("id")){
        case "n0":
            if(document.getElementById("n4").hasChildNodes() && document.getElementById("n8").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n0").children;
                n2 = document.getElementById("n4").children;
                n3 = document.getElementById("n8").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r0").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n3").hasChildNodes() && document.getElementById("n6").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n0").children;
                n2 = document.getElementById("n3").children;
                n3 = document.getElementById("n6").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r5").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n1").hasChildNodes() && document.getElementById("n2").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n0").children;
                n2 = document.getElementById("n1").children;
                n3 = document.getElementById("n2").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r2").getAttribute("data-value")){
                    return true;
                }
            }
            return false;
        case "n1":
            if(document.getElementById("n0").hasChildNodes() && document.getElementById("n2").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n0").children;
                n2 = document.getElementById("n1").children;
                n3 = document.getElementById("n2").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r2").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n4").hasChildNodes() && document.getElementById("n7").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n4").children;
                n2 = document.getElementById("n1").children;
                n3 = document.getElementById("n7").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r6").getAttribute("data-value")){
                    return true;
                }
            }
            return false;
        case "n2":
            if(document.getElementById("n0").hasChildNodes() && document.getElementById("n1").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n0").children;
                n2 = document.getElementById("n1").children;
                n3 = document.getElementById("n2").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r2").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n4").hasChildNodes() && document.getElementById("n6").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n4").children;
                n2 = document.getElementById("n6").children;
                n3 = document.getElementById("n2").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r1").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n5").hasChildNodes() && document.getElementById("n8").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n5").children;
                n2 = document.getElementById("n8").children;
                n3 = document.getElementById("n2").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r7").getAttribute("data-value")){
                    return true;
                }
            }
            return false;
        case "n3":
            if(document.getElementById("n0").hasChildNodes() && document.getElementById("n6").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n0").children;
                n2 = document.getElementById("n3").children;
                n3 = document.getElementById("n6").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r5").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n4").hasChildNodes() && document.getElementById("n5").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n3").children;
                n2 = document.getElementById("n4").children;
                n3 = document.getElementById("n5").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r3").getAttribute("data-value")){
                    return true;
                }
            }
            return false;
        case "n4":
            if(document.getElementById("n1").hasChildNodes() && document.getElementById("n7").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n1").children;
                n2 = document.getElementById("n4").children;
                n3 = document.getElementById("n7").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r6").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n0").hasChildNodes() && document.getElementById("n8").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n0").children;
                n2 = document.getElementById("n4").children;
                n3 = document.getElementById("n8").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r0").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n2").hasChildNodes() && document.getElementById("n6").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n2").children;
                n2 = document.getElementById("n4").children;
                n3 = document.getElementById("n6").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r1").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n3").hasChildNodes() && document.getElementById("n5").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n3").children;
                n2 = document.getElementById("n4").children;
                n3 = document.getElementById("n5").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r3").getAttribute("data-value")){
                    return true;
                }
            }
            return false;
        case "n5":
            if(document.getElementById("n2").hasChildNodes() && document.getElementById("n8").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n2").children;
                n2 = document.getElementById("n5").children;
                n3 = document.getElementById("n8").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r7").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n3").hasChildNodes() && document.getElementById("n4").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n3").children;
                n2 = document.getElementById("n4").children;
                n3 = document.getElementById("n5").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r3").getAttribute("data-value")){
                    return true;
                }
            }
            return false;
        case "n6":
            if(document.getElementById("n2").hasChildNodes() && document.getElementById("n4").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n2").children;
                n2 = document.getElementById("n4").children;
                n3 = document.getElementById("n6").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r1").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n0").hasChildNodes() && document.getElementById("n3").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n0").children;
                n2 = document.getElementById("n3").children;
                n3 = document.getElementById("n6").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r5").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n7").hasChildNodes() && document.getElementById("n8").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n6").children;
                n2 = document.getElementById("n7").children;
                n3 = document.getElementById("n8").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r4").getAttribute("data-value")){
                    return true;
                }
            }
            return false;
        case "n7":
            if(document.getElementById("n1").hasChildNodes() && document.getElementById("n4").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n1").children;
                n2 = document.getElementById("n4").children;
                n3 = document.getElementById("n7").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r6").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n6").hasChildNodes() && document.getElementById("n8").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n6").children;
                n2 = document.getElementById("n7").children;
                n3 = document.getElementById("n8").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r4").getAttribute("data-value")){
                    return true;
                }
            }
            return false;
        case "n8":
            if(document.getElementById("n0").hasChildNodes() && document.getElementById("n4").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n0").children;
                n2 = document.getElementById("n4").children;
                n3 = document.getElementById("n8").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r0").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n2").hasChildNodes() && document.getElementById("n5").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n2").children;
                n2 = document.getElementById("n5").children;
                n3 = document.getElementById("n8").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r7").getAttribute("data-value")){
                    return true;
                }
            }
            if(document.getElementById("n6").hasChildNodes() && document.getElementById("n7").hasChildNodes()){
                sum = 0;
                n1 = document.getElementById("n6").children;
                n2 = document.getElementById("n7").children;
                n3 = document.getElementById("n8").children;
                sum = Number(n1[0].getAttribute("data-value")) + Number(n2[0].getAttribute("data-value")) + Number(n3[0].getAttribute("data-value"));
                if(sum == document.getElementById("r4").getAttribute("data-value")){
                    return true;
                }
            }
            return false;
        
        default:
            return false;
    }
}

function draw(){
    count++;
    if(count >= 9){
        return true;
    }
    return false;
}
