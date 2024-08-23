// script.js

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Authenticate the user with the backend
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Login successful!');
        document.getElementById('login').style.display = 'none';
        document.getElementById('report').style.display = 'block';
        document.getElementById('map').style.display = 'block';
        document.getElementById('discuss').style.display = 'block';
        document.getElementById('nav-login').style.display = 'none';
        document.getElementById('nav-logout').style.display = 'inline';
      } else {
        alert('Invalid username or password');
      }
    });
  });
  
  // Handle logout
  document.getElementById('nav-logout').addEventListener('click', function (event) {
    event.preventDefault();
  
    // Log out the user
    fetch('http://127.0.0.1:5000/logout', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Logged out successfully!');
        document.getElementById('login').style.display = 'block';
        document.getElementById('report').style.display = 'none';
        document.getElementById('map').style.display = 'none';
        document.getElementById('discuss').style.display = 'none';
        document.getElementById('nav-login').style.display = 'inline';
        document.getElementById('nav-logout').style.display = 'none';
      }
    });
  });
  
  // Show/hide sections based on navigation
  document.getElementById('nav-report').addEventListener('click', function () {
    document.getElementById('report').style.display = 'block';
    document.getElementById('map').style.display = 'none';
    document.getElementById('discuss').style.display = 'none';
  });
  
  document.getElementById('nav-map').addEventListener('click', function () {
    document.getElementById('report').style.display = 'none';
    document.getElementById('map').style.display = 'block';
    document.getElementById('discuss').style.display = 'none';
  });
  
  document.getElementById('nav-discuss').addEventListener('click', function () {
    document.getElementById('report').style.display = 'none';
    document.getElementById('map').style.display = 'none';
    document.getElementById('discuss').style.display = 'block';
  });
  
