const rows = 10
const columns = 41

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

        car1Rear += 15
        car2Rear = car1Rear + 5
    }
}

function updateCarsRow1(){
    const divs = container.children
    for (let i = 9*columns - 1 ; i >= 8*columns ; i--) {
        if (divs[i].classList.contains('car-front')) {
            divs[i].classList.remove('car-front')
            divs[i].classList.add('car-back')
            if (i < 9*columns - 1) {
                divs[i + 1].classList.remove('road')
                divs[i + 1].classList.add('car-front')
            }
        }
        else if (divs[i].classList.contains('car-back')) {
            console.log(i - 8*columns, ' has rear')
            divs[i].classList.remove('car-back')
            divs[i].classList.add('road')
        }
    }    
}

initialLayout()
showCarRow1()
setInterval(updateCarsRow1, 100)