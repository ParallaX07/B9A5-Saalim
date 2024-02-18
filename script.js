function offerButton() {
    var button = document.getElementById('offerButton');
    button.innerHTML = 'No more offers at the moment';
    setTimeout(function() {
      button.innerHTML = 'Click me';
    }, 5000);
  }