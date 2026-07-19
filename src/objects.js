export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }
  isSunk = () => (this.hits === this.length ? (this.sunk = true) : null);
  hit = () => {
    if (this.hits < this.length) {
      this.hits++;
      this.isSunk();
    } else {
      throw new Error("Can't hit a sunken ship");
    }
  };
}

export class Gameboard {
  #board;
  constructor() {
    this.shipLocation = null;
    this.gameOver = false;
    this.#board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => "W"),
    );
  }
  place(ship, orientation, [x, y]) {
    const dx = orientation === "E" ? 1 : 0;
    const dy = orientation === "S" ? 1 : 0;
    for (let i = 0; i < ship.length; i++) {
      if (this.#board[x + i * dx]?.[y + i * dy] !== "W") {
        throw new Error("Out of bounds or already occupied");
      }
    }
    for (let i = 0; i < ship.length; i++) {
      this.#board[x + i * dx][y + i * dy] = ship;
    }
  }
  receiveHit([x, y]) {
    const pos = this.#board[x][y];
    if (pos instanceof Ship) {
      pos.hit();
      this.#board[x][y] = "X";
    } else if (pos === "W") {
      this.#board[x][y] = "X";
    } else {
      throw new Error("Can't hit the same place twice");
    }
  }
  getInfo(coords) {
    const [x, y] = coords;
    return this.#board[x][y];
  }
}

export class Player {
  constructor(name) {
    this.gameBoard = new Gameboard();
    this.name = name;
    this.liveShips = [
      new Ship(2),
      new Ship(3),
      new Ship(3),
      new Ship(4),
      new Ship(5),
    ];
  }
}
