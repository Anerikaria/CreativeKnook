fetch('/nav.html')
  .then(response => response.text())
  .then(data => {
    const navContainer = document.getElementById('nav-container');
    navContainer.innerHTML = data;
  });

fetch('/footer.html')
  .then(response => response.text())
  .then(data => {
    const footerContainer = document.getElementById('footer-container');
    footerContainer.innerHTML = data;
  });