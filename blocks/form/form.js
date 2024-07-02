export default function decorate(block) {
  // Create the form elements
  const form = document.createElement("form");
  form.id = "myForm";

  const title = document.createElement("h1");
  title.textContent = "The input element";
  form.appendChild(title);

  const labelFname = document.createElement("label");
  labelFname.setAttribute("for", "fname");
  labelFname.textContent = "First name:";
  form.appendChild(labelFname);

  const inputFname = document.createElement("input");
  inputFname.type = "text";
  inputFname.id = "fname";
  inputFname.name = "fname";
  form.appendChild(inputFname);

  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));

  const labelLname = document.createElement("label");
  labelLname.setAttribute("for", "lname");
  labelLname.textContent = "Last name:";
  form.appendChild(labelLname);

  const inputLname = document.createElement("input");
  inputLname.type = "text";
  inputLname.id = "lname";
  inputLname.name = "lname";
  form.appendChild(inputLname);

  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));

  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Submit";
  form.appendChild(submitButton);

  const instruction = document.createElement("p");
  instruction.textContent = 'Click the "Submit" button and the form-data will be sent via an AJAX call.';
  form.appendChild(instruction);

  const responseDiv = document.createElement("div");
  responseDiv.id = "response";
  form.appendChild(responseDiv);

  // Add the form to the block
  block.appendChild(form);

  // Handle form submission
  form.onsubmit = function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const xhr = new XMLHttpRequest();
    const url = "https://jsonplaceholder.typicode.com/posts"; // Test API endpoint

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 201) {
        // Status 201 indicates successful creation
        const json = JSON.parse(xhr.responseText);
        responseDiv.innerHTML = `
          <p>Form submitted successfully!</p>
          <p>Response ID: ${json.id}</p>
          <p>First Name: ${json.fname}</p>
          <p>Last Name: ${json.lname}</p>`;
      }
    };

    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;

    const data = JSON.stringify({
      fname: fname,
      lname: lname,
    });

    xhr.send(data);
  };
}
