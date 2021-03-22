'use strict';
var gElSelectedSeat = null;

// TODO: Support selecting a seat
// TODO: Only a single seat should be selected
// TODO: Support Unselecting a seat
// TODO: When seat is selected a popup is shown
// TODO: Popup shows the seat identier - e.g.: 3-5 or 7-15
// TODO: Popup should contain seat price (for now 4$ to all) and allow booking the seat
// TODO: Uplift your model - each seat should have its own price... 

// TODO: in seat details, show how many available seats around 


var gCinema = createCinema()
renderSeats();

function createCinema() {
    var cinema = [];
    for (var i = 0; i < 7; i++) {
        cinema[i] = [];
        for (var j = 0; j < 15; j++) {
            var cell;
            if (j !== 7) {
               cell = {type: 'SEAT', price: 1.1*i + 2, isBooked: false}
            } else {
                cell = {type: 'EMPTY'}
            }
            cinema[i][j] = cell;
        }
    }
    cinema[3][3].isBooked = true;
    return cinema;
}

function renderSeats() {
    var strHTML = ''
    for (var i = 0; i < gCinema.length; i++) {
        strHTML += `<tr class="cinema-row" >\n`
        for (var j = 0; j < gCinema[0].length; j++) {
            var cell = gCinema[i][j];
            var className = ''
            if (cell.type === 'SEAT') className += ' seat ';
            if (cell.isBooked) className += ' booked ';
            strHTML += `\t<td class="cell ${className}" 
                            onclick="seatClick(this, ${i}, ${j})" >
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
    console.log(strHTML)

    var elSeats = document.querySelector('.cinema-seats');
    elSeats.innerHTML = strHTML;
}


function seatClick(elSeat, i, j) {

    if (gCinema[i][j].type !== 'SEAT') return;
    if (gCinema[i][j].isBooked) return;

    elSeat.classList.toggle('selected')
    // Only a single seat should be selected
    if (gElSelectedSeat) {
        gElSelectedSeat.classList.remove('selected')
    }
    // Support Unselecting
    gElSelectedSeat = (elSeat === gElSelectedSeat) ? null : elSeat;

    if (gElSelectedSeat) showSeatDetails({ i, j })
    else hideSeatDetails();
}

function hideSeatDetails() {
    var elPopup = document.querySelector('.popup');
    elPopup.hidden = true;
}

function showSeatDetails(pos) {
    var elPopup = document.querySelector('.popup');
    var elSeatNo = elPopup.querySelector('h2 span');
    var elPrice = elPopup.querySelector('h3 span');
    elSeatNo.innerText = `${pos.i + 1}-${pos.j + 1}`
    
    var cell = gCinema[pos.i][pos.j];
    elPrice.innerText = cell.price + '$';
    
    
    var elBtn = elPopup.querySelector('button');
    elBtn.dataset.i = pos.i;
    elBtn.dataset.j = pos.j;

    elPopup.hidden = false;
}

function bookSeat(elBtn) {
    var posI = elBtn.dataset.i;
    var posJ = elBtn.dataset.j;
    gCinema[posI][posJ].isBooked = true;
    renderSeats();
    hideSeatDetails();
}









