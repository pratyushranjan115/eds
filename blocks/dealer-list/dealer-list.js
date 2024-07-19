import utility from '../../utility/utility.js';
export default function decorate(block) {


console.log(block);


  const [...dealerListEl]=block.children;
   console.log(dealerListEl);
  
  const dealersHTML = dealerListEl.map((dealer) => {
    const image = dealer.querySelector('picture');
    
    const title = dealer.querySelector('p')?.textContent?.trim() || '';
    const href = dealer.querySelector('a')?.href || '';

    if (image) {
      const img = image.querySelector('img');
      img.removeAttribute('width');
      img.removeAttribute('height');
  }

   
  }).join('');

 
    const newHtml= `<div class="row">
    <div class="col-sm-12">
        <ul class="dealer-menu">
               ${dealersHTML}
        </ul>
    </div>
</div>
</div>`
    block.innerHTML = '';
    block.insertAdjacentHTML('beforeend', utility.sanitizeHtml(newHtml));

  

  // Any additional logic (like slider initialization) can be added here
}
