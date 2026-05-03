document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Floating effect for hero images
  document.querySelectorAll('.hero-image img, .product-image img').forEach(img => {
    img.classList.add('float-anim');
  });

  // Countdown Timer
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    let time = 15 * 60; // 15 minutes
    const interval = setInterval(() => {
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      countdownEl.innerText = `${minutes}:${seconds}`;
      if (time > 0) time--;
      else clearInterval(interval);
    }, 1000);
  }

  // Exit Intent Popup
  const exitPopup = document.getElementById('exit-popup');
  const closePopup = document.querySelector('.close-popup');
  let hasShownPopup = false;

  if (exitPopup && closePopup) {
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY < 0 && !hasShownPopup) {
        exitPopup.classList.add('active');
        hasShownPopup = true;
      }
    });

    closePopup.addEventListener('click', () => {
      exitPopup.classList.remove('active');
    });

    exitPopup.addEventListener('click', (e) => {
      if (e.target === exitPopup) {
        exitPopup.classList.remove('active');
      }
    });
  }

  // Live Purchase Toast
  const toast = document.getElementById('live-toast');
  if (toast) {
    const names = ['Priya from Mumbai', 'Rahul from Delhi', 'Anjali from Bangalore', 'Karan from Pune', 'Neha from Jaipur', 'Ankit from Chandigarh'];
    const timeAgo = ['2 mins ago', 'Just now', '5 mins ago', '1 min ago', '3 mins ago'];

    setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomTime = timeAgo[Math.floor(Math.random() * timeAgo.length)];
      
      const nameEl = document.getElementById('toast-name');
      const timeEl = document.getElementById('toast-time');
      if (nameEl) nameEl.innerText = randomName;
      if (timeEl) timeEl.innerText = randomTime;

      toast.classList.add('show');

      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);

    }, 15000);
  }

  // Cart Drawer Logic
  const cartIcon = document.getElementById('cart-icon');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCart = document.getElementById('close-cart');
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn, .sticky-bar .btn-secondary');

  if (cartIcon && cartOverlay && closeCart) {
    const openCart = () => cartOverlay.classList.add('active');
    const closeCartFn = () => cartOverlay.classList.remove('active');

    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartFn);
    
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCartFn();
    });

    addToCartBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (window.location.pathname.includes('product.html') || window.location.pathname.includes('lp.html')) {
          e.preventDefault();
          openCart();
        }
      });
    });
  }

  // Stock Urgency Logic
  const stockEl = document.getElementById('stock-urgency');
  if (stockEl) {
    let stock = 7;
    setInterval(() => {
      if (Math.random() > 0.7 && stock > 3) {
        stock--;
        stockEl.innerText = `Only ${stock} units left in stock`;
      }
    }, 8000);
  }

  // Delivery Estimator
  const deliveryEl = document.getElementById('delivery-est');
  if (deliveryEl) {
    const today = new Date();
    const start = new Date();
    const end = new Date();
    start.setDate(today.getDate() + 5);
    end.setDate(today.getDate() + 7);
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const dateRange = `${start.toLocaleDateString('en-IN', options)} - ${end.toLocaleDateString('en-IN', options)}`;
    deliveryEl.innerText = `Get it by ${dateRange}`;
  }

  // Sticky Bar Scroll Logic
  const stickyBar = document.getElementById('sticky-bar');
  if (stickyBar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        stickyBar.classList.add('show');
      } else {
        stickyBar.classList.remove('show');
      }
    });
  }

  // Bundle Selection Logic
  window.selectBundle = (element) => {
    document.querySelectorAll('.bundle-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    const price = element.getAttribute('data-price');
    const mainPriceEl = document.getElementById('main-price');
    if (mainPriceEl) mainPriceEl.innerText = `₹${price}`;
    
    // Update sticky bar price too
    const stickyPriceEl = document.getElementById('sticky-price');
    if (stickyPriceEl) stickyPriceEl.innerText = `₹${price}`;
  };

  // WhatsApp Widget Toggle
  const waFloatBtn = document.getElementById('wa-float-btn');
  const waWidget = document.getElementById('wa-widget');
  
  if (waFloatBtn && waWidget) {
    waFloatBtn.addEventListener('click', () => {
      waWidget.classList.toggle('active');
    });

    // Close widget if clicked outside
    document.addEventListener('click', (e) => {
      if (!waFloatBtn.contains(e.target) && !waWidget.contains(e.target)) {
        waWidget.classList.remove('active');
      }
    });
  }

  window.openWhatsAppDirect = () => {
    const msg = encodeURIComponent("Hi, I want to order Glowify Serum");
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  // Original function for other buttons
  window.openWhatsApp = () => {
    if (waWidget) {
      waWidget.classList.add('active');
    } else {
      window.openWhatsAppDirect();
    }
  };
});
