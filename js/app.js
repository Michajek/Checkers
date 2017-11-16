let Board = require("./board.js")
let board = new Board();
board.createBoard();

let Figure = require("./figure.js")
let figure = new Figure();
//Startuje
figure.whiteMove();
