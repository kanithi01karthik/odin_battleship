import { Ship, Gameboard, Player } from "./objects.js";

const computer = new Player("computer");
const player = new Player("Player");

const body = document.querySelector("body");
const base = document.querySelector("#play");
const computerGameBoardUI = document.createElement("div");
const playerGameBoardUI = document.createElement("div");
const shipsRight = document.createElement("div");
shipsRight.id = "rightships";

base.append(computerGameBoardUI);
base.append(playerGameBoardUI);
body.append(shipsRight);

for (let y = 0; y < 2; y++) {
  for (let x = 0; x < 10; x++) {
    const cell = document.createElement("cell");
    cell.classList.add("cell");
    cell.textContent = "o";
    shipsRight.append(cell);
  }
}

computerGameBoardUI.id = "left";
playerGameBoardUI.id = "right";
computerGameBoardUI.classList.add("board");
playerGameBoardUI.classList.add("board");

export function renderBoard(Player, board) {
  let gridUI = [];
  Player.gameBoard.getBoard().forEach((i, y) =>
    i.forEach((j, x) => {
      const cell = document.createElement("div");
      cell.classList.add("cell", "water");
      cell.textContent = j;
      board.append(cell);
      cell.addEventListener("click", (event) => {
        const coords = [x, y];
        console.log(coords[0], coords[1]);
      });
      gridUI.push(cell);
    }),
  );
}
export function updateCellGUI(player, coords, action) {
  if (player === computer) grid = computerGameBoardUI;
  else grid = playerGameBoardUI;
  let [x, y] = coords;
  grid[x][y].textContent = action;
  if (action === "X") {
    grid[x][y].classList.remove("water");
    grid[x][y].classList.add("hit");
  } else if (action === "M") {
    grid[x][y].classList.remove("water");
    grid[x][y].classList.add("miss");
  }
}
export function placeUI(Ship, Player, coords, orientation) {
  let [x, y] = coords;
  const dx = orientation === "E" ? 1 : 0;
  const dy = orientation === "S" ? 1 : 0;
  for (let i = 0; i < Ship.length; i++) {
    const cell =
      Player === computer
        ? computerGameBoardUI.children[x + i * dx + (y + i * dy) * 10]
        : playerGameBoardUI.children[x + i * dx + (y + i * dy) * 10];
    cell.textContent = "S";
    cell.classList.remove("water");
    cell.classList.add("ship");
  }
}
export function placeShip(Ship, Player, coords, orientation) {
  Player.gameBoard.place(Ship, orientation, coords);
  placeUI(Ship, Player, coords, orientation);
}
const computerUIGrid = renderBoard(computer, computerGameBoardUI);
const playerGrid = renderBoard(player, playerGameBoardUI);
