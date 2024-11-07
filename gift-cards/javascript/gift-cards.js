document.addEventListener('DOMContentLoaded', function() {
    const giftCardOptions = document.getElementById('giftCardOptions');
    const customAmountInput = document.getElementById('customAmountInput');
    const customAmount = document.getElementById('customAmount');
    const purchaseForm = document.getElementById('purchaseForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    let selectedAmount = null;

    giftCardOptions.addEventListener('click', function(e) {
        const clickedCard = e.target.closest('.gift-card');
        if (clickedCard) {
            const amount = clickedCard.dataset.amount;
            selectGiftCard(clickedCard, amount);
        }
    });

    function selectGiftCard(card, amount) {
        document.querySelectorAll('.gift-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedAmount = amount;

        if (amount === 'custom') {
            customAmountInput.style.display = 'block';
            purchaseForm.style.display = 'none';
        } else {
            customAmountInput.style.display = 'none';
            purchaseForm.style.display = 'block';
        }
    }

    customAmount.addEventListener('input', function() {
        if (this.value >= 10 && this.value <= 500) {
            selectedAmount = this.value;
            purchaseForm.style.display = 'block';
        } else {
            purchaseForm.style.display = 'none';
        }
    });

    purchaseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const recipientName = document.getElementById('recipientName').value;
        const recipientEmail = document.getElementById('recipientEmail').value;
        const message = document.getElementById('message').value;

        // Simulate purchase process
        setTimeout(() => {
            confirmationMessage.innerHTML = `
                <h4>Thank you for your purchase!</h4>
                <p>A gift card worth $${selectedAmount} has been sent to ${recipientEmail}.</p>
                <p>Recipient: ${recipientName}</p>
                ${message ? `<p>Your message: "${message}"</p>` : ''}
                <p>The recipient will receive an email with instructions on how to redeem the gift card.</p>
            `;
            confirmationMessage.style.display = 'block';
            purchaseForm.reset();
            purchaseForm.style.display = 'none';
            document.querySelectorAll('.gift-card').forEach(c => c.classList.remove('selected'));
        }, 1500);
    });
});