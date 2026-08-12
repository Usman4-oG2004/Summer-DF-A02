/* ==========================================================================
   APEX PHONES - INTERACTIVE SCRIPT (script.js)
   Filtering, Sorting, Cart Counter & Quick View Modal Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const brandFilters = document.querySelectorAll('.brand-filter');
  const catFilters = document.querySelectorAll('.cat-filter');
  const priceSlider = document.getElementById('priceSlider');
  const priceValue = document.getElementById('priceValue');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const sortSelect = document.getElementById('sortSelect');
  const visibleCount = document.getElementById('visibleCount');
  const productsGrid = document.getElementById('productsGrid');
  const productCards = Array.from(document.querySelectorAll('.product-card'));
  
  const cartBtn = document.getElementById('cartBtn');
  const cartCount = document.getElementById('cartCount');
  let currentCartCount = 0;

  const quickViewModal = document.getElementById('quickViewModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalBrand = document.getElementById('modalBrand');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');

  function filterProducts() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedBrands = Array.from(brandFilters)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());
    const selectedCats = Array.from(catFilters)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());
    const maxPrice = priceSlider ? parseFloat(priceSlider.value) : 2000;

    let matchCount = 0;

    productCards.forEach(card => {
      const brand = card.dataset.brand ? card.dataset.brand.toLowerCase() : '';
      const category = card.dataset.category ? card.dataset.category.toLowerCase() : '';
      const price = parseFloat(card.dataset.price || '0');
      const title = card.querySelector('.product-title').textContent.toLowerCase();
      const specs = card.querySelector('.specs-chips').textContent.toLowerCase();

      const matchesSearch = title.includes(searchTerm) || specs.includes(searchTerm) || brand.includes(searchTerm);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
      const matchesCategory = selectedCats.length === 0 || selectedCats.includes(category);
      const matchesPrice = price <= maxPrice;

      if (matchesSearch && matchesBrand && matchesCategory && matchesPrice) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCount) visibleCount.textContent = matchCount;
  }

  if (searchInput) searchInput.addEventListener('input', filterProducts);
  brandFilters.forEach(cb => cb.addEventListener('change', filterProducts));
  catFilters.forEach(cb => cb.addEventListener('change', filterProducts));

  if (priceSlider && priceValue) {
    priceSlider.addEventListener('input', (e) => {
      priceValue.textContent = `$${parseInt(e.target.value).toLocaleString()}`;
      filterProducts();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      brandFilters.forEach(cb => cb.checked = true);
      catFilters.forEach(cb => cb.checked = true);
      if (priceSlider) {
        priceSlider.value = 2000;
        priceValue.textContent = '$2,000';
      }
      filterProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const value = sortSelect.value;
      const sortedCards = [...productCards];

      if (value === 'price-low') {
        sortedCards.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
      } else if (value === 'price-high') {
        sortedCards.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
      } else if (value === 'rating') {
        sortedCards.sort((a, b) => parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating));
      }

      sortedCards.forEach(card => productsGrid.appendChild(card));
    });
  }

  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCartCount++;
      if (cartCount) cartCount.textContent = currentCartCount;
      
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i class="fa-solid fa-check"></i> Added`;
      btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 1500);
    });
  });

  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      if (!card) return;

      const title = card.querySelector('.product-title').textContent;
      const brand = card.querySelector('.product-brand').textContent;
      const price = card.querySelector('.price-current').textContent;
      const img = card.querySelector('.product-image').src;

      if (modalImg) modalImg.src = img;
      if (modalBrand) modalBrand.textContent = brand;
      if (modalTitle) modalTitle.textContent = title;
      if (modalPrice) modalPrice.textContent = price;

      if (quickViewModal) quickViewModal.classList.add('active');
    });
  });

  if (modalCloseBtn && quickViewModal) {
    modalCloseBtn.addEventListener('click', () => {
      quickViewModal.classList.remove('active');
    });

    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) {
        quickViewModal.classList.remove('active');
      }
    });
  }
});
