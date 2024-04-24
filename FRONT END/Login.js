+ function ($) {
  // Existing code for input focus and blur handling
  $('.palceholder').click(function () {
    $(this).siblings('input').focus();
  });

  $('.form-control').focus(function () {
    $(this).parent().addClass("focused");
  });

  $('.form-control').blur(function () {
    var $this = $(this);
    if ($this.val().length == 0)
      $(this).parent().removeClass("focused");
  });

  $('.form-control').blur();

  // Backend validation
  // $('#formvalidate').submit(function (event) {
  //   event.preventDefault(); // Prevent form submission

  //   // Get username and password from form
  //   var userName = $('#userName').val();
  //   var userPassword = $('#userPassword').val();

  //   // Make AJAX request to backend for authentication
  //   $.ajax({
  //     type: 'POST',
  //     url: 'backend_endpoint_url', // Replace with your backend endpoint URL
  //     data: {
  //       userName: userName,
  //       userPassword: userPassword
  //     },
  //     success: function (response) {
  //       sessionStorage.setItem('username', userName);
  //       console.log('Authentication successful');
  //       alert('Authentication successful');

  //       // Redirect user to Dashboard.html upon successful authentication
  //       window.location.href = 'Dashboard.html';
  //     },
  //     error: function (xhr, status, error) {
  //       // Handle error response from backend
  //       console.error('Authentication failed:', error);
  //       alert('Authentication failed. Please try again.');
  //       // Optionally display error message to user or perform further actions
  //     }
  //   });
  // });
  // Backend validation
  // Simulate backend validation
  $('#formvalidate').submit(function (event) {
    event.preventDefault(); // Prevent form submission

    // Get username and password from form
    var userName = $('#userName').val();
    var userPassword = $('#userPassword').val();


    if (userName === 'admin' && userPassword === 'admin') {
      // Simulated successful authentication
      sessionStorage.setItem('username', userName);
      console.log('Authentication successful');
      alert('Authentication successful');

      // Redirect user to Dashboard.html upon successful authentication
      window.location.href = 'Dashboard.html';
    } else {
      // Simulated authentication failure
      console.error('Authentication failed');
      alert('Authentication failed. Please check your username and password.');
    }
  });


}(jQuery);
