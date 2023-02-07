const vijaycell = document.querySelectorAll(".cell");
const vijayStatus = document.querySelector('#statusText');
const vijayResetButton = document.querySelector('#reset');

const vijayWinCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  let vijayOptions = ["","","","","","","","","",];
  let vijayCurrentPlayer = "X";
  let vijayRunning = false;
  initializeGame();

  function initializeGame(){
     vijaycell.forEach(cell => cell.addEventListener('click',cellClicked));
     vijayResetButton.addEventListener('click',restartGame);
     vijayStatus.textContent = `${vijayCurrentPlayer}'s turn`;
     vijayRunning = true;
  }

  function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(vijayOptions[cellIndex] != "" || !vijayRunning){
        return;
    }
    updateCell(this, cellIndex);
    // chanePlayer();
    checkWinner();
  }
  function updateCell(vijaycell,index){
    vijayOptions[index] = vijayCurrentPlayer;
    vijaycell.textContent = vijayCurrentPlayer;

  }
  function chanePlayer(){
    vijayCurrentPlayer = (vijayCurrentPlayer == "X") ? "0" : "X";
    vijayStatus.textContent = `${vijayCurrentPlayer} ' s turn`;

  }
  function checkWinner(){
    let vijayWon = false;
    for(let i=0; i < vijayWinCondition.length; i++){
        const vijayCondition = vijayWinCondition[i];
        const vijaycellA = vijayOptions[vijayCondition[0]]; 
        const vijaycellB = vijayOptions[vijayCondition[1]]; 
        const vijaycellC = vijayOptions[vijayCondition[2]]; 

        if(vijaycellA == "" || vijaycellB=="" || vijaycellC == ""){
            continue;
        }

        if(vijaycellA == vijaycellB && vijaycellB == vijaycellC){
            vijayWon = true;
            break;
        }
    }
    if(vijayWon){
        alert(`${vijayCurrentPlayer} wins!`);
        vijayRunning = false;
    }
    else if(!vijayOptions.includes("")){
        vijayStatus.textContent = 'Draw!';
        vijayRunning = false;
    }
    else{
        chanePlayer();
    }

  }
  function restartGame(){
    vijayCurrentPlayer = "X";
    vijayOptions = ["","","","","","","","","",];
    vijayStatus.textContent = `${vijayCurrentPlayer} 's turn`;
    vijaycell.forEach(cell => cell.textContent = "");
    vijayRunning = true;

  }