const rows = 10
const columns = 45

const container = document.getElementById('container')

let frogLocation = (rows - 1) * columns + Math.floor(columns / 2)

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

function showLogRow1() {
    const divs = container.children
    let log1Rear = 0
    let log2Rear = 22
    for (let i = 1 ; i <= 7 ; i++) {
        divs[columns + log1Rear + i - 1].classList.remove('water')
        divs[columns + log1Rear + i - 1].classList.add('log')
    }
    for (let i = 1 ; i <= 7 ; i++) {
        divs[columns + log2Rear + i - 1].classList.remove('water')
        divs[columns + log2Rear + i - 1].classList.add('log')
    }
}

function showLogRow2() {
    const divs = container.children
    let log1Rear = columns - 1
    let log2Rear = columns - 1 - 22
    for (let i = 1 ; i <= 7 ; i++) {
        divs[2 * columns + log1Rear - i + 1].classList.remove('water')
        divs[2 * columns + log1Rear - i + 1].classList.add('log')
    }
    for (let i = 1 ; i <= 7 ; i++) {
        divs[2 * columns + log2Rear - i + 1].classList.remove('water')
        divs[2 * columns + log2Rear - i + 1].classList.add('log')
    }   
}

function showLogRow3() {
    const divs = container.children
    let log1Rear = 8
    let log2Rear = 30
    for (let i = 1 ; i <= 7 ; i++) {
        divs[3*columns + log1Rear + i - 1].classList.remove('water')
        divs[3*columns + log1Rear + i - 1].classList.add('log')
    }
    for (let i = 1 ; i <= 7 ; i++) {
        divs[3*columns + log2Rear + i - 1].classList.remove('water')
        divs[3*columns + log2Rear + i - 1].classList.add('log')
    }    
}

function updateLogRow1(){
    const divs = container.children
    // rotateRight(divs, columns, 2*columns - 1)
}

function updateLogRow2(){
    const divs = container.children
    rotateLeft(divs, 2 * columns, 3*columns - 1)
}

function updateLogRow3(){
    const divs = container.children
    rotateRight(divs, 3*columns, 4*columns - 1)
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

showLogRow1()
showLogRow2()
showLogRow3()

let timers = []
timers = [setInterval(updateTruckRow1, 1000), ...timers]
timers = [setInterval(updateTruckRow2, 1000), ...timers]
timers = [setInterval(updateCarsRow1, 1000), ...timers]
timers = [setInterval(updateCarsRow2, 500), ...timers]
timers = [setInterval(updateLogRow1, 500), ...timers]
timers = [setInterval(updateLogRow2, 500), ...timers]
timers = [setInterval(updateLogRow3, 10000), ...timers]
timers = [setInterval(updateFrog, 50), ...timers]

document.addEventListener('keydown', moveFrog)

function updateFrog() {
    divs = container.children
    const rowType = getRowType(frogLocation)
    const newStyle = divs[frogLocation].classList.item(0)
    if (newStyle !== 'grass' && newStyle !== 'road' && newStyle !== 'frog' && newStyle !== 'log') {
        // we lost
        timers.forEach(t => {
            clearInterval(t)
        })
    }
    //console.log(rowType)
    //divs[frogLocation].classList.remove(rowType)
    //divs[frogLocation].classList.remove(divs[frogLocation].classList.item(0))
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