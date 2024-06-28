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
