INITIAL_GRID_SIZE = 16;


function _setGridSize(gridSize) {
    const root = document.documentElement;
    root.style.setProperty('--grid-size', gridSize);
}


function _removeGridSquaresPresent(grid) {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach(gridSquare => grid.removeChild(gridSquare));
}


function changeGridSquareColourOnHover(e) {
    e.target.classList.add('grid-square-onHover');
}


function _initGrid(grid, gridSize) {
    for (let i = 0; i < (gridSize ** 2); i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');

        gridSquare.addEventListener('mouseenter', changeGridSquareColourOnHover)

        grid.appendChild(gridSquare);
    }
}


function createGrid(gridSize = INITIAL_GRID_SIZE) {
    _setGridSize(gridSize);

    const grid = document.querySelector('.grid');

    _removeGridSquaresPresent(grid);

    _initGrid(grid, gridSize);

}

function redrawGridFactory() {
    let currentGridSizeChoice = INITIAL_GRID_SIZE;

    function redrawGrid() {
        gridSizeChoice = Number(prompt('Choose grid size (max grid size = 100):', currentGridSizeChoice));
        if (Number.isNaN(gridSizeChoice) || gridSizeChoice <= 0) {
            return;
        }
        if (gridSizeChoice > 100) {
            gridSizeChoice = 100;
        }
        currentGridSizeChoice = gridSizeChoice;
        createGrid(gridSizeChoice);
    }

    return redrawGrid;
}


function main() {
    createGrid();

    const gridSizeChanger = document.querySelector('.gridSizeChanger');
    redrawGridFn = redrawGridFactory();
    gridSizeChanger.addEventListener('click', redrawGridFn);
}


main();