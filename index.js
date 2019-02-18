const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 5) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function tryToWin() {
    for (let index=0;index<GRID_LENGTH;index++){
        let sum = grid[index][0] + grid[index][1] + grid[index][2];
        if(sum === 10){
            for (let i=0; i<GRID_LENGTH; i++){
                if (grid[index][i] === 0) {
                    grid[index][i] = 5;
                    return true;
                }
            }
        }
        sum = grid[0][index] + grid[1][index] + grid[2][index];
        if(sum === 10){
            for (let i=0; i<GRID_LENGTH; i++){
                if (grid[i][index] === 0) {
                    grid[i][index] = 5;
                    return true;
                }
            }
        }
    }

    let sum = grid[0][0] + grid[1][1] + grid[2][2];
    if(sum === 10){
        for (let i=0; i<GRID_LENGTH; i++){
            if (grid[i][i] === 0) {
                grid[i][i] = 5;
                return true;
            }
        }
    }

    sum = grid[0][2] + grid[1][1] + grid[2][0]
    if(sum === 10){
        for (let i=0; i<GRID_LENGTH; i++){
            if (grid[i][2-i] === 0) {
                grid[i][2-i] = 5;
                return true;
            }
        }
    }
    return false;
}

function defend() {
    for (let index=0;index<GRID_LENGTH;index++){
        let sum = grid[index][0] + grid[index][1] + grid[index][2];
        if(sum === 2){
            for (let i=0; i<GRID_LENGTH; i++){
                if (grid[index][i] === 0) {
                    grid[index][i] = 5;
                    return true;
                }
            }
        }
        sum = grid[0][index] + grid[1][index] + grid[2][index];
        if(sum === 2){
            for (let i=0; i<GRID_LENGTH; i++){
                if (grid[i][index] === 0) {
                    grid[i][index] = 5;
                    return true;
                }
            }
        }
    }

    let sum = grid[0][0] + grid[1][1] + grid[2][2];
    if(sum === 2){
        for (let i=0; i<GRID_LENGTH; i++){
            if (grid[i][i] === 0) {
                grid[i][i] = 5;
                return true;
            }
        }
    }

    sum = grid[0][2] + grid[1][1] + grid[2][0]
    if(sum === 2){
        for (let i=0; i<GRID_LENGTH; i++){
            if (grid[i][2-i] === 0) {
                grid[i][2-i] = 5;
                return true;
            }
        }
    }
    return false;
}

function checkForLast() {
    let count = 0;
    for(let index1 = 0; index1 < GRID_LENGTH; index1++){
        for(let index2 = 0; index2 < GRID_LENGTH; index2++){
            if(grid[index1][index2] == 0){
                count++;
            }
        }
    }
    if(count == 0){
        return true;
    }
    return false;
}

function play() {

    if(tryToWin()){
        setGameOverStatus(2)
        return;
    }
    isGamePlayed = defend();
    while(!isGamePlayed){
        let i = Math.floor(Math.random()*3)
        let j = Math.floor(Math.random()*3)
        if(grid[i][j]==0){
            grid[i][j]=5;
            break;
        }
    }

    renderMainGrid();
    addClickHandlers();

}

function isGameOver() {

    for (let index=0;index<GRID_LENGTH;index++){
        let sum = grid[index][0] + grid[index][1] + grid[index][2];
        if(sum === 3){
            return 1;
        }
        sum = grid[0][index] + grid[1][index] + grid[2][index];
        if(sum === 3){
            return 1;
        }
    }
    let sum = grid[0][0] + grid[1][1] + grid[2][2];
    if(sum === 3){
        return 1;
    }

    sum = grid[0][2] + grid[1][1] + grid[2][0]
    if(sum === 3){
        return 1;
    }

    if(checkForLast()){
        return 2;
    }

    return 0;
}

function setGameOverStatus(winner){
    renderMainGrid();
    let label = document.getElementById('WinnerUpdate');
    if(winner == 0){
        label.innerHTML = '<h2>It\'s a draw!!</h2>'     
    }
    if(winner == 1){
        label.innerHTML = '<h2>Winner is X</h2>'
    }
    if(winner == 2){
        label.innerHTML = '<h2>Winner is 0</h2>'   
    }

}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    if(grid[colIdx][rowIdx] === 0){
        grid[colIdx][rowIdx] = newValue;
        if(isGameOver() == 1){
            setGameOverStatus(1);
            return;
        }
        else if(isGameOver() == 2){
            setGameOverStatus(0);
            return;
        }
        play();
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
