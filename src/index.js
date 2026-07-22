import { Player } from "./objects.js";
import { PlayerUIHandler } from "./uiHandler.js";
import "./style.css";

const computer = new Player("computer");
const player = new Player("Player");

const computerUI = new PlayerUIHandler(computer, "left");
const playerUI = new PlayerUIHandler(player, "right");
