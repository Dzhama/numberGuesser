/*
GAME RULES
- Player must guess a number between min and max
- Players gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of correct answer if loose
- Let player choose to play again
*/

// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Element
const game = document.querySelector('.game'),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("#guess-input"),
      message =  document.querySelector(".message");


// Assign UI min and max 
minNum.textContent = min;
maxNum.textContent = max;

// Play Again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
})

//listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    //Validate
    if(isNaN(guess)|| guess < min || guess > max) {
        setMessage(`Please enter the number between ${min} and ${max}`);
    }
    
    // Check if won 
    if(guess === winningNum) {
        // GAME OVER YOU WON
          gameOver(true, `${winningNum} is correct number, YOU WON!`, 'green');
       
    } else {
        //Wrong NUmber
        guessesLeft -= 1;

        if(guessesLeft === 0) {
            // GAVE OVER YOU LOST
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
        }else {
           // GAME CONTINUES - wrong answer

           //change border color;
           guessInput.style.borderColor = "red";
           // Clear Input
           guessInput.value = "";
           // tell user it's a wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

// GAVE OVER 

function gameOver(won, msg) {
    let color;
    
    // check if won or not to set the color
    won === true ? color = 'green' : color = "red";
    //Disable input
    guessInput.disabled = true;
    // change border color
    guessInput.style.borderColor = color;
    //Set a message color
    message.style.color = color;
    // set a message
    setMessage(msg);
    
    // set the guesses left to 3
    guessesLeft = 3;

    //play Again
    guessBtn.value = "Play Again";
    guessBtn.className += 'play-again';

}

//Set message 
function setMessage (msg, color){
    message.style.color = color;
    message.textContent = msg;
}

//Gering rendaom Number

function getRandomNum (min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

