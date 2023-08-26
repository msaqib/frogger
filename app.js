const rows = 10
const columns = 45

const container = document.getElementById('container')

let frogLocation = (rows - 1) * columns + Math.floor(columns / 2)

const deadStyles = ['car-back', 'car-front', 'cabin', 'cargo']
let logRow1 = [columns, columns + 22]
let logRow2 = [3*columns - 7, 3*columns - 7 - 22]
let logRow3 = [3*columns + 8, 3*columns + 30]
console.log(logRow2)

function updateLogsRows() {
    updateLogsRowRight()
    updateLogsRowLeftt()
}

function updateLogsRowRight() {
    const logRows = [logRow1, logRow3]

    logRows.forEach(logRow => {
        const rowStart = Math.floor(logRow[0] / columns) * columns
        // Do we need to move the frog?
        logRow.forEach(l => {
            for (let i = l ; i < l + 7 ; i++) {
                if (rowStart + (i % columns) === frogLocation) {
                    removeFrog()
                    frogLocation = rowStart + ((frogLocation + 1) % columns)
                    break
                }
            }
        })    
    })
    logRows.forEach( logRow => {
        for (let i = 0 ; i < logRow.length; i++) {
            const rowStart = Math.floor(logRow[i] / columns) * columns
            logRow[i] = rowStart + (logRow[i] + 1) % columns
        }
    })
}

function updateLogsRowLeftt() {
        console.log(logRow2)
        const rowStart = Math.floor(logRow2[0] / columns) * columns
        // Do we need to move the frog?
        logRow2.forEach(l => {
            for (let i = l ; i < l + 7 ; i++) {
                if (rowStart + (i % columns) === frogLocation) {
                    removeFrog()
                    frogLocation = rowStart + ((frogLocation - 1) % columns)
                    break
                }
            }
        })    
        for (let i = 0 ; i < logRow2.length; i++) {
            const rowStart = Math.floor(logRow2[0] / columns) * columns
            logRow2[i] = rowStart + (logRow2[i] - 1) % columns
        }
    
}

function refreshLogsRows() {
    removeLogs()
    refreshLogsRowsRight()
}

function refreshLogsRowsRight() {
    logRow1.forEach(l => displayLog(l))
    logRow2.forEach(l => displayLog(l))
    logRow3.forEach(l => displayLog(l))    
}

function refreshLogsRowsLeft() {
    logRow2.forEach(l => displayLogLeft(l))
}

function removeLogs() {
    const logDivs = document.querySelectorAll('div.log');

    // Iterate through the selected div elements and remove the "log" class
    logDivs.forEach(div => {
    div.classList.remove('log');
    })
}

function removeFrog() {
    const logDivs = document.querySelectorAll('div.frog');

    // Iterate through the selected div elements and remove the "frog" class
    logDivs.forEach(div => {
    div.classList.remove('frog');
    })
}

function displayLog(logRear) {
    const divs = container.children
    const rowStart = Math.floor(logRear / columns) * columns
    for (let i = logRear ; i < logRear + 7; i++) {
        divs[rowStart + (i % columns)].classList.add('log')
    }
}

function initialLayout() {
    for (let i = 0 ; i < rows ; i++) {
        for (let j = 0 ; j < columns ; j++) {
            const elem = document.createElement('div')
            container.appendChild(elem)
        }
    }

    // Make the top row grass
    setUpRows(0, 0, 'grass')    

    // Make the bottom row grass
    setUpRows(9, 9, 'grass')    

    // Show the frog
    const divs = container.children
    divs[frogLocation].classList.remove('grass')
    divs[frogLocation].classList.add('frog')

    // Rows 2, 3, and 4 are water
    setUpRows(1, 3, 'water')    
    // Row 5 is grass
    setUpRows(4, 4, 'grass')        
    // Rows 6, 7, 8, and 9 are road
    setUpRows(5, 8, 'road')
}

function setUpRows(startingRow, endingRow, style) {
    const divs = container.children
    for (let i = startingRow ; i <= endingRow ; i++) {
        for (let j = 0 ; j < columns ; j++) {
            divs[i*columns + j].classList.add(style)
        }
    }
}

function showCarRow1() {
    const divs = container.children

    let car1Rear = 8*columns
    let car2Rear = car1Rear + 5

    for (let i = 0 ; i < 3 ; i++) {
        divs[car1Rear].classList.remove('road')
        divs[car1Rear + 1].classList.remove('road')
        divs[car1Rear + 1].classList.add('car-front')
        divs[car1Rear].classList.add('car-back')

        divs[car2Rear].classList.remove('road')
        divs[car2Rear + 1].classList.remove('road')
        divs[car2Rear + 1].classList.add('car-front')
        divs[car2Rear].classList.add('car-back')

        car1Rear += 13
        car2Rear = car1Rear + 5
    }
}

function showCarRow2() {
    const divs = container.children

    let car1Rear = 8*columns - 1
    let car2Rear = car1Rear - 5

    for (let i = 0 ; i < 3 ; i++) {
        divs[car1Rear].classList.remove('road')
        divs[car1Rear - 1].classList.remove('road')
        divs[car1Rear - 1].classList.add('car-back')
        divs[car1Rear].classList.add('car-front')

        divs[car2Rear].classList.remove('road')
        divs[car2Rear - 1].classList.remove('road')
        divs[car2Rear - 1].classList.add('car-back')
        divs[car2Rear].classList.add('car-front')

        car1Rear -= 13
        car2Rear = car1Rear - 5
    }
}

