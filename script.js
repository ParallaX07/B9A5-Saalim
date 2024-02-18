function offerButton() {
    var button = document.getElementById("offerButton");
    button.innerHTML = "No more offers at the moment";
    setTimeout(function () {
        button.innerHTML = "See all Offers";
    }, 5000);
}

// add a smooth scroll while taking the user to the purchase tickets section
function smoothScroll(className) {
    const elements = document.querySelectorAll(className);
    elements.forEach((element) => {
        element.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = "#purchase-tickets";
            document
                .querySelector(targetId)
                .scrollIntoView({ behavior: "smooth" });
        });
    });
}

const seats = document.querySelector('.seats-container'); // Select the parent element
const seatCount = document.querySelector('#noOfSeats');

// table for selected seats
const selectedSeats = document.querySelector('#selectedSeats');
const remainingSeats = document.querySelector('#remainingSeats');
const totalPrice = document.querySelector('#totalPrice');

// check if a seat was clicked
function isSeatClicked(event) {
  const elementId = event.target.id;
  return elementId.length === 2;
}

// check if a seat is selected
function isSeatSelected(event) {
  return event.target.classList.contains('bg-green-500');
}

// select a seat
function selectSeat(event) {
  event.target.classList.add('bg-green-500', 'text-white');
  seatCount.textContent = Number(seatCount.textContent) + 1;
  enableCouponButton();
  // Create a new row and cells
  const newRow = selectedSeats.insertRow();
  const cell1 = newRow.insertCell();
  const cell2 = newRow.insertCell();
  const cell3 = newRow.insertCell();

  // Add text to the cells
  cell1.textContent = event.target.id; 
  cell2.textContent = 'Economy'; 
  cell3.textContent = '550'; 
  totalPrice.textContent = Number(totalPrice.textContent) + 550;
  remainingSeats.textContent = Number(remainingSeats.textContent) - 1;
  
}

// deselect a seat
function deselectSeat(event) {
  event.target.classList.remove('bg-green-500', 'text-white');
  seatCount.textContent = Number(seatCount.textContent) - 1;
  enableCouponButton();

  // Delete the corresponding row
  const rows = Array.from(selectedSeats.rows);
  const rowIndex = rows.findIndex(row => row.cells[0].textContent === event.target.id);
  if (rowIndex !== -1) {
    selectedSeats.deleteRow(rowIndex);
    totalPrice.textContent = Number(totalPrice.textContent) - 550;
    remainingSeats.textContent = Number(remainingSeats.textContent) + 1;
  }
}

const couponButton = document.querySelector('#applyCoupon');
const couponInput = document.querySelector('#couponCode');

function enableCouponButton() {
  if (Number(seatCount.textContent) >= 4) {
    couponButton.disabled = false;
    couponInput.disabled = false;
  } else {
    couponInput.disabled = true;
    couponButton.disabled = true;
  }
}

// event listener for seats-container
seats.addEventListener('click', (event) => {
  if (isSeatClicked(event)) {
    if (isSeatSelected(event)) {
      deselectSeat(event);
    } else {
      selectSeat(event);
    }
  }
});



smoothScroll(".buy-tickets");
