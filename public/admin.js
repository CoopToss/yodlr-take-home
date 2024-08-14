$(document).ready(function() {
    // Fetch users from the server
    function fetchUsers() {
      $.ajax({
        type: 'GET',
        url: '/users',
        success: function(users) {
          const usersTable = $('#usersTable tbody');
          usersTable.empty(); // Clear any existing data
  
          users.forEach(user => {
            usersTable.append(`
              <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.state}</td>
                <td>
                  <button class="btn btn-danger btn-sm delete-user" data-id="${user.id}">Delete</button>
                  <button class="btn btn-success btn-sm activate-user" data-id="${user.id}">Activate</button>
                </td>
              </tr>
            `);
          });
  
          // Attach event listeners for delete and activate buttons
          $('.delete-user').click(deleteUser);
          $('.activate-user').click(activateUser);
        },
        error: function(error) {
          console.error('Error:', error);
          alert('Failed to fetch users.');
        }
      });
    }
  
    // Delete a user
    function deleteUser() {
      const userId = $(this).data('id');
      $.ajax({
        type: 'DELETE',
        url: `/users/${userId}`,
        success: function() {
          alert('User deleted successfully!');
          fetchUsers(); // Refresh the user list
        },
        error: function(error) {
          console.error('Error:', error);
          alert('Failed to delete user.');
        }
      });
    }
  
    // Activate a user
    function activateUser() {
      const userId = $(this).data('id');
      $.ajax({
        type: 'GET',
        url: `/users/${userId}`,
        success: function(user) {
          user.state = 'active';
          $.ajax({
            type: 'PUT',
            url: `/users/${userId}`,
            contentType: 'application/json',
            data: JSON.stringify(user),
            success: function() {
              alert('User activated successfully!');
              fetchUsers(); // Refresh the user list
            },
            error: function(error) {
              console.error('Error:', error);
              alert('Failed to activate user.');
            }
          });
        },
        error: function(error) {
          console.error('Error:', error);
          alert('Failed to fetch user details.');
        }
      });
    }
  
    // Initially fetch and display users
    fetchUsers();
  });
  