function updateCarsRow1(){
    const divs = container.children
    // rotateRight(divs, 8*columns, 9*columns-1)    
}

function updateCarsRow2(){
    const divs = container.children
    rotateLeft(divs, 7*columns, 8*columns - 1)
}

function showTruckRow1() {
    const divs = container.children

    let truckRear = 6*columns
    
    for (let i = 0 ; i < 3 ; i++) {
        divs[truckRear].classList.remove('road')
        divs[truckRear + 1].classList.remove('road')
        divs[truckRear + 2].classList.remove('road')
        divs[truckRear + 2].classList.add('cargo')
        divs[truckRear + 1].classList.add('cargo')
        divs[truckRear].classList.add('cabin')

        truckRear += 15
    }
}

function showTruckRow2() {
    const divs = container.children

    let truckRear = 5*columns
    
    for (let i = 0 ; i < 3 ; i++) {
        divs[truckRear].classList.remove('road')
        divs[truckRear + 1].classList.remove('road')
        divs[truckRear + 2].classList.remove('road')
        divs[truckRear + 2].classList.add('cabin')
        divs[truckRear + 1].classList.add('cargo')
        divs[truckRear].classList.add('cargo')

        truckRear += 15
    }
}

function updateTruckRow1(){
    const divs = container.children
    rotateLeft(divs, 6*columns, 7*columns - 1)    
}

function updateTruckRow2(){
    const divs = container.children
    rotateRight(divs, 5*columns, 6*columns - 1)
}

function rotateRight(divs, start, end) {
    const temp = divs[end].classList.item(0)
    for (let i = end  ; i > start ; i--) {
        divs[i].classList.remove(divs[i].classList.item(0))
        divs[i].classList.add(divs[i-1].classList.item(0))
    }
    divs[start].classList.remove(divs[start].classList.item(0))
    divs[start].classList.add(temp)
}

function rotateLeft(divs, start, end) {
    const type = getRowType(start)
    const temp = divs[start].classList.item(0)
    for (let i = start ; i < end ; i++) {
        divs[i].classList.remove(divs[i].classList.item(0))
        if (divs[i+1].classList.item(0) !== 'frog') {
            divs[i].classList.add(divs[i+1].classList.item(0))
        }
        else {
            divs[i].classList.add(type)
        }
    }
    divs[end].classList.remove(divs[end].classList.item(0))
    divs[end].classList.add(temp)
}

initialLayout()
showCarRow1()
showCarRow2()
showTruckRow1()
showTruckRow2()

let timers = []
timers = [setInterval(updateLogsRows, 2000), ...timers]
timers = [setInterval(refreshLogsRows, 50), ...timers]
// timers = [setInterval(updateTruckRow1, 1000), ...timers]
// timers = [setInterval(updateTruckRow2, 1000), ...timers]
// timers = [setInterval(updateCarsRow1, 1000), ...timers]
// timers = [setInterval(updateCarsRow2, 500), ...timers]
//timers = [setInterval(updateLogRow2, 500), ...timers]
timers = [setInterval(updateFrog, 50), ...timers]

document.addEventListener('keydown', moveFrog)

function updateFrog() {
    divs = container.children
    const rowType = getRowType(frogLocation)
    const hit = deadStyles.some(style => divs[frogLocation].classList.contains(style))
    const water = divs[frogLocation].classList.contains('water') 
    const log = divs[frogLocation].classList.contains('log')
    if (hit || (water && !log)) {
        timers.forEach(t => {
                clearInterval(t)
            })
        document.removeEventListener('keydown', moveFrog)
    }
    divs[frogLocation].classList.add('frog')
}

function getRowType(index) {
    const styles = ['grass', 'water', 'water', 'water', 'grass', 'road', 'road', 'road', 'road', 'grass']
    const rowNumber = Math.floor(index / columns)
    return styles[rowNumber]

}

function moveFrog(e) {
    const divs = container.children
    const key = event.key
    let rowType = getRowType(frogLocation)
    switch(key) {
    case 'ArrowLeft':
        if(frogLocation % columns !== 0) {
            divs[frogLocation].classList.remove('frog')
            divs[frogLocation].classList.add(rowType)
            frogLocation--
        }
        break
    case 'ArrowRight':
        if(frogLocation % columns !== columns - 1) {
            divs[frogLocation].classList.remove('frog')
            divs[frogLocation].classList.add(rowType)
            frogLocation++
        }
        break;
    case 'ArrowUp':
        if (Math.floor(frogLocation / columns) !== 0) {
            divs[frogLocation].classList.remove('frog')
            divs[frogLocation].classList.add(rowType)
            frogLocation -= columns
        }
        break;

    case 'ArrowDown':
        if (Math.floor(frogLocation / columns) !== (rows - 1)) {
            divs[frogLocation].classList.remove('frog')
            divs[frogLocation].classList.add(rowType)
            frogLocation += columns
        }
        break;
    }
    updateFrog()
}