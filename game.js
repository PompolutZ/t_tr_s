'use strict'

const fps = 30;

const board = document.getElementById('board')
const ctx = board.getContext('2d')

const tileWidth = board.width / 10
const tileHeight = tileWidth

const fromRGB = function(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")"
}

const drawTile = function(top, left) {
    this.fillStyle = fromRGB(200, 0, 0)
    this.fillRect(top + 1, left + 1, tileWidth - 2, tileHeight - 2)
}

const clear = function() {
    this.clearRect(0,0, board.width, board.height);
}

const drawTileOnCanvas = drawTile.bind(ctx);
const clearCanvas = clear.bind(ctx);

var game = function(fps, update, draw) {
    const run = () => {
        update()
        draw()
    };

    let intervalId;

    return {
        start: () => intervalId = setInterval(run, 1000 / fps),
        stop: () => clearInterval(intervalId)
    }
}

let currentTileY = 0;
let frame = 0;

const update = function(){
    if(++frame % fps !== 0) return;

    if(currentTileY < board.height - tileHeight){
        currentTileY += tileHeight;
    }
}

const draw = () => {
    clearCanvas();
    drawTileOnCanvas(0, currentTileY)
}

let newGame = game(fps, update, draw)
console.log(newGame.speed)
newGame.start()
