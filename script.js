function offerButton() {
    var button = document.getElementById("offerButton");
    button.innerHTML = 'No more offers at the moment';
    setTimeout(function () {
      button.innerHTML = 'See all Offers';
    }, 5000);
  }

// add a smooth scroll while taking the user to the purchase tickets section
function smoothScroll(className) {
    const elements = document.querySelectorAll(className);
    elements.forEach(element => {
      element.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = "#purchase-tickets";
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
  

smoothScroll('.buy-tickets');

