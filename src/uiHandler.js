import { Ship, Gameboard, Player } from "./objects";

const computer = new Player("computer");
const player = new Player("Player");

const base = document.getElementsByName("body");
const computerGameBoardUI = document.createElement("div");
