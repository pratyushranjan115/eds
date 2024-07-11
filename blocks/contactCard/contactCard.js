export default function decorate(block) {
    async function authenticateUser() {
        // Step 1: Enter MSPIN
        const mspin = prompt("Please enter your MSPIN:");

        // Call the first API to get OTP
        const otpResponse = await fetch('https://sitecoreuat-fmp-cd.azurewebsites.net/api/sitecore/FmpDealerAPI/DealerVarifyOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mspin, channel: "NX" })
        });

        const otpResult = await otpResponse.json();

        if (otpResult.status !== "Success") {
            alert(`Error: ${otpResult.message}`);
            return null;
        }

        alert(otpResult.message); // OTP sent successfully

        // Step 2: Enter OTP
        const otp = prompt("Please enter the OTP:");

        // Call the second API to verify OTP and get user details
        const verifyResponse = await fetch('https://sitecoreuat-fmp-cd.azurewebsites.net/api/sitecore/FmpDealerAPI/DealerVarifyOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ otp, mspin, channel: "NX" })
        });

        const verifyResult = await verifyResponse.json();

        if (verifyResult.status !== "Success") {
            alert(`Error: ${verifyResult.message}`);
            return null;
        }

        return verifyResult; // Return user details
    }

    async function initializeContactCard() {
        const userData = await authenticateUser();

        if (!userData) {
            return; // Exit if authentication fails
        }

        const { name, designation, city_name, state_name } = userData;

        function createContactCard() {
            const contactCard = document.createElement('div');
            contactCard.className = 'contact-card';
            contactCard.innerHTML = `
                <div class="contact-content">
                    <img src="https://via.placeholder.com/150" alt="${name}">
                    <h2>${name}</h2>
                    <p class="post">${designation}</p>
                    <p class="address">${city_name}, ${state_name}</p>
                </div>
            `;
            return contactCard;
        }

        const contactCard = createContactCard();

        block.innerHTML = '';
        block.appendChild(contactCard);
    }

    initializeContactCard();
}
