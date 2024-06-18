let boxes = document.querySelectorAll(".box");
let resbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg");
let message = document.querySelector("#msgg");

let turno = true;
let count = 0; //playerX, playerO

let wins = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno === true) {
            box.innerText = "O";
            turno = false;
        } else {
            box.innerText = "X";
            turno = true;
        }
        box.disabled = true;
        count++;

        if (!checkWinner() && count === 9) {
            showDraw();
        }
    })
});

function showWinner(winner) {
    message.innerText = `Congrats, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

function showDraw() {
    message.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

function disableBoxes() {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

function enableBoxes() {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
}

function checkWinner() {
    for (let pattern of wins) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
}

function resetGame() {
    turno = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    message.innerText = "";
}

newGameBtn.addEventListener("click", resetGame);
resbtn.addEventListener("click", resetGame);
