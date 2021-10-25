const boxes = document.querySelectorAll(".box");
const text = document.querySelector('#heading');
const strategy = document.querySelector('#strategy');
const restartBtn = document.querySelector('#restart');
let turnPlayerName;



// Select Option Functions and Gettig started functions //

let firstPLayerOption = document.querySelector("#firstplayer-option")
let secondPLayerOption = document.querySelector('#secondplayer-option')

let firstPLayerSelectOption="", secondPLayerSelectOption=""


const selectOption = (option) => {
    console.log(option)
    if(option==="X"){
        firstPLayerOption.innerHTML=option;
        firstPLayerOption.style.color='rgb(46, 46, 235)'
        firstPLayerSelectOption=option;

        secondPLayerOption.innerHTML="O"
        secondPLayerOption.style.color='rgb(9, 151, 9)'
        secondPLayerSelectOption="O";
    }
    else{
        firstPLayerOption.innerHTML=option;
        firstPLayerOption.style.color='rgb(9, 151, 9)'
        firstPLayerSelectOption=option;

        secondPLayerOption.innerHTML="X"
        secondPLayerOption.style.color='rgb(46, 46, 235)'
        secondPLayerSelectOption="X";
    }

    document.getElementById('select-option').style.display='none';
}

let firstPlayerName="", secondPlayerName="";
let currentPlayer;

const getStartGame = () => {
    if(firstPlayerName===""&&secondPlayerName===""&&secondPLayerSelectOption===""&&firstPLayerSelectOption===""){
        document.getElementById("error-info").style.display='block';
    }
    else{
        document.querySelector(".container").style.display='flex';
        document.querySelector(".getting-started").style.display='none';

        firstPlayerName = document.getElementById('first-player').value;
        secondPlayerName = document.getElementById('second-player').value;

        turnPlayerName=firstPlayerName;
        document.getElementById("board").style.display='flex'
        document.getElementById('turn').innerText=turnPlayerName;
        currentPlayer = firstPLayerSelectOption;
    }
}

const spaces = [];


const restart = () => {
    document.querySelector(".container").style.display='none';
    document.querySelector(".getting-started").style.display='flex';
    document.getElementById('select-option').style.display='flex';  
    document.getElementById('first-player').value = "";
    document.getElementById('second-player').value = ""; 
    firstPLayerOption.innerHTML="";
    secondPLayerOption.innerHTML="";

    spaces.splice(0, spaces.length)
    boxes.forEach((box, i) => {
        document.getElementById(`box${i+1}`).innerText="";
    })
    text.innerText = 'PLay';
    strategy.innerText='';
    document.querySelector(".turn").style.display='block'
}


// Let's call the function drawBoard //

const drawBoard = () => {
    boxes.forEach((box, i) => {

        let styleString = '';

        if(i < 3){
            styleString += 'border-bottom: 3px solid var(--text);';
        }
        if(i % 3 === 0){
            styleString += "border-right: 3px solid var(--text);"
        }
        if(i % 3 === 2){
            styleString += "border-left: 3px solid var(--text);"
        }
        if (i > 5){
            styleString += "border-top: 3px solid var(--text);"
        }

        box.style = styleString;
    })
}



// Define a few more variables //


// const tick_circle = "O";
// const tick_x = "X";


// boxClicked function will take the event as an argument

const boxClicked = (id) => {
    console.log("Birinchi o'yinchi tanlagan optsiya: ", currentPlayer)
    if(!spaces[id]){
        spaces[id] = currentPlayer;
        document.getElementById(`box${id+1}`).innerText=currentPlayer;
        turnPlayerName = turnPlayerName === firstPlayerName?
        secondPlayerName:firstPlayerName;
        document.getElementById('turn').innerText=turnPlayerName;
        if(playerWon()){
            text.innerText=`Player(${currentPlayer}) has won!`;
            document.getElementById("board").style.display='none'
            document.querySelector(".turn").style.display='none'
            return;
        }

        if(playDraw()){
            return;
        }

        currentPlayer = currentPlayer === firstPLayerSelectOption ? 
        secondPLayerSelectOption : firstPLayerSelectOption;
    }

}

const playerWon = () => {
    let winnerPlayer = currentPlayer === firstPLayerSelectOption?firstPlayerName:secondPlayerName
    if(spaces[4] === currentPlayer){
        
        if(spaces[1] === currentPlayer && spaces[7] === currentPlayer){
            strategy.innerText = `${winnerPlayer} wins vertically on middle`;
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[5] === currentPlayer){
            strategy.innerText = `${winnerPlayer} wins horizontally on middle`;
            return true;
        }
        if(spaces[2] === currentPlayer && spaces[6] === currentPlayer){
            strategy.innerText = `${winnerPlayer} wins diagonally`;
            return true;
        }
        
    }
    if(spaces[0] === currentPlayer){
        
        if(spaces[1] === currentPlayer && spaces[2] === currentPlayer){
            strategy.innerText = `${winnerPlayer} wins horizontally on top`;
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[6] === currentPlayer){
            strategy.innerText = `${winnerPlayer} wins vertically on left-side`;
            return true;
        }
        if(spaces[4] === currentPlayer && spaces[8] === currentPlayer){
            strategy.innerText = `${winnerPlayer} wins diagonally`;
            return true;
        }

    }
    if(spaces[8] === currentPlayer){
        
        if(spaces[5] === currentPlayer && spaces[2] === currentPlayer){
            strategy.innerText = `${winnerPlayer} wins vertically on right-side`;
            return true;
        }
        if(spaces[7] === currentPlayer && spaces[6] === currentPlayer){
            strategy.innerText = `${winnerPlayer} wins horizantally on bottom`;
            return true;
        }

    }
}

const playDraw = () => {
    let draw = 0;
    spaces.forEach((space, i) => {
        if(spaces[i] !== null) draw++;
    });
    if(draw===9){
        text.innerText='Draw'
        setTimeout(()=>{
            playAgain()
        }, 1000)
    }
}

const playAgain = () => {
    setTimeout(() => {
        currentPlayer = firstPLayerSelectOption;
        turnPlayerName = firstPlayerName;
        document.getElementById('turn').innerText = firstPlayerName;
        document.getElementById("board").style.display='flex'
        document.querySelector(".turn").style.display='block'
        spaces.splice(0, spaces.length)
        boxes.forEach((box, i) => {
            document.getElementById(`box${i+1}`).innerText="";
        })
        text.innerText = 'PLay';
        strategy.innerText='';
    }, 100)
}
drawBoard();


