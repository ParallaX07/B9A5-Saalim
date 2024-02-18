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
}

// deselect a seat
function deselectSeat(event) {
  event.target.classList.remove('bg-green-500', 'text-white');
  seatCount.textContent = Number(seatCount.textContent) - 1;
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
