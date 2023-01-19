INITIAL_GRID_SIZE = 16;


function _setGridSize(gridSize) {
    const root = document.documentElement;
    root.style.setProperty('--grid-size', gridSize);
}


function _removeGridSquaresPresent(grid) {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach(gridSquare => grid.removeChild(gridSquare));
}


function _initGrid(grid, gridSize) {
    const gridSquares = [];

    for (let i = 0; i < (gridSize ** 2); i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');

        gridSquares.push(gridSquare);
        grid.appendChild(gridSquare);
    }

    return gridSquares;
}


function _addHover(gridSquares) {
    gridSquares.forEach(gridSquare => gridSquare.addEventListener('mouseenter', changeGridSquareColourOnHover));
}


function createGrid(gridSize = INITIAL_GRID_SIZE) {
    _setGridSize(gridSize);

    const grid = document.querySelector('.grid');

    _removeGridSquaresPresent(grid);

    gridSquares = _initGrid(grid, gridSize);

    _addHover(gridSquares);

}


function changeGridSquareColourOnHover(e) {
    e.target.classList.add('grid-square-onHover');
}


function redrawGrid() {
    let gridSizeChoice = Number(prompt('Choose grid size (max grid size = 100):', 16));
    if (Number.isNaN(gridSizeChoice) || gridSizeChoice <= 0) {
        return;
    }
    if (gridSizeChoice > 100) {
        gridSizeChoice = 100;
    }
    createGrid(gridSizeChoice);
}


function main() {
    createGrid();

    const gridSizeChanger = document.querySelector('.gridSizeChanger');
    gridSizeChanger.addEventListener('click', redrawGrid);
}

main();