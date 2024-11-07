// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth reveal animations for elements as they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply to all sections and cards
document.querySelectorAll('section, .product-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Enhanced loading screen
window.addEventListener('load', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
    }, 500);
});

// Fetch and populate Featured Products with animation
const featuredProductsContainer = document.getElementById('featured-products');

fetch('productPage/products.json')
    .then(response => response.json())
    .then(data => {
        data.productDetails.forEach((product, index) => {
            const productCard = `
                <div class="col-md-3 mb-4">
                    <a href="productPage/productPage.html?id=${product.id}" class="text-decoration-none">
                        <div class="card product-card h-100 animate__animated animate__fadeIn" style="animation-delay: ${index * 0.2}s">
                            <div class="position-relative overflow-hidden">
                                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                                <div class="position-absolute top-0 start-0 m-3">
                                    <span class="badge bg-primary">New</span>
                                </div>
                            </div>
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
                    </a>
                </div>
            `;
            featuredProductsContainer.innerHTML += productCard;
        });
    })
    .catch(error => console.error('Error fetching featured products:', error));

// Side menu functionality
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');
const categoriesToggle = document.getElementById('categoriesToggle');
const categoriesSubmenu = document.getElementById('categoriesSubmenu');

menuToggle.addEventListener('click', () => {
    sideMenu.classList.add('open');
    overlay.style.display = 'block';
});

closeMenu.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    overlay.style.display = 'none';
});

categoriesToggle.addEventListener('click', () => {
    categoriesSubmenu.classList.toggle('hidden');
});
