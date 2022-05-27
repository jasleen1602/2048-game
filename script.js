console.log("Welcome to Jasleen's version of 2048!")
document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.querySelector('.result')
    const newGame = document.getElementById('newgame')
    const width = 4
    let squares = []
    let score = 0

    newGame.onclick = function () {
        clearBoard()
        scoreDisplay.innerHTML = 0
        resultDisplay.innerHTML = ""
    }

    //clear board
    function clearBoard() {
        for (let i = 0; i < width * width; i++) {
            squares[i].innerHTML = 0
        }
        generate()
        generate()
    }

    //game board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }
    createBoard()
    scoreDisplay.innerHTML = 0
    //generate a number randomly
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2
            checkForLose()
        }
        else
            generate()
    }

    //swipe down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let tOne = squares[i].innerHTML
            let tTwo = squares[i + 1 * width].innerHTML
            let tThree = squares[i + 2 * width].innerHTML
            let tFour = squares[i + 3 * width].innerHTML
            let column = [parseInt(tOne), parseInt(tTwo), parseInt(tThree), parseInt(tFour)]
            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeroes = Array(missing).fill(0)
            let newColumn = zeroes.concat(filteredColumn)
            squares[i].innerHTML = newColumn[0]
            squares[i + 1 * width].innerHTML = newColumn[1]
            squares[i + 2 * width].innerHTML = newColumn[2]
            squares[i + 3 * width].innerHTML = newColumn[3]
        }
    }

    //swipe up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let tOne = squares[i].innerHTML
            let tTwo = squares[i + 1 * width].innerHTML
            let tThree = squares[i + 2 * width].innerHTML
            let tFour = squares[i + 3 * width].innerHTML
            let column = [parseInt(tOne), parseInt(tTwo), parseInt(tThree), parseInt(tFour)]
            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeroes = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeroes)
            squares[i].innerHTML = newColumn[0]
            squares[i + 1 * width].innerHTML = newColumn[1]
            squares[i + 2 * width].innerHTML = newColumn[2]
            squares[i + 3 * width].innerHTML = newColumn[3]
        }
    }

    //swipe right
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 == 0) {
                let tOne = squares[i].innerHTML
                let tTwo = squares[i + 1].innerHTML
                let tThree = squares[i + 2].innerHTML
                let tFour = squares[i + 3].innerHTML
                let row = [parseInt(tOne), parseInt(tTwo), parseInt(tThree), parseInt(tFour)]
                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeroes = Array(missing).fill(0)
                let newRow = zeroes.concat(filteredRow)
                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    //swipe left
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 == 0) {
                let tOne = squares[i].innerHTML
                let tTwo = squares[i + 1].innerHTML
                let tThree = squares[i + 2].innerHTML
                let tFour = squares[i + 3].innerHTML
                let row = [parseInt(tOne), parseInt(tTwo), parseInt(tThree), parseInt(tFour)]
                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeroes = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeroes)
                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    //combine rows
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML == squares[i + 1].innerHTML) {
                let total = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = total
                squares[i + 1].innerHTML = 0
                score += total
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    //combine columns
    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML == squares[i + width].innerHTML) {
                let total = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
                squares[i].innerHTML = total
                squares[i + width].innerHTML = 0
                score += total
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    //assign keycodes
    function control(e) {
        if (e.keyCode === 39 || e.keyCode === 68)
            keyRight()
        else if (e.keyCode === 37 || e.keyCode === 65)
            keyLeft()
        else if (e.keyCode === 38 || e.keyCode === 87)
            keyUp()
        else if (e.keyCode === 40 || e.keyCode === 83)
            keyDown()
    }
    document.addEventListener('keyup', control)
    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }
    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }
    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }
    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }

    //check for 2048
    function checkForWin() {
        for (let i = 0; i < 16; i++) {
            if (squares[i].innerHTML == 16) {
                resultDisplay.innerHTML = "YOU WON!"
                document.removeEventListener('keyup', control)
            }
        }
    }

    //check for no zeroes
    function checkForLose() {
        let ct = 0;
        for (let i = 0; i < 16; i++) {
            if (squares[i].innerHTML == 0) {
                ct++;
            }
        }
        if (ct == 0) {
            resultDisplay.innerHTML = "GAME OVER!"
            document.removeEventListener('keyup', control)
        }
    }
})