export default function decorate(block) {
    function getContactCardData(block) {
        const [imageContainer, nameEl, postEl, addressEl] = block.children;
        const imageEl = imageContainer?.querySelector('img');
        const imageSrc = imageEl?.src || 'https://via.placeholder.com/150';
        const name = nameEl?.textContent?.trim() || 'Default Name';
        const post = postEl?.textContent?.trim() || 'Default Post';
        const address = addressEl?.textContent?.trim() || 'Default Address';

        return { imageSrc, name, post, address };
    }

    const { imageSrc, name, post, address } = getContactCardData(block);

    function createContactCard() {
        const contactCard = document.createElement('div');
        contactCard.className = 'contact-card';
        contactCard.innerHTML = `
            <div class="contact-content">
                <img src="${imageSrc}" alt="${name}">
                <h2>${name}</h2>
                <p class="post">${post}</p>
                <p class="address">${address}</p>
            </div>
        `;
        return contactCard;
    }

    const contactCard = createContactCard();

    block.innerHTML = '';
    block.appendChild(contactCard);
}
