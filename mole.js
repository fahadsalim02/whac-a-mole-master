let currMoleTile;
let currPlantTile;
let score = 0;
let correctAnswers = 0;
let gameOver = false;
let moleInterval = 1000; // Initial interval between mole appearances (milliseconds)
let plantInterval = 2000; // Initial interval between plant appearances (milliseconds)

window.onload = function () {
  setGame();
};

function setGame() {
  for (let i = 0; i < 9; i++) {
    //<div id="0-8"></div>
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }
  setInterval(setMole, moleInterval); // Set interval for mole appearances
  setInterval(setPlant, plantInterval); // Set interval for plant appearances
}

function getRandomTile() {
  //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {
  if (gameOver) {
    return;
  }
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }
  let mole = document.createElement("img");
  mole.src = "./monty-mole.png";

  let num = getRandomTile();
  if (currPlantTile && currPlantTile.id == num) {
    return;
  }
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

function setPlant() {
  if (gameOver) {
    return;
  }
  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }
  let plant = document.createElement("img");
  plant.src = "./piranha-plant.png";

  let num = getRandomTile();
  if (currMoleTile && currMoleTile.id == num) {
    return;
  }
  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}

function selectTile() {
  if (gameOver) {
    return;
  }
  if (this == currMoleTile) {
    score += 10;
    correctAnswers++;
    document.getElementById("score").innerText = score.toString(); //update score html
  } else if (this == currPlantTile) {
    endGame();
  }

  if (correctAnswers >= 5) {
    // Increase difficulty after 5 correct answers
    increaseDifficulty();
    correctAnswers = 0; // Reset correct answers count
  }
}

function increaseDifficulty() {
    moleInterval -= 50; // Decrease mole appearance interval by 50 milliseconds
    plantInterval -= 100; // Decrease plant appearance interval by 100 milliseconds
    clearInterval(setMole); // Clear previous interval for mole appearances
    clearInterval(setPlant); // Clear previous interval for plant appearances
    setInterval(setMole, moleInterval); // Set new interval for mole appearances
    setInterval(setPlant, plantInterval); // Set new interval for plant appearances
  }
  

function endGame() {
  gameOver = true;
  document.getElementById("restartButton").style.display = "block";
  document.getElementById("score").innerText = "GAME OVER: " + score.toString();
}

document.getElementById("restartButton").addEventListener("click", function () {
  gameOver = false;
  score = 0;
  correctAnswers = 0;
  document.getElementById("score").innerText = score.toString();
  document.getElementById("restartButton").style.display = "none";
});

function restartGame() {
  // Reset game variables
  score = 0;
  correctAnswers = 0;
  gameOver = false;
  moleInterval = 1000;
  plantInterval = 2000;
  document.getElementById("score").innerText = score.toString(); // Reset score display

  // Remove moles and plants from the board
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }
  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }

  // Restart the game by setting intervals again
  setInterval(setMole, moleInterval);
  setInterval(setPlant, plantInterval);
}
