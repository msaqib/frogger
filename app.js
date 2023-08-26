const rows = 10
const columns = 45

const container = document.getElementById('container')

let frogLocation = (rows - 1) * columns + Math.floor(columns / 2)

const deadStyles = ['car-back', 'car-front', 'cabin', 'cargo']

let logRow1 = [columns, columns + 22]
let logRow2 = [3*columns - 7, 3*columns - 7 - 22]
let logRow3 = [3*columns + 8, 3*columns + 30]

let truckRow1 = [5*columns + 2, 5*columns + 17]
let truckRow2 = [7*columns - 3, 7*columns - 1 - 17]

let carRow1 = []
let carRow2 = []

function displayCars() {
    removeCars()
    carRow1.forEach( c => displayCarRight(c))
    carRow2.forEach( c => displayCarRight(c))
}

function displayCarRight(rear) {
    const divs = container.children
    const rowStart = getRowIndex(rear)
    divs[rear].className = 'car-back ' + divs[rear].className
    divs[rowStart + (rear + 1) % columns].className = 'car-front ' + divs[rowStart + (rear + 1) % columns].className
}

function updateCars() {
    updateCarsRight()
    updateCarssLeft()
}

function updateCarsRight() {
    carRow1 = carRow1.map(c => getRowIndex(c) + (c + 1) % columns)
}

function updateCarssLeft() {
    carRow2 = carRow2.map(c => getRowIndex(c) + (c - 1) % columns)
}

function displayTruckRight(front) {
    const divs = container.children
    const rowStart = getRowIndex(front)
    divs[front].className = 'cabin ' + divs[front].className
    divs[rowStart + (front-1) % columns].className = 'cargo ' + divs[rowStart + (front-1) % columns].className
    divs[rowStart + (front-2) % columns].className = 'cargo ' + divs[rowStart + (front-2) % columns].className
}

function displayTruckLeft(front) {
    const divs = container.children
    const rowStart = getRowIndex(front)
    divs[front].className = 'cabin ' + divs[front].className
    divs[rowStart + (front+1) % columns].className = 'cargo ' + divs[rowStart + (front+1) % columns].className
    divs[rowStart + (front+2) % columns].className = 'cargo ' + divs[rowStart + (front+2) % columns].className
}

function displayTrucks() {
    removeTrucks()
    truckRow1.forEach( t => displayTruckRight(t))
    truckRow2.forEach( t => displayTruckLeft(t))
}

function updateTrucks() {
    updateTrucksRight()
    updateTrucksLeft()
}

function updateTrucksRight() {
    truckRow1 = truckRow1.map(t => getRowIndex(t) + (t + 1) % columns)
}

function updateTrucksLeft() {
    truckRow2 = truckRow2.map(t => getRowIndex(t) + (t - 1) % columns)
}

function updateLogsRows() {
    updateLogsRowRight()
    updateLogsRowLeftt()
}

function updateLogsRowRight() {
    const logRows = [logRow1, logRow3]

    logRows.forEach(logRow => {
        const rowStart = getRowIndex(logRow[0])
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
            const rowStart = getRowIndex(logRow[i])
            logRow[i] = rowStart + (logRow[i] + 1) % columns
        }
    })
}

function updateLogsRowLeftt() {
        const rowStart = getRowIndex(logRow2[0])
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
            const rowStart = getRowIndex(logRow2[0])
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

function removeClass(clas) {
    const divs = document.querySelectorAll('div.' + clas);

    // Iterate through the selected div elements and remove the "log" class
    divs.forEach(div => {
    div.classList.remove(clas);
    })
}

function removeTrucks() {
    removeClass('cargo')
    removeClass('cabin')
}

function removeLogs() {
    removeClass('log')
}

function removeFrog() {
    removeClass('frog')
}

function removeCars() {
    removeClass('car-front')
    removeClass('car-back')
}

function displayLog(logRear) {
    const divs = container.children
    const rowStart = getRowIndex(logRear)
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
    // Set up the cars arrays
    setUpCarRows()
}

function setUpRows(startingRow, endingRow, style) {
    const divs = container.children
    for (let i = startingRow ; i <= endingRow ; i++) {
        for (let j = 0 ; j < columns ; j++) {
            divs[i*columns + j].classList.add(style)
        }
    }
}

function setUpCarRows() {
    setUpCarRow1()
    setUpCarRow2()
}

function setUpCarRow1() {
    let car1Rear = 8*columns
    for (let i = 0 ; i < 3 ; i ++) {
        carRow1 = [...carRow1, car1Rear, car1Rear + 5]
        car1Rear += 13
    }    
}

function setUpCarRow2() {
    let car1Rear = 8*columns - 2
    for (let i = 0 ; i < 3 ; i ++) {
        carRow2 = [...carRow2, car1Rear, car1Rear - 5]
        car1Rear -= 13
    }    
}

initialLayout()

let timers = []
timers = [setInterval(updateLogsRows, 120), ...timers]
timers = [setInterval(refreshLogsRows, 50), ...timers]
timers = [setInterval(displayTrucks, 50), ...timers]
timers = [setInterval(updateTrucks, 120), ...timers]
timers = [setInterval(displayCars, 50), ...timers]
timers = [setInterval(updateCars, 80), ...timers]
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

function getRowIndex(index) {
    return columns * Math.floor(index/columns)
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