export default function decorate(block) {
  const [quoteWrapper] = block.children;

  const blockquote = document.createElement('blockquote');
  blockquote.textContent = quoteWrapper.textContent.trim();

  // Create a cite element
  const cite = document.createElement('cite');
  cite.textContent = "— Author Name";  // Replace with actual author/source

  // Append cite to blockquote
  blockquote.appendChild(cite);

  // Add a class for styling purposes
  blockquote.className = 'custom-blockquote';
  
  // Replace quoteWrapper children with the new blockquote
  quoteWrapper.replaceChildren(blockquote);
}

document.addEventListener('DOMContentLoaded', function() {
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
  form.appendChild(document.createElement('br'));
  form.appendChild(emailLabel);
  form.appendChild(emailInput);
  form.appendChild(document.createElement('br'));
  form.appendChild(document.createElement('br'));
  form.appendChild(submitButton);

  // Append form and resultDiv to body
  document.body.appendChild(form);
  document.body.appendChild(resultDiv);

  // Add event listener for form submission
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

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
                  resultDiv.innerHTML = 'Success: ' + xhr.responseText;
              } else {
                  resultDiv.innerHTML = 'Error: ' + xhr.status;
              }
          }
      };

      // Send the request with the form data
      xhr.send(JSON.stringify(data));
  });

  // Example usage of decorate function
  const block = document.createElement('div');
  const quoteWrapper = document.createElement('div');
  quoteWrapper.textContent = 'This is a quote';
  block.appendChild(quoteWrapper);
  decorate(block);
  document.body.appendChild(block);
});
