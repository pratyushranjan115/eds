document.getElementById('custom-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission from reloading the page
    
    // Example: Retrieve textarea values
    var textarea1Value = document.getElementById('textarea1').value;
    var textarea2Value = document.getElementById('textarea2').value;
    
    // Example: Log values to console
    console.log('Text Area 1:', textarea1Value);
    console.log('Text Area 2:', textarea2Value);
    
    // Example: Clear form fields after submission
    document.getElementById('textarea1').value = '';
    document.getElementById('textarea2').value = '';
    
    // Further logic: You can add code here to send form data to server, etc.
  });

  <form id="custom-form">
  <label htmlFor="textarea1">Text Area 1:</label><br />
  <textarea id="textarea1" name="textarea1" rows="4" cols="50"></textarea><br />
  
  <label htmlFor="textarea2">Text Area 2:</label><br />
  <textarea id="textarea2" name="textarea2" rows="4" cols="50"></textarea><br />
  
  <button id="submit-button" type="submit">Submit</button>
</form>
  