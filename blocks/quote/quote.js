document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');
  
  // Create form elements
  const form = document.createElement('form');
  form.id = 'ajaxForm';

  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'name');
  nameLabel.textContent = 'Name:';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'name';
  nameInput.name = 'name';
  nameInput.required = true;

  const emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', 'email');
  emailLabel.textContent = 'Email:';

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'email';
  emailInput.name = 'email';
  emailInput.required = true;

  const submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.value = 'Submit';

  const resultDiv = document.createElement('div');
  resultDiv.id = 'result';

  // Append elements to form
  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(document.createElement('br'));
  form.appendChild(emailLabel);
  form.appendChild(emailInput);
  form.appendChild(document.createElement('br'));
  form.appendChild(submitButton);

  // Append form and resultDiv to body
  document.body.appendChild(form);
  document.body.appendChild(resultDiv);

  console.log('Form and result div appended to the body');

  // Add event listener for form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    console.log('Form submitted');

    // Get form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'YOUR_API_ENDPOINT_HERE', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    // Define a callback function to handle the response
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log('Success:', xhr.responseText);
          resultDiv.innerHTML = 'Success: ' + xhr.responseText;
        } else {
          console.log('Error:', xhr.status, xhr.statusText);
          resultDiv.innerHTML = 'Error: ' + xhr.status + ' ' + xhr.statusText;
        }
      }
    };

    console.log('Sending request');
    xhr.send(JSON.stringify(data));
  });
});
