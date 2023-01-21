INITIAL_GRID_SIZE = 16;

MODE_SOLID = 'solid';
MODE_RANDOM = 'random';
MODE_GRADIENT = 'gradient';
MODE_ERASER = 'eraser';


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


function onClickAndDrag(e, fn) {
    if (e.buttons === 1) {
        e.preventDefault();
        fn();
    }
}


function hoverModeSolid(e) {
    onClickAndDrag(e, () => e.target.style.backgroundColor = 'black');
}


function hoverModeRandom(e) {
    onClickAndDrag(e, () => e.target.style.backgroundColor = getRandomRGB());
}


function hoverModeGradientFactory() {
    let lightness = 100;

    function hoverModeGradient(e) {
        lightness -= 10;
        if (lightness < 0) {
            lightness = 0;
        }
        onClickAndDrag(e, () => e.target.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`);
    }

    return hoverModeGradient;
}


function hoverModeEraser(e) {
    onClickAndDrag(e, () => e.target.style.backgroundColor = 'white');
}


function _setGridSize(gridSize) {
    const root = document.documentElement;
    root.style.setProperty('--grid-size', gridSize);
}


function _removeGridSquaresPresent(grid) {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach(gridSquare => grid.removeChild(gridSquare));
}


function _initGrid(grid, gridSize) {
    for (let i = 0; i < (gridSize ** 2); i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        grid.appendChild(gridSquare);
    }
}


function addEventListenerToGrid(mode) {

    function getEventListener() {
        let gridSquareEventListener;

        switch (mode) {
            case (MODE_SOLID):
                gridSquareEventListener = hoverModeSolid;
                break;
            case (MODE_RANDOM):
                gridSquareEventListener = hoverModeRandom;
                break;
            case (MODE_GRADIENT):
                gridSquareEventListener = hoverModeGradientFactory();
                break;
            case (MODE_ERASER):
                gridSquareEventListener = hoverModeEraser;
                break;

        }

        return gridSquareEventListener;
    }

    const gridSquares = document.querySelectorAll('.grid-square');

    function addEventListeners(gridSquare) {
        newGridSquare = gridSquare.cloneNode(true);
        gridSquare.replaceWith(newGridSquare);
        eventListener = getEventListener();
        newGridSquare.addEventListener('mousedown', eventListener);
        newGridSquare.addEventListener('mouseenter', eventListener);
    }

    gridSquares.forEach(addEventListeners);
}


function createGrid(mode, gridSize = INITIAL_GRID_SIZE) {
    _setGridSize(gridSize);

    const grid = document.querySelector('.grid');

    _removeGridSquaresPresent(grid);

    _initGrid(grid, gridSize);

    addEventListenerToGrid(mode);

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
        addEventListenerToGrid(currentMode);
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