export default function decorate(block) {
    // Function to extract content from the block
    function getTeaserContent() {
      const [bg, fg] = block.children;
  
      const backgroundImage = bg.querySelector('img')?.src || "";
      const backgroundImageAlt = bg.querySelector('img')?.alt || "";
      const pretitle = fg.querySelector('.pretitle')?.textContent?.trim() || "";
      const title = fg.querySelector('.title')?.textContent?.trim() || "";
      const titleType = fg.querySelector('.title').nodeName.toLowerCase() || "h3";
      const description = fg.querySelector('.description')?.innerHTML || "";
  
      return {
        backgroundImage,
        backgroundImageAlt,
        pretitle,
        title,
        titleType,
        description,
      };
    }
  
    // Get content from the block
    const teaserContent = getTeaserContent();
  
    // Construct the teaser HTML
    const teaserHtml = `
      <div class="bg">
        ${teaserContent.backgroundImage ? `<img src="${teaserContent.backgroundImage}" alt="${teaserContent.backgroundImageAlt}">` : ""}
      </div>
      <div class="fg">
        ${teaserContent.pretitle ? `<div class="pretitle">${teaserContent.pretitle}</div>` : ""}
        ${teaserContent.title ? `<${teaserContent.titleType} class="title">${teaserContent.title}</${teaserContent.titleType}>` : ""}
        ${teaserContent.description ? `<div class="description">${teaserContent.description}</div>` : ""}
      </div>
    `;
  
    // Replace the block's HTML with the constructed teaser HTML
    block.innerHTML = teaserHtml;
  }
  
  // Initialize the decoration on DOM content loaded
  document.addEventListener("DOMContentLoaded", () => {
    const blocks = document.querySelectorAll(".teaser"); // Replace with the actual block class name if different
    blocks.forEach(decorate);
  });
  