$(document).ready(function() {
    $('#registrationForm').on('submit', function(e) {
      e.preventDefault();
  
      const user = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        state: $('#state').val()
      };
  
      $.ajax({
        type: 'POST',
        url: '/users',
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function(response) {
          alert('User registered successfully!');
          $('#registrationForm')[0].reset(); // Clear the form
        },
        error: function(error) {
          console.error('Error:', error);
          alert('Failed to register user.');
        }
      });
    });
  });
  