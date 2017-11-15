var Board = require("./board.js")
var board = new Board();
board.createBoard();

var Figure = require("./figure.js")
var figure = new Figure();
//Startuje
figure.whiteMove();
