document.getElementById('submit-button').addEventListener('click', function(event) {
    event.preventDefault();
    
    // Get values from text areas
    var textarea1Value = document.getElementById('textarea1').value;
    var textarea2Value = document.getElementById('textarea2').value;
    
    // Handle form submission logic here (e.g., send data to backend)
    console.log('Text Area 1:', textarea1Value);
    console.log('Text Area 2:', textarea2Value);
    
    // Example: Reset form after submission
    document.getElementById('textarea1').value = '';
    document.getElementById('textarea2').value = '';
  });
  