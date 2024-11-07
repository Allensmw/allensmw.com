let products = [];
        let filteredProducts = [];

        // Get the query parameter from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('query')?.toLowerCase() || '';

        // Function to render product cards
        function renderProducts(productsToRender) {
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = productsToRender.map(product => `
                <div class="col">
                    <div class="product-card card h-100">
                        <a href="../productPage/productPage.html?id=${product.id}" class="text-decoration-none">
                            <img src="${product.image[0]}" class="card-img-top" alt="${product.name}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description.substring(0, 50)}...</p>
                                <div class="mt-auto">
                                    <p class="price mb-2">${product.currency} ${product.price.toLocaleString()}</p>
                                    <p class="mb-2">
                                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                                        <span class="ms-1">${product.rating.toFixed(1)}</span>
                                    </p>
                                    <button class="btn btn-primary w-100">Add to Cart</button>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            `).join('');
        }

        // Function to filter and sort products
        function filterAndSortProducts() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const maxPrice = parseInt(document.getElementById('priceRange').value);
            const rating4 = document.getElementById('rating4').checked;
            const rating3 = document.getElementById('rating3').checked;
            const sortBy = document.getElementById('sortSelect').value;

            filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) &&
                product.price <= maxPrice &&
                ((!rating4 && !rating3) || (rating4 && product.rating >= 4) || (rating3 && product.rating >= 3))
            );

            // Sort products
            switch(sortBy) {
                case 'price-low-high':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high-low':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    filteredProducts.sort((a, b) => b.rating - a.rating);
                    break;
                // 'relevance' is default, no sorting needed
            }

            renderProducts(filteredProducts);
        }

        // Event listeners
        document.getElementById('searchInput').addEventListener('input', filterAndSortProducts);
        document.getElementById('filterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            filterAndSortProducts();
        });
        document.getElementById('sortSelect').addEventListener('change', filterAndSortProducts);
        document.getElementById('priceRange').addEventListener('input', (e) => {
            document.getElementById('priceValue').textContent = `MWK ${e.target.value}`;
            filterAndSortProducts();
        });
        document.getElementById('rating4').addEventListener('change', filterAndSortProducts);
        document.getElementById('rating3').addEventListener('change', filterAndSortProducts);

        // Fetch products from JSON file
        fetch('../productPage/products.json')
            .then(response => response.json())
            .then(data => {
                products = data.productDetails;
                // Set max price range based on the highest product price
                const maxPrice = Math.max(...products.map(p => p.price));
                const priceRange = document.getElementById('priceRange');
                priceRange.max = maxPrice;
                priceRange.value = maxPrice;
                document.getElementById('priceValue').textContent = `MWK ${maxPrice}`;

                // Initial render based on query
                if (query) {
                    document.getElementById('searchInput').value = query;
                }
                filterAndSortProducts();
            })
            .catch(error => console.error('Error loading products:', error));