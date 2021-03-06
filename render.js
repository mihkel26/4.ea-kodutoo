let W = 600, H = 600;
let BLOCK_W = W / COLS,
    BLOCK_H = H / ROWS;
let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
let info = document.getElementById('info'),
    cctx = info.getContext('2d');
let colors = [
    'blue', 'darkgreen', 'red', 'navyblue', 'darkred', 'cyan', 'purple', 'black'
];
let bombIcon = new Image();
bombIcon.src = 'images/bombb.svg';
let flagIcon = new Image();
flagIcon.src = 'images/flag.svg';


function modelToView(x, y) {
    return {
        x: x * BLOCK_W,
        y: y * BLOCK_H
    };
}

function viewToModel(x, y) {
    return {
        x: Math.floor(x / BLOCK_W),
        y: Math.floor(y / BLOCK_H)
    };
}

function renderMine(x, y) {
    let viewCoordinates = modelToView(x, y);

    ctx.drawImage(bombIcon, viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
}

function renderFlag(x, y) {
    let viewCoordinates = modelToView(x, y);

    ctx.drawImage(flagIcon, viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
}

function renderNumber(x, y) {
    let viewCoordinates = modelToView(x, y);

    ctx.fillStyle = colors[board[y][x] - 1];
    ctx.font = '20pt Verdana';
    let textSizeM = ctx.measureText('M'),
        textSizeNumber = ctx.measureText(board[y][x]);
    ctx.fillText(
        board[y][x],
        viewCoordinates.x + Math.floor(BLOCK_W / 2) - textSizeNumber.width / 2,
        viewCoordinates.y + Math.floor(BLOCK_H / 2) + textSizeM.width / 2
    );
}

function renderInfo() {
    cctx.clearRect(0, 0, info.width, info.height);
    cctx.fillStyle = 'white';
    cctx.font = '15pt Verdana';
    cctx.fillText("Klikke tehtud: " + clicks, 20, 20);
    cctx.fillText("Kaste avatud: " + blocksOpened, 400, 20);
}

function renderBlock(x, y) {
    let viewCoordinates = modelToView(x, y);

    if (state[y][x] == STATE_OPENED) {
        ctx.fillStyle = '#ddd';
    }
    else {
        ctx.fillStyle = '#999';
    }

    ctx.strokeStyle = 'black';
    ctx.fillRect(viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
    ctx.strokeRect(viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);

    if (state[y][x] == STATE_FLAGGED) {
        renderFlag(x, y);
    }

    if (state[y][x] == STATE_OPENED) {
        switch (board[y][x]) {
            case 0:
                break;
            case BLOCK_MINE:
                renderMine(x, y);
                break;
            default:
                renderNumber(x, y);
        }
    }
}

function render() {
    renderInfo();
    for (let y = 0; y < ROWS; ++y) {
        for (let x = 0; x < COLS; ++x) {
            renderBlock(x, y);
        }
    }
}

render();

//code from: https://www.youtube.com/watch?v=LRnnNInjmN0