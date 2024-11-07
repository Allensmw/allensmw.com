// Sample data (replace with actual data from your backend)
const orders = [
    { id: '12345', date: 'March 15, 2024', status: 'Delivered', total: 'MWK 240,000' },
    { id: '12346', date: 'February 28, 2024', status: 'Shipped', total: 'MWK 65,500' },
    { id: '12347', date: 'January 10, 2024', status: 'Delivered', total: 'MWK 167,900' }
];

let addresses = [
    { id: 1, name: 'Home', address: 'Lilongwe, Area 12, Street 15' },
    { id: 2, name: 'Work', address: 'Lilongwe, Allens, Office 670' }
];

// Function to toggle edit profile form
function toggleEditProfile() {
    const personalInfo = document.getElementById('personalInfo');
    const editProfileForm = document.getElementById('editProfileForm');
    const displayName = document.getElementById('displayName');
    const displayEmail = document.getElementById('displayEmail');
    const displayPhone = document.getElementById('displayPhone');
    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    const editPhone = document.getElementById('editPhone');

    if (personalInfo.style.display !== 'none') {
        personalInfo.style.display = 'none';
        editProfileForm.style.display = 'block';
        editName.value = displayName.textContent;
        editEmail.value = displayEmail.textContent;
        editPhone.value = displayPhone.textContent;
    } else {
        personalInfo.style.display = 'block';
        editProfileForm.style.display = 'none';
    }
}

// Function to update profile
function updateProfile(event) {
    event.preventDefault();
    const displayName = document.getElementById('displayName');
    const displayEmail = document.getElementById('displayEmail');
    const displayPhone = document.getElementById('displayPhone');
    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    const editPhone = document.getElementById('editPhone');

    displayName.textContent = editName.value;
    displayEmail.textContent = editEmail.value;
    displayPhone.textContent = editPhone.value;

    toggleEditProfile();
}

// Function to show order details
function showOrderDetails(orderId) {
    alert(`Showing details for order ${orderId}`);
    // Implement the logic to show order details (e.g., open a modal)
}

// Function to render order history
function renderOrderHistory() {
    const orderHistory = document.getElementById('orderHistory');
    orderHistory.innerHTML = orders.map(order => `
        <div class="order-item">
            <p><strong>Order #${order.id}</strong> - Placed on ${order.date}</p>
            <p>Status: ${order.status}</p>
            <p>Total: ${order.total}</p>
            <button class="btn btn-sm btn-outline-primary" onclick="showOrderDetails('${order.id}')">View Details</button>
        </div>
    `).join('');
}

// Function to show add address form
function showAddAddressForm() {
    document.getElementById('addAddressForm').style.display = 'block';
}

// Function to hide add address form
function hideAddAddressForm() {
    document.getElementById('addAddressForm').style.display = 'none';
}

// Function to add new address
function addNewAddress(event) {
    event.preventDefault();
    const newAddress = {
        id: addresses.length + 1,
        name: document.getElementById('newAddressName').value,
        address: `${document.getElementById('newAddressLine').value}, ${document.getElementById('newAddressCity').value}, ${document.getElementById('newAddressState').value} ${document.getElementById('newAddressZip').value}`
    };
    addresses.push(newAddress);
    renderSavedAddresses();
    hideAddAddressForm();
    event.target.reset();
}

// Function to edit address
function editAddress(id) {
    const address = addresses.find(a => a.id === id);
    if (address) {
        document.getElementById('newAddressName').value = address.name;
        const [line, city, stateZip] = address.address.split(', ');
        const [state, zip] = stateZip.split(' ');
        document.getElementById('newAddressLine').value = line;
        document.getElementById('newAddressCity').value = city;
        document.getElementById('newAddressState').value = state;
        document.getElementById('newAddressZip').value = zip;
        showAddAddressForm();
        // Remove the old address
        addresses = addresses.filter(a => a.id !== id);
    }
}

// Function to delete address
function deleteAddress(id) {
    addresses = addresses.filter(a => a.id !== id);
    renderSavedAddresses();
}

// Function to render saved addresses
function renderSavedAddresses() {
    const savedAddresses = document.getElementById('savedAddresses');
    savedAddresses.innerHTML = addresses.map(address => `
        <div class="address-item">
            <h3>${address.name}</h3>
            <p>${address.address}</p>
            <div class="address-actions">
                <button class="btn btn-sm btn-outline-primary" onclick="editAddress(${address.id})">Edit</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteAddress(${address.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Initial render
renderOrderHistory();
renderSavedAddresses();