// Function to create form elements dynamically
function createForm() {
    var form = document.createElement('form');
    form.id = 'custom-form';
  
    var label1 = document.createElement('label');
    label1.setAttribute('for', 'textarea1');
    label1.textContent = 'Text Area 1:';
    form.appendChild(label1);
  
    var textarea1 = document.createElement('textarea');
    textarea1.id = 'textarea1';
    textarea1.name = 'textarea1';
    textarea1.rows = '4';
    textarea1.cols = '50';
    form.appendChild(textarea1);
    form.appendChild(document.createElement('br'));
  
    var label2 = document.createElement('label');
    label2.setAttribute('for', 'textarea2');
    label2.textContent = 'Text Area 2:';
    form.appendChild(label2);
  
    var textarea2 = document.createElement('textarea');
    textarea2.id = 'textarea2';
    textarea2.name = 'textarea2';
    textarea2.rows = '4';
    textarea2.cols = '50';
    form.appendChild(textarea2);
    form.appendChild(document.createElement('br'));
  
    var submitButton = document.createElement('button');
    submitButton.id = 'submit-button';
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    form.appendChild(submitButton);
  
    return form;
  }
  
  // Function to handle form submission via AJAX
  function submitForm() {
    var textarea1Value = document.getElementById('textarea1').value;
    var textarea2Value = document.getElementById('textarea2').value;
  
    var formData = new FormData();
    formData.append('textarea1', textarea1Value);
    formData.append('textarea2', textarea2Value);
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.example.com/submit', true);
  
    xhr.onload = function() {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        document.getElementById('response').textContent = 'Response: ' + response.message;
      } else {
        document.getElementById('response').textContent = 'Error: ' + xhr.statusText;
      }
    };
  
    xhr.onerror = function() {
      document.getElementById('response').textContent = 'Network Error';
    };
  
    xhr.send(formData);
  
    document.getElementById('textarea1').value = '';
    document.getElementById('textarea2').value = '';
  }
  
  // Main entry point - append form and handle submission
  window.onload = function() {
    var form = createForm();
    document.body.appendChild(form);
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      submitForm();
    });
  };
  