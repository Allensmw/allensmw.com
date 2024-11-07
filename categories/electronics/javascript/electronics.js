
    // Fetch and populate Featured Products with animation
    const featuredProductsContainer = document.getElementById('product-list');

    /*
    <p class="card-text">${product.brand} - ${product.category}</p>
    */

    fetch('../../productPage/products.json')
    .then(response => response.json())
    .then(data => {
        data.productDetails
            .filter(product => product.tag === "electronics")  // Filter for electronics products
            .forEach((product, index) => {
                const productCard = `
                    <div class="col-md-4 mb-4">
                        <div class="card product-card h-100">
                            <img src="../../${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${product.name}</h5>
                                <div class="d-flex justify-content-between align-items-center mt-auto">
                                    <span class="product-price fs-5">MWK${product.price.toLocaleString()}</span>
                                    <div>
                                        <i class="fas fa-star text-warning"></i>
                                        <span>${product.rating}</span>
                                    </div>
                                </div>
                                <button class="btn btn-primary mt-3">
                                    <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                featuredProductsContainer.innerHTML += productCard;
            });
    })
    .catch(error => console.error('Error fetching featured products:', error));

// Function to filter products
function filterProducts() {
    const priceRange = document.getElementById('priceRange').value;
    const brandFilters = Array.from(document.querySelectorAll('.filter-checkbox[data-filter="brand"]:checked')).map(cb => cb.value);
    const categoryFilters = Array.from(document.querySelectorAll('.filter-checkbox[data-filter="category"]:checked')).map(cb => cb.value);

    const filteredProducts = products.filter(product => {
        const priceMatch = product.price <= priceRange;
        const brandMatch = brandFilters.length === 0 || brandFilters.includes(product.brand);
        const categoryMatch = categoryFilters.length === 0 || categoryFilters.includes(product.category);
        return priceMatch && brandMatch && categoryMatch;
    });

    const productList = document.getElementById('product-list');
    productList.innerHTML = filteredProducts.map(createProductCard).join('');
}

// Populate product list initially
filterProducts();

// Add event listeners to filters
document.getElementById('priceRange').addEventListener('input', (e) => {
    document.getElementById('priceRangeValue').textContent = `MWK0 - MWK${e.target.value}`;
    filterProducts();
});

document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
});