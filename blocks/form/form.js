export default function decorate(block) {
  // Create the form elements
  const form = document.createElement("form");
  form.id = "customForm";
 
  const title = document.createElement("h1");
  title.textContent = "Custom Form";
  form.appendChild(title);
 
  const labelTextarea1 = document.createElement("label");
  labelTextarea1.setAttribute("for", "textarea1");
  labelTextarea1.textContent = "Text Area 1:";
  form.appendChild(labelTextarea1);
 
  const textarea1 = document.createElement("textarea");
  textarea1.id = "textarea1";
  textarea1.name = "textarea1";
  form.appendChild(textarea1);
 
  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));
 
  const labelTextarea2 = document.createElement("label");
  labelTextarea2.setAttribute("for", "textarea2");
  labelTextarea2.textContent = "Text Area 2:";
  form.appendChild(labelTextarea2);
 
  const textarea2 = document.createElement("textarea");
  textarea2.id = "textarea2";
  textarea2.name = "textarea2";
  form.appendChild(textarea2);
 
  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));
 
  const labelLink = document.createElement("label");
  labelLink.setAttribute("for", "link");
  labelLink.textContent = "Link:";
  form.appendChild(labelLink);
 
  const inputLink = document.createElement("input");
  inputLink.type = "text";
  inputLink.id = "link";
  inputLink.name = "link";
  form.appendChild(inputLink);
 
  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));
 
  const labelText = document.createElement("label");
  labelText.setAttribute("for", "text");
  labelText.textContent = "Text:";
  form.appendChild(labelText);
 
  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = "text";
  inputText.name = "text";
  form.appendChild(inputText);
 
  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));
 
  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Submit";
  form.appendChild(submitButton);
 
  const instruction = document.createElement("p");
  instruction.textContent =
    'Click the "Submit" button and the form-data will be sent via an AJAX call.';
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
          <p>Text Area 1: ${json.textarea1}</p>
          <p>Text Area 2: ${json.textarea2}</p>
          <p>Link: ${json.link}</p>
          <p>Text: ${json.text}</p>`;
      }
    };
 
    const textarea1Value = document.getElementById("textarea1").value;
    const textarea2Value = document.getElementById("textarea2").value;
    const linkValue = document.getElementById("link").value;
    const textValue = document.getElementById("text").value;
 
    const data = JSON.stringify({
      textarea1: textarea1Value,
      textarea2: textarea2Value,
      link: linkValue,
      text: textValue,
    });
 
    xhr.send(data);
  };
}
