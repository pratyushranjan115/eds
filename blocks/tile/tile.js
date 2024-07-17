export default function decorate(block) {
    const [...tileEl] = block.children;
    const tiles = tileEl.map((item) => {
      const currentElement = item?.firstElementChild;
      if (
        currentElement
        && currentElement.childNodes.length > 0
        && currentElement !== undefined
      ) {
        return currentElement;
      }
      return null;
    });
  
    const filteredTiles = tiles.filter((tile) => tile);
  
    // Destructuring all the filtered elements
    const [
      backgroundImg,
      richText,
      selectOption,
      link,
      tab1,
      backgroundImgTab1,
      titleTab1,
      linkTab1,
      tab2,
      backgroundImgTab2,
      titleTab2,
      linkTab2
    ] = filteredTiles;
  
    // Creating HTML structure for the Tile Component
    const newHtml = `
      <div class="tile-component">
        ${backgroundImg ? `<div class="tile-background" style="background-image: url('${backgroundImg.querySelector('picture img').src}');"></div>` : ''}
        <div class="tile-content">
          ${richText ? richText.innerHTML : ''}
          ${selectOption ? `<select class="select-option">${selectOption.innerHTML}</select>` : ''}
          ${selectOption?.innerText === 'option1' && link ? `<a href="${link.innerText}" class="tile-link" target="_self">Link</a>` : ''}
          ${selectOption?.innerText === 'option2' ? `
            <div class="tab-content">
              ${tab1 ? `<div class="tab1-content">${tab1.innerHTML}</div>` : ''}
              ${backgroundImgTab1 ? `<div class="background-img-tab1" style="background-image: url('${backgroundImgTab1.querySelector('picture img').src}');"></div>` : ''}
              ${titleTab1 ? `<div class="title-tab1">${titleTab1.innerText}</div>` : ''}
              ${linkTab1 ? `<a href="${linkTab1.innerText}" class="tile-link" target="_self">Link</a>` : ''}
              ${tab2 ? `<div class="tab2-content">${tab2.innerHTML}</div>` : ''}
              ${backgroundImgTab2 ? `<div class="background-img-tab2" style="background-image: url('${backgroundImgTab2.querySelector('picture img').src}');"></div>` : ''}
              ${titleTab2 ? `<div class="title-tab2">${titleTab2.innerText}</div>` : ''}
              ${linkTab2 ? `<a href="${linkTab2.innerText}" class="tile-link" target="_self">Link</a>` : ''}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  
    block.innerHTML = '';
    block.insertAdjacentHTML('beforeend', utility.sanitizeHtml(newHtml));
  
    // Handle Select Option
    const selectElement = document.querySelector('.select-option');
    selectElement?.addEventListener('change', (event) => {
      const selectedValue = event.target.value;
  
      if (selectedValue === 'option1') {
        document.querySelector('.tile-link')?.setAttribute('target', '_self');
      } else if (selectedValue === 'option2') {
        // Show tab content for option2
        document.querySelector('.tab-content')?.classList.add('show');
      }
    });
  
    // Optional: Add any additional JavaScript logic for your component here
  }
  