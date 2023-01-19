GRID_SIZE = 16;

function createGrid() {
    const root = document.documentElement;
    root.style.setProperty('--grid-size', GRID_SIZE);
    const grid = document.querySelector('.grid');
    for (let i = 0; i < (GRID_SIZE ** 2); i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        grid.appendChild(gridSquare);
    }
}

function changeGridSquareColourOnHover(e) {
    e.target.classList.add('grid-square-onHover');
}

function main() {
    createGrid();
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach(gridSquare => gridSquare.addEventListener('mouseenter', changeGridSquareColourOnHover));
}

main();