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

const seats = document.querySelector(".seats-container"); // Select the parent element
const seatCount = document.querySelector("#noOfSeats");

// table for selected seats
const selectedSeats = document.querySelector("#selectedSeats");
const remainingSeats = document.querySelector("#remainingSeats");

// price fields
const totalPrice = document.querySelector("#totalPrice");
const grandTotal = document.querySelector("#grandTotal");
const discounted = document.querySelector("#discountedPrice");

// Coupon fields
const couponButton = document.querySelector("#applyCoupon");
const couponInput = document.querySelector("#couponCode");

// check if a seat was clicked
function isSeatClicked(event) {
    const elementId = event.target.id;
    return elementId.length === 2;
}

// check if a seat is selected
function isSeatSelected(event) {
    document.getElementById("discounted").classList.add("hidden");
    document.getElementById("coupon").style.display = "flex";
    couponInput.value = "";
    grandTotal.textContent = totalPrice.textContent;
    return event.target.classList.contains("bg-green-500");
}

// select a seat
function selectSeat(event) {
    event.target.classList.add("bg-green-500", "text-white");
    seatCount.textContent = Number(seatCount.textContent) + 1;
    enableCouponButton();
    // Create a new row and cells
    const newRow = selectedSeats.insertRow();
    const cell1 = newRow.insertCell();
    const cell2 = newRow.insertCell();
    const cell3 = newRow.insertCell();

    // Add text to the cells
    cell1.textContent = event.target.id;
    cell2.textContent = "Economy";
    cell3.textContent = "550";
    totalPrice.textContent = Number(totalPrice.textContent) + 550;
    grandTotal.textContent = totalPrice.textContent;
    remainingSeats.textContent = Number(remainingSeats.textContent) - 1;
    checkRequiredFields();
}

// deselect a seat
function deselectSeat(event) {
    event.target.classList.remove("bg-green-500", "text-white");
    seatCount.textContent = Number(seatCount.textContent) - 1;
    enableCouponButton();

    // Delete the corresponding row
    const rows = Array.from(selectedSeats.rows);
    const rowIndex = rows.findIndex(
        (row) => row.cells[0].textContent === event.target.id
    );
    if (rowIndex !== -1) {
        selectedSeats.deleteRow(rowIndex);
        totalPrice.textContent = Number(totalPrice.textContent) - 550;
        grandTotal.textContent = totalPrice.textContent;
        remainingSeats.textContent = Number(remainingSeats.textContent) + 1;
        checkRequiredFields();
    }
}

// enable the coupon button if the seat count is 4 or more
function enableCouponButton() {
    if (Number(seatCount.textContent) >= 4) {
        couponButton.disabled = false;
        couponInput.disabled = false;
    } else {
        couponInput.disabled = true;
        couponButton.disabled = true;
    }
}

// apply coupon
function applyCoupon() {
    const couponCode = couponInput.value;
    const wrongCouponDialog = document.querySelector("#wrongCoupon");

    if (couponCode.toLowerCase() === "new15") {
        discounted.textContent = Math.ceil(
            Number(totalPrice.textContent) * 0.15
        );
        grandTotal.textContent = Math.ceil(
            Number(totalPrice.textContent) * 0.85
        );
    } else if (
        couponCode.toLowerCase() === "couple20" ||
        couponCode.toLowerCase() === "couple 20"
    ) {
        discounted.textContent = Math.ceil(
            Number(totalPrice.textContent) * 0.2
        );
        grandTotal.textContent = Math.ceil(
            Number(totalPrice.textContent) * 0.8
        );
    } else {
        wrongCouponDialog.showModal();
        return;
    }
    document.getElementById("discounted").classList.remove("hidden");
    document.getElementById("coupon").style.display = "none";
}

// event listener for coupon button
couponButton.addEventListener("click", applyCoupon);

// get the form, input fields and the submit button
const form = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const phoneNumberInput = document.querySelector("#phoneNumber");
const submitButton = document.querySelector("#submit");
const submitFormDialog = document.querySelector("#submitForm");

// check if at least 1 seat is selected and the required fields are filled
function checkRequiredFields() {
    if (nameInput.value && phoneNumberInput.value && Number(seatCount.textContent) > 0) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// Add input event listeners to the input fields
nameInput.addEventListener('input', checkRequiredFields);
phoneNumberInput.addEventListener('input', checkRequiredFields);


//how the dialog when the form is submitted
function handleSubmit(event) {
    event.preventDefault();
    submitFormDialog.showModal();
}

// submit button
form.addEventListener("submit", handleSubmit);

// get continue button in modal
const continueButton = document.querySelector('#submitForm button');

function refreshPage() {
  location.reload();
}

// refresh page upon successful submission
continueButton.addEventListener('click', refreshPage);

// event listener for seats-container
seats.addEventListener("click", (event) => {
    if (isSeatClicked(event)) {
        if (isSeatSelected(event)) {
            deselectSeat(event);
        } else {
            selectSeat(event);
        }
    }
});

smoothScroll(".buy-tickets");
