// access the main
let main = document.querySelector(".hideMain");

// In the beginnig unhide the main section (game box)
main.classList.remove("hideMain");

// access to the boxes
let boxes = document.querySelectorAll(".box");

// access to the reset button
let resetScoreBtn = document.querySelector("#rstscore-btn");

// in the beginning remove the hide property of the hide button
resetScoreBtn.classList.remove("hide-reset");

// access to the reset game button
let resetGameBtn = document.querySelector("#rstgame-btn");

// in the beginning remove the hide property of the hide button
resetGameBtn.classList.remove("hide-reset");

// access to the new game button
let newBtn = document.querySelector("#new-btn");

// access to the view game button
let viewBtn = document.querySelector("#view-btn");

// access to go back button
let backBtn = document.querySelector("#back-btn");

// access the text for player X
let textX = document.querySelector(".hide-px");

// first in the beginning remove the hide property from playerX
textX.classList.remove("hide-px");

// access the text for player O
let textO = document.querySelector(".hide-po");

// select the first playing member
let turnX =  true;

// initiate the counter in case of draw
let count = 0;

// initiate a scores
let Xscore = 0;
let Oscore = 0;

// access the scores
let scoreX = document.querySelector("#px-score");
let scoreO = document.querySelector("#po-score");

// access to the msg-container
let msgContainer = document.querySelector(".msg-container");

// access to the msg ("Winner")
let msg = document.querySelector("#msg");


// now store the winning patterns in 2D array
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];


// function to reset the game
const resetScores = () => {
    turnX = true;
    count = 0;
    // score to be restarted from 0
    Xscore = 0;
    scoreX.innerText = Xscore;
    Oscore = 0;
    scoreO.innerText = Oscore;
    enableBoxes();
    // after the game resets hide the winner message
    msgContainer.classList.add("hide");

    // afer clicking the new game unhide the main section (game box)
    main.classList.remove("hideMain");

    // hide the go back button
    backBtn.classList.add("hide-back");

    textO.classList.add("hide-po");
    textX.classList.remove("hide-px");
}

// function to reset the current game
const resetGame = () => {
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    main.classList.remove("hideMain");
    backBtn.classList.add("hide-back");
    textO.classList.add("hide-po");
    textX.classList.remove("hide-px");
}

// function to view the last played game
const viewGame = () => {
    // hide the winner message section
    msgContainer.classList.add("hide");
    // show the main section (game box)
    main.classList.remove("hideMain");
    // show the go back button
    backBtn.classList.remove("hide-back");
    // hide the reset button
    resetScoreBtn.classList.add("hide-reset");
    // hide the reset game button
    resetGameBtn.classList.add("hide-reset");

    textO.classList.add("hide-po");
    textX.classList.add("hide-px");
}

// function to start a new game after winning thel ast game
const newGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    main.classList.remove("hideMain");
    backBtn.classList.add("hide-back");
    resetScoreBtn.classList.remove("hide-reset");
    resetGameBtn.classList.remove("hide-reset");
    
    textO.classList.add("hide-po");
    textX.classList.remove("hide-px");
}

// after clicking the box something should happen so we use '.forEach' inside that we make a function to make that thing happen
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // if turnX is true then on clicking the box we print X on it (X player's chance)
        if(turnX) {
            textO.classList.remove("hide-po");
            textX.classList.add("hide-px");
            box.innerText = "X";
            turnX = false;
        }
        // if turnX is false then on clicking the box we print O on it (O player's chance)
        else {
            textX.classList.remove("hide-px");
            textO.classList.add("hide-po");
            box.innerText = "O";
            turnX = true;
        }
        // after clicking one box then we must not click on it again. so we use '.disable' to disable the further changing of values on that box
        box.disabled = true;
        count++;

        // now we have to check if there's any winner or not, for that we create a function and call here to check
        let isWinner = checkWinner();

        // if count is 9 and winner is false then it is a draw
        if(count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

// function for game draw
const gameDraw = () => {
    msg.innerText = `Game was "Draw"`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// function to disable the boxes after the winner is declared
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

//function to enable all the boxes for a new game
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        // also remove the value inside each boxes
        box.innerText = "";
    }
}

// function for showing the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is "${winner}"`;
    // after the winner is shown we remove the "hide" class which we kept to hide the msg before the winner
    msgContainer.classList.remove("hide");

    // after showing the winner hide the main section (game box)
    main.classList.add("hideMain");
    
    // after winner is declared call the disabledBoxes function
    disableBoxes();
}


// function to check the winner
const checkWinner = () => {
    for(let pattern of winPatterns) {
        // store the value at each box
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        // make sure that the box in that line is not empty
        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            // if its not empty check if the stored values are equal throughout the line
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                if(pos1Val === "X") {
                    Xscore++;
                    scoreX.innerText = Xscore;
                }
                else if(pos1Val === "O") {
                    Oscore++;
                    scoreO.innerText = Oscore;
                }
                // function of showWinner is called here
                showWinner(pos1Val);
                
                return true;
            }
        }
    }
};

// function to go back after clicking go back button
const goBack = () => {
    msgContainer.classList.remove("hide");
    main.classList.add("hideMain");
}

// when the new game button is clicked it calls the resetGame function
newBtn.addEventListener("click", newGame);

// when the reset scores button is clicked it calls the resetScores function
resetScoreBtn.addEventListener("click", resetScores);

// after winning the if we want to see the game box
viewBtn.addEventListener("click", viewGame);

// after viewing the last game now we want to go back to result by clicking go back button
backBtn.addEventListener("click", goBack);

// when the reset button is clicked it calls the resetGame function
resetGameBtn.addEventListener("click", resetGame);