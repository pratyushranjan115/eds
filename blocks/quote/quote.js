// Function to create and append form using JavaScript DOM
function createForm() {
  const form = document.createElement('form');
  form.name = 'myForm'; // Set form name
  form.action = '#'; // Set form action (replace '#' with actual action URL if needed)
  form.method = 'post'; // Set form method

  // Create label for Name input
  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Name:';
  form.appendChild(nameLabel);

  // Create input field for Name
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'fname';
  form.appendChild(nameInput);

  // Create submit button
  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.value = 'Submit';
  form.appendChild(submitBtn);

  // Add event listener for form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      alert('Form submitted successfully!');
      // Perform further actions like sending data to server
    }
  });

  // Append form to the document body or any desired container
  document.body.appendChild(form);
}

// Function to validate form
function validateForm() {
  let x = document.forms['myForm']['fname'].value;
  if (x === '') {
    alert('Name must be filled out');
    return false;
  }
  // You can add more validation logic as needed

  // Return true if all validations pass
  return true;
}

// Example usage
createForm(); // Call to create the form dynamically
