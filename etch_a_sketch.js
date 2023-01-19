GRID_SIZE = 16;

function createGrid() {
    const root = document.documentElement;
    root.style.setProperty('--grid-size', GRID_SIZE)
    const grid = document.querySelector('.grid');
    for (let i = 0; i < (GRID_SIZE ** 2); i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        grid.appendChild(gridSquare);
    }
}

function main() {
    createGrid();
}

main();