document.addEventListener('DOMContentLoaded', function() {
    const trackOrderForm = document.getElementById('trackOrderForm');
    const trackingResult = document.getElementById('trackingResult');
    const orderStatus = document.getElementById('orderStatus');
    const trackingSteps = document.getElementById('trackingSteps');
    const estimatedDelivery = document.getElementById('estimatedDelivery');
    const errorMessage = document.getElementById('errorMessage');

    trackOrderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const orderNumber = document.getElementById('orderNumber').value;
        const email = document.getElementById('email').value;

        // Simulate API call with a timeout
        setTimeout(() => {
            // Mock API response
            const orderData = {
                status: 'In Transit',
                steps: [
                    { name: 'Order Placed', completed: true },
                    { name: 'Order Processed', completed: true },
                    { name: 'Shipped', completed: true },
                    { name: 'In Transit', completed: false },
                    { name: 'Out for Delivery', completed: false },
                    { name: 'Delivered', completed: false }
                ],
                estimatedDelivery: '2024-03-15'
            };

            // Display tracking result
            trackingResult.style.display = 'block';
            errorMessage.style.display = 'none';
            orderStatus.textContent = orderData.status;

            // Add tracking steps
            orderData.steps.forEach((step, index) => {
                const stepElement = document.createElement('div');
                stepElement.className = `tracking-step ${step.completed ? 'completed' : ''} ${step.name === orderData.status ? 'current' : ''}`;
                stepElement.innerHTML = `
                    <div class="tracking-step-icon">
                        <i class="fas ${step.completed ? 'fa-check' : 'fa-circle'}"></i>
                    </div>
                    <span class="tracking-step-label">${step.name}</span>
                `;
                trackingSteps.appendChild(stepElement);
            });

            // Set estimated delivery date
            const deliveryDate = new Date(orderData.estimatedDelivery);
            estimatedDelivery.textContent = `Estimated Delivery: ${deliveryDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
        }, 1500); // Simulate a 1.5 second delay for the API call
    });
});