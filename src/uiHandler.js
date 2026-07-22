import { Ship, Gameboard, Player } from "./objects.js";

export class PlayerUIHandler {
  constructor(player, containerId) {
    this.player = player;
    this.container = document.createElement("div");
    this.container.id = containerId;
    this.container.classList.add("board");
    this.gridUI = [];

    const base = document.querySelector("#play");
    if (base) {
      base.append(this.container);
    }

    this.renderBoard();
    if (this.player.name !== "computer") {
      this.renderShipsToSideBar();
    }
  }

  renderBoard() {
    this.container.innerHTML = "";
    this.gridUI = [];

    this.player.gameBoard.getBoard().forEach((column, x) => {
      let gridCol = [];
      column.forEach((cellVal, y) => {
        const cell = document.createElement("div");
        cell.classList.add("cell", "water");
        cell.textContent = cellVal;

        cell.addEventListener("click", () => {
          console.log(x, y);
        });

        this.container.append(cell);
        gridCol.push(cell);
      });
      this.gridUI.push(gridCol);
    });
  }

  updateCellGUI(coords, action) {
    let [x, y] = coords;
    const cell = this.gridUI[x][y];
    cell.textContent = action;
    if (action === "X") {
      cell.classList.remove("water");
      cell.classList.add("hit");
    } else if (action === "M") {
      cell.classList.remove("water");
      cell.classList.add("miss");
    } else if (action === "S") {
      cell.classList.remove("water");
      cell.classList.add("ship");
    }
  }

  placeUI(ship, coords, orientation) {
    let [x, y] = coords;
    const dx = orientation === "E" ? 1 : 0;
    const dy = orientation === "S" ? 1 : 0;
    for (let i = 0; i < ship.length; i++) {
      const cell = this.gridUI[x + i * dx][y + i * dy];
      cell.textContent = "S";
      this.updateCellGUI([x + i * dx, y + i * dy], "S");
      cell.addEventListener("click", () => {
        console.log(`Ship part at (${x + i * dx}, ${y + i * dy}) clicked`);
        this.SelectShip(ship);
      });
    }
  }

  placeShip(ship, coords, orientation) {
    this.player.gameBoard.place(ship, orientation, coords);
    this.placeUI(ship, coords, orientation);
  }

  renderShipsToSideBar() {
    let shipsRight = document.querySelector("#rightships");
    if (!shipsRight) {
      shipsRight = document.createElement("div");
      shipsRight.id = "rightships";
      document.body.append(shipsRight);
    }
    shipsRight.innerHTML = "";

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 2; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell", "water");
        cell.textContent = "o";
        shipsRight.append(cell);
        this.gridUI[y][10 + x] = cell;
      }
    }

    this.player.liveShips.forEach((ship) => {
      for (let i = 0; i < ship.length; i++) {
        let [col, row] = ship.coord;
        let cell = this.gridUI[row + i][col];
        cell.textContent = "S";
        cell.classList.remove("water");
        cell.classList.add("ship", "unselected");
        cell.addEventListener("click", () => {
          console.log(`Sidebar ship part at (${row + i}, ${col}) clicked`);
          this.SelectShip(ship);
        });
      }
    });
  }

  SelectShip(ship) {
    this.container.querySelectorAll(".unselected").forEach((el) => {
      el.classList.add("selected");
      el.classList.remove("unselected");
    });
    const sidebar = document.querySelector("#rightships");
    if (sidebar) {
      sidebar.querySelectorAll(".selected").forEach((el) => {
        el.classList.remove("selected");
        el.classList.add("unselected");
      });
    }

    const [col, row] = ship.coord;
    const length = ship.length;

    if (col >= 10) {
      // Sidebar ship
      for (let i = 0; i < length; i++) {
        const cell = this.gridUI[row + i][col];
        if (cell) {
          cell.classList.add("selected");
        }
      }
    } else {
      // Board ship
      const orientation = ship.orientation || "S";
      const dx = orientation === "E" ? 1 : 0;
      const dy = orientation === "S" ? 1 : 0;
      for (let i = 0; i < length; i++) {
        const cell = this.gridUI[col + i * dx][row + i * dy];
        if (cell) {
          cell.classList.add("selected");
        }
      }
    }
  }
}
