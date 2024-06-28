document.getElementById('custom-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission from reloading the page
    
    // Retrieve textarea values
    var textarea1Value = document.getElementById('textarea1').value;
    var textarea2Value = document.getElementById('textarea2').value;
    
    // Prepare data to send via AJAX
    var formData = new FormData();
    formData.append('textarea1', textarea1Value);
    formData.append('textarea2', textarea2Value);
    
    // AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.example.com/submit', true);
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Handle success response
        var response = JSON.parse(xhr.responseText);
        document.getElementById('response').textContent = 'Response: ' + response.message;
      } else {
        // Handle error
        document.getElementById('response').textContent = 'Error: ' + xhr.statusText;
      }
    };
    
    xhr.onerror = function() {
      // Handle network errors
      document.getElementById('response').textContent = 'Network Error';
    };
    
    xhr.send(formData);
    
    // Clear form fields after submission
    document.getElementById('textarea1').value = '';
    document.getElementById('textarea2').value = '';
  });
  