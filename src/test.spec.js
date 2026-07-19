import * as objects from "./objects.js";
describe("Tests for Ships", () => {
  let ship;

  beforeAll(() => {
    ship = new objects.Ship(3);
    board = new objects.Gameboard();
  });

  test("Creation of ship object", () => {
    expect(ship.length).toBe(3);
  });

  test("Hit once", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("Hit till sunk", () => {
    expect(ship.sunk).toBe(false);
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(true);
  });
  test("Hit after sunk", () => {
    expect(() => ship.hit()).toThrow();
  });
});
describe("Tests for Gameboard", () => {
  beforeAll(() => {
    ship = new objects.Ship(3);
    board = new objects.Gameboard();
  });

  test("Placement of ships", () => {
    board.place(ship, "E", [0, 0], 0);
    expect(board.getInfo([0, 0, 0])).toBe(ship);
  });

  test("Register hit on ship", () => {
    board.receiveHit([0, 0]);
    expect(ship.hits).toBe(1);
    expect(board.getInfo([0, 0])).toBe("X");
  });

  test("Register miss on board", () => {
    board.receiveHit([1, 1]);
    expect(board.getInfo([1, 1])).toBe("X");
  });

  test("Throw error on hit same place twice", () => {
    expect(() => board.receiveHit([0, 0])).toThrow();
  });
});
