INITIAL_GRID_SIZE = 16;

MODE_BLACK = 'black';
MODE_RANDOM = 'random';


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


function getRandomRGB() {
    const rgb = [];
    for (i = 0; i < 3; i++) {
        rgb.push(getRandomInt(0, 256));
    }
    return `rgb(${rgb.join()})`
}


function _setGridSize(gridSize) {
    const root = document.documentElement;
    root.style.setProperty('--grid-size', gridSize);
}


function _removeGridSquaresPresent(grid) {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach(gridSquare => grid.removeChild(gridSquare));
}


function hoverModeBlack(e) {
    e.target.classList.add('grid-square-onHover');
}


function hoverModeRandom(e) {
    e.target.style.backgroundColor = getRandomRGB();
}


function _initGrid(grid, gridSize, mode) {
    let gridSquareEventListener;
    switch (mode) {
        case (MODE_BLACK):
            gridSquareEventListener = hoverModeBlack;
            break;
        case (MODE_RANDOM):
            gridSquareEventListener = hoverModeRandom;
            break;
        default:
            gridSquareEventListener = hoverModeBlack;
    }

    for (let i = 0; i < (gridSize ** 2); i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');

        gridSquare.addEventListener('mouseenter', gridSquareEventListener)

        grid.appendChild(gridSquare);
    }
}


function createGrid(mode, gridSize = INITIAL_GRID_SIZE) {
    _setGridSize(gridSize);

    const grid = document.querySelector('.grid');

    _removeGridSquaresPresent(grid);

    _initGrid(grid, gridSize, mode);

}


function redrawGridFactory(mode) {
    let currentGridSizeChoice = INITIAL_GRID_SIZE;
    let currentMode = mode;

    function redrawGrid() {
        gridSizeChoice = Number(prompt('Choose grid size (max grid size = 100):', currentGridSizeChoice));
        if (Number.isNaN(gridSizeChoice) || gridSizeChoice <= 0) {
            return;
        }
        if (gridSizeChoice > 100) {
            gridSizeChoice = 100;
        }
        currentGridSizeChoice = gridSizeChoice;
        createGrid(currentMode, currentGridSizeChoice);
    }

    function changeMode(e) {
        currentMode = e.target.value;
        createGrid(currentMode, currentGridSizeChoice);
    }

    return [redrawGrid, changeMode];
}


function main() {
    const defaultMode = document.querySelector('.gridMode-input:checked').value;

    createGrid(defaultMode);

    [redrawGridFn, changeModeFn] = redrawGridFactory(defaultMode);

    const gridRedrawer = document.querySelector('.gridRedrawer');
    gridRedrawer.addEventListener('click', redrawGridFn);

    const gridModes = document.querySelectorAll('.gridMode-input');
    gridModes.forEach(gridMode => gridMode.addEventListener('change', changeModeFn));
}


main();