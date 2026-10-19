/**
 * Hotel Wallflower - Main JavaScript
 * Handles navigation, mobile drawer, booking bar, modals, sliders, lightbox & WhatsApp integration
 */

document.addEventListener('DOMContentLoaded', () => {
  initLenisSmoothScroll();
  initMinimalNavigation();
  initStickyNavbar();
  initMobileNav();
  initBookingBarDates();
  initStickyBookingBar();
  initCountdownTimer();
  initReviewSlider();
  initModals();
  initGalleryLightbox();
  initToast();
  initScrollDrivenHero();
  initPinnedStorytellingSection();
  initFloatingPerspectiveShowcase();
  initRoomsGliderShowcase();
  initAtmosphereReveal();
  initStatementMaskReveal();
  initHomepageQuickBookForm();
  initRooms3DMotionframeSlider();
  initRedCarpetWelcomeAnimation();
  initMobileMotionSuite();
});

// Refresh ScrollTrigger when window loads, after images load, and on orientationchange
window.addEventListener('load', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    } else {
      ScrollTrigger.refresh();
    }
  }

  // Requirement 7: Call ScrollTrigger.refresh() after images load
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    if (img.complete) return;
    img.addEventListener('load', () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, { once: true });
  });
});

// Requirement 7: Call ScrollTrigger.refresh() on orientationchange
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }, 250);
});

/* (Lenis smooth scroll initialized conditionally below) */

/* ==========================================================================
   MINIMAL LUXURY NAVIGATION & KEYBOARD-ACCESSIBLE MOBILE MENU
   - Transparent over hero -> solid Obsidian after scrolling (window.scrollY > 40)
   - Smooth anchor scrolling with header offset
   - Keyboard accessible mobile menu with focus trapping and ESC support
   ========================================================================== */
function initMinimalNavigation() {
  const header = document.getElementById('main-header');
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const mobilePanel = document.getElementById('mobile-nav-panel');
  const closeBtn = document.getElementById('mobile-close-btn');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // 1. Header scroll state (transparent over hero, solid after scrolling)
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('header-solid');
      } else {
        header.classList.remove('header-solid');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Smooth anchor scrolling for all in-page links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '') return;
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        if (mobilePanel && !mobilePanel.hidden) {
          closeMobileMenu();
        }
      }
    });
  });

  // 3. Accessible Mobile Navigation Menu
  if (!toggleBtn || !mobilePanel) return;

  const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  let firstFocusableEl = null;
  let lastFocusableEl = null;

  const updateFocusableElements = () => {
    const focusable = mobilePanel.querySelectorAll(focusableSelector);
    firstFocusableEl = focusable[0];
    lastFocusableEl = focusable[focusable.length - 1];
  };

  const openMobileMenu = () => {
    mobilePanel.hidden = false;
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    updateFocusableElements();
    if (closeBtn) closeBtn.focus();
  };

  const closeMobileMenu = () => {
    mobilePanel.hidden = true;
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggleBtn.focus();
  };

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
  if (backdrop) backdrop.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Keyboard navigation: Escape key closes menu, Tab traps focus
  mobilePanel.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      return;
    }

    if (e.key === 'Tab') {
      updateFocusableElements();
      if (!firstFocusableEl || !lastFocusableEl) return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableEl) {
          e.preventDefault();
          lastFocusableEl.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableEl) {
          e.preventDefault();
          firstFocusableEl.focus();
        }
      }
    }
  });
}

/* Fallback for other subpages using old navbar */
function initStickyNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initMobileNav() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  if (!hamburgerBtn || !drawer || !overlay) return;
  const closeMenu = () => {
    hamburgerBtn.classList.remove('active');
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };
  hamburgerBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    overlay.classList.toggle('active');
  });
  overlay.addEventListener('click', closeMenu);
}

/* ==========================================================================
   BOOKING BAR & DATE INITIALIZATION
   ========================================================================== */
function initBookingBarDates() {
  const checkinInput = document.getElementById('booking-checkin');
  const checkoutInput = document.getElementById('booking-checkout');

  if (!checkinInput || !checkoutInput) return;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  checkinInput.min = formatDate(today);
  checkinInput.value = formatDate(today);

  checkoutInput.min = formatDate(tomorrow);
  checkoutInput.value = formatDate(tomorrow);

  checkinInput.addEventListener('change', () => {
    const selectedDate = new Date(checkinInput.value);
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    checkoutInput.min = formatDate(nextDay);
    if (new Date(checkoutInput.value) <= selectedDate) {
      checkoutInput.value = formatDate(nextDay);
    }
  });

  // Handle Home Booking Bar Submit -> Open Booking Modal with Prefilled Data
  const bookingBarForm = document.getElementById('home-booking-form');
  if (bookingBarForm) {
    bookingBarForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const checkin = checkinInput.value;
      const checkout = checkoutInput.value;
      const guests = document.getElementById('booking-guests')?.value || '2';
      const roomType = document.getElementById('booking-room-type')?.value || 'deluxe-executive';

      openBookingModal({ checkin, checkout, guests, roomType });
    });
  }
}

/* ==========================================================================
   OFFER BANNER COUNTDOWN TIMER
   ========================================================================== */
function initCountdownTimer() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  // Set target date 12 days from now (persisting in localStorage so it ticks naturally)
  let targetTimestamp = localStorage.getItem('wallflower_offer_target');
  if (!targetTimestamp || Number(targetTimestamp) < Date.now()) {
    targetTimestamp = Date.now() + 12 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000;
    localStorage.setItem('wallflower_offer_target', targetTimestamp);
  } else {
    targetTimestamp = Number(targetTimestamp);
  }

  const updateClock = () => {
    const now = Date.now();
    const diff = Math.max(0, targetTimestamp - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  };

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   GUEST REVIEW SLIDER
   ========================================================================== */
function initReviewSlider() {
  const slides = document.querySelectorAll('.review-slide');
  const prevBtn = document.getElementById('review-prev-btn');
  const nextBtn = document.getElementById('review-next-btn');

  if (!slides.length || !prevBtn || !nextBtn) return;

  let currentIdx = 0;

  const showSlide = (idx) => {
    slides.forEach(s => s.classList.remove('active'));
    currentIdx = (idx + slides.length) % slides.length;
    slides[currentIdx].classList.add('active');
  };

  nextBtn.addEventListener('click', () => showSlide(currentIdx + 1));
  prevBtn.addEventListener('click', () => showSlide(currentIdx - 1));

  // Auto rotate every 6 seconds
  let timer = setInterval(() => showSlide(currentIdx + 1), 6000);
  const sliderBox = document.querySelector('.review-slider-card');
  if (sliderBox) {
    sliderBox.addEventListener('mouseenter', () => clearInterval(timer));
    sliderBox.addEventListener('mouseleave', () => {
      timer = setInterval(() => showSlide(currentIdx + 1), 6000);
    });
  }
}

/* ==========================================================================
   MODALS: BOOKING, ROOM DETAILS, TABLE RESERVATION
   ========================================================================== */
let activeRoomGallery = [];
let currentRoomGalleryIdx = 0;

function initModals() {
  // Global modal close triggers
  document.querySelectorAll('.site-modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  // Global "Book Now" buttons
  document.querySelectorAll('[data-open-booking]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const roomId = btn.getAttribute('data-room-id');
      openBookingModal({ roomType: roomId });
    });
  });

  // Table reservation buttons
  document.querySelectorAll('[data-open-reserve-table]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const venue = btn.getAttribute('data-venue') || 'bistro';
      openTableReservationModal(venue);
    });
  });

  // Booking Modal form submission
  const bookingForm = document.getElementById('modal-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleBookingSubmit);
  }

  // Table reservation form submission
  const tableForm = document.getElementById('modal-table-form');
  if (tableForm) {
    tableForm.addEventListener('submit', handleTableSubmit);
  }

  // Room modal gallery arrows
  const prevArrow = document.getElementById('room-carousel-prev');
  const nextArrow = document.getElementById('room-carousel-next');
  if (prevArrow && nextArrow) {
    prevArrow.addEventListener('click', () => stepRoomGallery(-1));
    nextArrow.addEventListener('click', () => stepRoomGallery(1));
  }
}

function closeAllModals() {
  document.querySelectorAll('.site-modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = '';
}

// Open Booking Modal with options
window.openBookingModal = function(options = {}) {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  const roomSelect = document.getElementById('modal-book-room');
  const checkinInput = document.getElementById('modal-book-checkin');
  const checkoutInput = document.getElementById('modal-book-checkout');
  const guestsSelect = document.getElementById('modal-book-guests');

  // Populate rooms if empty
  if (roomSelect && typeof ROOMS_DATA !== 'undefined' && roomSelect.options.length <= 1) {
    roomSelect.innerHTML = '';
    ROOMS_DATA.forEach(room => {
      const opt = document.createElement('option');
      opt.value = room.id;
      opt.textContent = `${room.name} — ₹${room.price.toLocaleString('en-IN')}/night`;
      roomSelect.appendChild(opt);
    });
  }

  if (options.roomType && roomSelect) {
    roomSelect.value = options.roomType;
  }
  if (options.checkin && checkinInput) {
    checkinInput.value = options.checkin;
  } else if (checkinInput && !checkinInput.value) {
    const today = new Date();
    checkinInput.value = today.toISOString().split('T')[0];
  }

  if (options.checkout && checkoutInput) {
    checkoutInput.value = options.checkout;
  } else if (checkoutInput && !checkoutInput.value) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkoutInput.value = tomorrow.toISOString().split('T')[0];
  }

  if (options.guests && guestsSelect) {
    guestsSelect.value = options.guests;
  }

  updateBookingPriceEstimate();

  // Listeners for live price update
  if (roomSelect) roomSelect.onchange = updateBookingPriceEstimate;
  if (checkinInput) checkinInput.onchange = updateBookingPriceEstimate;
  if (checkoutInput) checkoutInput.onchange = updateBookingPriceEstimate;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// Calculate and display live price estimate in modal
function updateBookingPriceEstimate() {
  const roomSelect = document.getElementById('modal-book-room');
  const checkinInput = document.getElementById('modal-book-checkin');
  const checkoutInput = document.getElementById('modal-book-checkout');
  const estimateBox = document.getElementById('modal-price-estimate');

  if (!roomSelect || !checkinInput || !checkoutInput || !estimateBox || typeof ROOMS_DATA === 'undefined') return;

  const selectedRoomId = roomSelect.value;
  const room = ROOMS_DATA.find(r => r.id === selectedRoomId) || ROOMS_DATA[0];

  const checkin = new Date(checkinInput.value);
  const checkout = new Date(checkoutInput.value);

  let nights = 1;
  if (checkin && checkout && checkout > checkin) {
    const diffTime = Math.abs(checkout - checkin);
    nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  }

  const roomSubtotal = room.price * nights;
  const gst = Math.round(roomSubtotal * 0.12);
  const total = roomSubtotal + gst;

  estimateBox.innerHTML = `
    <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:0.88rem; color:var(--text-muted);">
      <span>${room.name} × ${nights} night${nights > 1 ? 's' : ''}</span>
      <span>₹${roomSubtotal.toLocaleString('en-IN')}</span>
    </div>
    <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:0.88rem; color:var(--text-muted);">
      <span>Hotel GST & Services (12%)</span>
      <span>₹${gst.toLocaleString('en-IN')}</span>
    </div>
    <div style="display:flex; justify-content:space-between; font-weight:700; font-size:1.05rem; color:#FFFFFF; border-top:1px dashed var(--glass-border); padding-top:6px; margin-top:6px;">
      <span>Estimated Total Payable:</span>
      <span style="color:var(--gold-light);">₹${total.toLocaleString('en-IN')}</span>
    </div>
  `;
}

// Handle Booking Form Submit
function handleBookingSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modal-book-name')?.value || 'Guest';
  const phone = document.getElementById('modal-book-phone')?.value || '';
  const email = document.getElementById('modal-book-email')?.value || '';
  const roomSelect = document.getElementById('modal-book-room');
  const checkin = document.getElementById('modal-book-checkin')?.value || '';
  const checkout = document.getElementById('modal-book-checkout')?.value || '';
  const guests = document.getElementById('modal-book-guests')?.value || '2';
  const notes = document.getElementById('modal-book-notes')?.value || 'None';

  const roomName = roomSelect?.options[roomSelect.selectedIndex]?.text.split('—')[0].trim() || 'Deluxe Room';

  // Construct WhatsApp message
  const whatsappMsg = `*Hotel Wallflower - Booking Enquiry*%0A%0A` +
    `👤 *Guest Name:* ${encodeURIComponent(name)}%0A` +
    `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
    `📧 *Email:* ${encodeURIComponent(email)}%0A` +
    `🏨 *Room:* ${encodeURIComponent(roomName)}%0A` +
    `📅 *Check-in:* ${encodeURIComponent(checkin)}%0A` +
    `📅 *Check-out:* ${encodeURIComponent(checkout)}%0A` +
    `👥 *Guests:* ${encodeURIComponent(guests)}%0A` +
    `📝 *Notes:* ${encodeURIComponent(notes)}%0A%0A` +
    `Please confirm room availability and payment link. Thank you!`;

  closeAllModals();

  // Show confirmation modal
  showConfirmationDialog({
    title: "Enquiry Received Successfully!",
    message: `Thank you, <strong>${name}</strong>! We have recorded your reservation enquiry for <strong>${roomName}</strong> from ${checkin} to ${checkout}. Our Kota reservations team will call you at ${phone} within 15 minutes.`,
    whatsappUrl: `https://wa.me/919829012345?text=${whatsappMsg}`
  });
}

// Open Room Details Modal
window.openRoomDetailsModal = function(roomId) {
  if (typeof ROOMS_DATA === 'undefined') return;
  const room = ROOMS_DATA.find(r => r.id === roomId);
  if (!room) return;

  const modal = document.getElementById('room-detail-modal');
  if (!modal) return;

  // Set Gallery
  activeRoomGallery = room.gallery && room.gallery.length ? room.gallery : [room.coverImage];
  currentRoomGalleryIdx = 0;
  updateRoomGalleryImage();

  // Set Info
  document.getElementById('modal-room-title').textContent = room.name;
  document.getElementById('modal-room-tagline').textContent = room.tagline;
  document.getElementById('modal-room-price').textContent = `₹${room.price.toLocaleString('en-IN')}`;
  document.getElementById('modal-room-desc').textContent = room.description;

  // Specs
  document.getElementById('modal-spec-size').textContent = room.size;
  document.getElementById('modal-spec-bed').textContent = room.bed;
  document.getElementById('modal-spec-guests').textContent = room.guests;
  document.getElementById('modal-spec-view').textContent = room.view;

  // Amenities checklist
  const amenitiesList = document.getElementById('modal-room-amenities');
  if (amenitiesList) {
    amenitiesList.innerHTML = room.amenities.map(a => `
      <div class="check-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${a.text}</span>
      </div>
    `).join('');
  }

  // CTA button
  const ctaBtn = document.getElementById('modal-room-book-btn');
  if (ctaBtn) {
    ctaBtn.onclick = () => {
      closeAllModals();
      openBookingModal({ roomType: room.id });
    };
  }

  // Swipeable image slider on mobile/touch
  const carousel = modal.querySelector('.modal-room-carousel');
  if (carousel && !carousel._hasSwipe) {
    carousel._hasSwipe = true;
    let tStartX = 0;
    let tStartY = 0;
    carousel.addEventListener('touchstart', (e) => {
      tStartX = e.changedTouches[0].clientX;
      tStartY = e.changedTouches[0].clientY;
    }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      const diffX = tStartX - e.changedTouches[0].clientX;
      const diffY = tStartY - e.changedTouches[0].clientY;
      if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) stepRoomGallery(1);
        else stepRoomGallery(-1);
      }
    }, { passive: true });
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function stepRoomGallery(delta) {
  if (!activeRoomGallery.length) return;
  currentRoomGalleryIdx = (currentRoomGalleryIdx + delta + activeRoomGallery.length) % activeRoomGallery.length;
  updateRoomGalleryImage();
}

function updateRoomGalleryImage() {
  const imgEl = document.getElementById('modal-carousel-image');
  if (imgEl && activeRoomGallery[currentRoomGalleryIdx]) {
    imgEl.src = activeRoomGallery[currentRoomGalleryIdx];
  }
}

// Table Reservation Modal
window.openTableReservationModal = function(venue = 'bistro') {
  const modal = document.getElementById('table-modal');
  if (!modal) return;

  const venueSelect = document.getElementById('modal-table-venue');
  if (venueSelect) {
    venueSelect.value = venue;
  }

  const dateInput = document.getElementById('modal-table-date');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function handleTableSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modal-table-name')?.value || 'Guest';
  const phone = document.getElementById('modal-table-phone')?.value || '';
  const venue = document.getElementById('modal-table-venue')?.value || 'bistro';
  const date = document.getElementById('modal-table-date')?.value || '';
  const time = document.getElementById('modal-table-time')?.value || '';
  const guests = document.getElementById('modal-table-guests')?.value || '2';
  const notes = document.getElementById('modal-table-notes')?.value || 'None';

  const venueName = venue === 'bar' ? 'The Velvet Lounge & Bar' : 'The Wallflower Bistro';

  const whatsappMsg = `*Table Reservation - ${venueName}*%0A%0A` +
    `👤 *Guest Name:* ${encodeURIComponent(name)}%0A` +
    `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
    `🍽 *Venue:* ${encodeURIComponent(venueName)}%0A` +
    `📅 *Date:* ${encodeURIComponent(date)}%0A` +
    `⏰ *Time Slot:* ${encodeURIComponent(time)}%0A` +
    `👥 *Guests:* ${encodeURIComponent(guests)}%0A` +
    `📝 *Special Requests:* ${encodeURIComponent(notes)}%0A%0A` +
    `Please confirm our table reservation. Thank you!`;

  closeAllModals();

  showConfirmationDialog({
    title: "Table Reserved Successfully!",
    message: `Thank you, <strong>${name}</strong>! Your table reservation at <strong>${venueName}</strong> for <strong>${guests} Guests</strong> on ${date} at ${time} has been requested. Our hospitality manager will confirm via SMS / WhatsApp.`,
    whatsappUrl: `https://wa.me/919829012345?text=${whatsappMsg}`
  });
}

// Generic Confirmation Dialog
function showConfirmationDialog({ title, message, whatsappUrl }) {
  let confModal = document.getElementById('confirmation-dialog-modal');
  if (!confModal) {
    confModal = document.createElement('div');
    confModal.id = 'confirmation-dialog-modal';
    confModal.className = 'site-modal-overlay';
    confModal.innerHTML = `
      <div class="site-modal-card" style="max-width: 540px; text-align: center; padding: 40px 30px;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); color: #34D399; display:flex; align-items:center; justify-content:center; margin: 0 auto 20px;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h3 id="conf-dialog-title" style="font-size: 1.6rem; margin-bottom: 12px; color: var(--navy-dark);"></h3>
        <p id="conf-dialog-msg" style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 28px;"></p>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <a id="conf-dialog-wa" href="#" target="_blank" class="btn btn-gold" style="width:100%; background:var(--ivory); color:var(--obsidian); border:1px solid var(--ivory); box-shadow:0 6px 20px rgba(0,0,0,0.6);">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            Send Details to WhatsApp (Instant Reply)
          </a>
          <button class="btn btn-navy" onclick="closeAllModals()" style="width:100%;">
            Done & Return to Site
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(confModal);
  }

  document.getElementById('conf-dialog-title').innerHTML = title;
  document.getElementById('conf-dialog-msg').innerHTML = message;
  const waBtn = document.getElementById('conf-dialog-wa');
  if (waBtn) waBtn.href = whatsappUrl;

  confModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   GALLERY FILTERING & LIGHTBOX
   ========================================================================== */
let activeLightboxItems = [];
let currentLightboxIdx = 0;

function initGalleryLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-tab-btn');
  const galleryGrid = document.getElementById('gallery-items-grid');

  if (!galleryGrid || typeof GALLERY_DATA === 'undefined') return;

  const renderGallery = (category = 'all') => {
    galleryGrid.innerHTML = '';
    const filtered = category === 'all' 
      ? GALLERY_DATA 
      : GALLERY_DATA.filter(item => item.category === category);

    activeLightboxItems = filtered;

    filtered.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'gallery-item';
      card.innerHTML = `
        <img src="${item.src}" alt="${item.title}" width="600" height="400" loading="lazy" decoding="async">
        <div class="gallery-hover-overlay">
          <span class="gallery-item-cat">${item.categoryLabel}</span>
          <h4 class="gallery-item-title">${item.title}</h4>
        </div>
      `;
      card.addEventListener('click', () => openLightbox(idx));
      galleryGrid.appendChild(card);
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      renderGallery(cat);
    });
  });

  // Initial render
  renderGallery('all');

  // Lightbox controls
  const lightboxModal = document.getElementById('gallery-lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => stepLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => stepLightbox(1));

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    // Touch swipe left/right in Lightbox
    let lbStartX = 0;
    let lbStartY = 0;
    lightboxModal.addEventListener('touchstart', (e) => {
      lbStartX = e.changedTouches[0].clientX;
      lbStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      const diffX = lbStartX - e.changedTouches[0].clientX;
      const diffY = lbStartY - e.changedTouches[0].clientY;
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) stepLightbox(1);
        else stepLightbox(-1);
      }
    }, { passive: true });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    }
  });
}

function openLightbox(idx) {
  const modal = document.getElementById('gallery-lightbox-modal');
  if (!modal || !activeLightboxItems.length) return;

  currentLightboxIdx = idx;
  updateLightboxContent();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('gallery-lightbox-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function stepLightbox(delta) {
  if (!activeLightboxItems.length) return;
  currentLightboxIdx = (currentLightboxIdx + delta + activeLightboxItems.length) % activeLightboxItems.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = activeLightboxItems[currentLightboxIdx];
  if (!item) return;

  const imgEl = document.getElementById('lightbox-image');
  const titleEl = document.getElementById('lightbox-title');
  const descEl = document.getElementById('lightbox-desc');

  if (imgEl) imgEl.src = item.src;
  if (titleEl) titleEl.textContent = item.title;
  if (descEl) descEl.textContent = item.desc;
}

/* ==========================================================================
   TOAST NOTIFICATION
   ========================================================================== */
function initToast() {
  // Newsletter forms
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value) {
        showToast('Subscribed! Check your inbox for 15% off coupon.');
        input.value = '';
      }
    });
  });
}

window.showToast = function(msg) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${msg}</span>
  `;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
};

/* ==========================================================================
   LENIS SMOOTH SCROLL INITIALIZATION
   - 60fps buttery smooth scroll synced with GSAP ticker & ScrollTrigger
   - Bypassed under prefers-reduced-motion
   ========================================================================== */
let lenisInstance = null;

function initLenisSmoothScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.innerWidth <= 1024 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  // Requirement 7: on touch devices use native scroll (disable smooth wheel hijacking on mobile), and respect prefers-reduced-motion
  if (prefersReducedMotion || isTouchDevice || typeof Lenis === 'undefined') {
    if (lenisInstance) {
      lenisInstance.destroy();
      lenisInstance = null;
    }
    window.lenis = null;
    return;
  }

  lenisInstance = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false
  });

  window.lenis = lenisInstance;

  if (typeof ScrollTrigger !== 'undefined') {
    lenisInstance.on('scroll', ScrollTrigger.update);
  }

  if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time) => {
      if (lenisInstance) lenisInstance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      if (lenisInstance) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
    }
    requestAnimationFrame(raf);
  }
}

/* ==========================================================================
   SCROLL-DRIVEN HERO PIN & SHRINK (GSAP + ScrollTrigger, scrub: true)
   - Desktop (min-width: 1025px): Pins hero at top, shrinks 100vh -> 28vh, 3 images crossfade
   - Mobile (max-width: 1024px): Lightweight 100dvh flow, subtle hero text fade-up on load
   ========================================================================== */
function initScrollDrivenHero() {
  const track = document.getElementById('hero-scroll-track');
  const stickyStage = document.getElementById('hero-sticky-stage');
  const bannerStrip = document.getElementById('hero-banner-strip');
  const slide1 = document.getElementById('hero-slide-1');
  const slide2 = document.getElementById('hero-slide-2');
  const slide3 = document.getElementById('hero-slide-3');
  const wordmark = document.getElementById('hero-brand-wordmark');
  const subtextBadge = document.getElementById('hero-subtext-badge');
  const scrollCue = document.getElementById('hero-scroll-cue');
  const carouselTrack = document.getElementById('incoming-carousel-track');
  const incomingStage = document.getElementById('hero-incoming-stage');
  const header = document.getElementById('main-header');

  if (!track || !stickyStage || !bannerStrip) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    if (header) header.classList.add('header-visible');
    return;
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // DESKTOP CONTEXT: (min-width: 1025px) - Untouched original pinned shrink timeline
    mm.add("(min-width: 1025px)", () => {
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          id: 'hero-shrink-trigger',
          trigger: track,
          pin: stickyStage,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (header) {
              if (self.progress > 0.10) {
                header.classList.add('header-visible');
              } else {
                header.classList.remove('header-visible');
              }
            }
          }
        }
      });

      // 1. Incoming Luxury Stage slides up via pure GPU transform: translateY (100% -> 0%)
      if (incomingStage) {
        heroTimeline.fromTo(incomingStage, 
          { yPercent: 100 }, 
          { yPercent: 0, ease: 'none', duration: 1.0 }, 
          0
        );
      }

      // 2. Initial Scroll Cue fades out early (0.0 -> 0.12)
      if (scrollCue) {
        heroTimeline.to(scrollCue, {
          opacity: 0,
          y: -12,
          ease: 'power1.out',
          duration: 0.12
        }, 0);
      }

      // 3. Slide 1 (0.0 -> 0.33): scale 1.15 -> 1.0, crossfade out 0.22 -> 0.33
      const photo1 = slide1 ? slide1.querySelector('.hero-slide-photo') : null;
      if (photo1) {
        heroTimeline.fromTo(photo1, { scale: 1.15 }, { scale: 1.0, ease: 'none', duration: 0.33 }, 0);
      }
      if (slide1) {
        heroTimeline.to(slide1, { opacity: 0, ease: 'power1.inOut', duration: 0.11 }, 0.22);
      }

      // 4. Slide 2 (0.33 -> 0.66): crossfade in 0.22 -> 0.33, scale 1.15 -> 1.0, crossfade out 0.55 -> 0.66
      const photo2 = slide2 ? slide2.querySelector('.hero-slide-photo') : null;
      if (slide2) {
        heroTimeline.fromTo(slide2, { opacity: 0 }, { opacity: 1, ease: 'power1.inOut', duration: 0.11 }, 0.22);
      }
      if (photo2) {
        heroTimeline.fromTo(photo2, { scale: 1.15 }, { scale: 1.0, ease: 'none', duration: 0.33 }, 0.33);
      }
      if (slide2) {
        heroTimeline.to(slide2, { opacity: 0, ease: 'power1.inOut', duration: 0.11 }, 0.55);
      }

      // 5. Slide 3 (0.66 -> 1.0): crossfade in 0.55 -> 0.66, scale 1.15 -> 1.0
      const photo3 = slide3 ? slide3.querySelector('.hero-slide-photo') : null;
      if (slide3) {
        heroTimeline.fromTo(slide3, { opacity: 0 }, { opacity: 1, ease: 'power1.inOut', duration: 0.11 }, 0.55);
      }
      if (photo3) {
        heroTimeline.fromTo(photo3, { scale: 1.15 }, { scale: 1.0, ease: 'none', duration: 0.34 }, 0.66);
      }

      // 6. Wordmark: scales down and shifts to bottom-center of the 28vh strip (pure transform)
      if (wordmark) {
        heroTimeline.to(wordmark, {
          scale: 0.40,
          y: 16,
          ease: 'power1.out',
          duration: 1.0
        }, 0);
      }

      // 7. Subtext "HOTEL" badge: fades in under the wordmark (0.65 -> 1.0)
      if (subtextBadge) {
        heroTimeline.fromTo(subtextBadge, 
          { opacity: 0, y: 10 }, 
          { opacity: 1, y: 0, ease: 'power1.out', duration: 0.35 }, 
          0.65
        );
      }

      // 8. Horizontal Carousel Track subtle travel during slide-up (0.60 -> 1.0)
      if (carouselTrack) {
        heroTimeline.fromTo(carouselTrack,
          { x: 20 },
          { x: -40, ease: 'none', duration: 0.4 },
          0.60
        );
      }
    });

    // MOBILE CONTEXT: (max-width: 1024px) - Lightweight animations (no pin, no long scrub)
    mm.add("(max-width: 1024px)", () => {
      if (header) header.classList.add('header-visible');
      gsap.set(stickyStage, { clearProps: 'all' });
      gsap.set(bannerStrip, { clearProps: 'all' });
      if (incomingStage) gsap.set(incomingStage, { clearProps: 'all' });
      if (wordmark) gsap.set(wordmark, { clearProps: 'all' });
      if (subtextBadge) gsap.set(subtextBadge, { opacity: 1, y: 0 });
      if (slide1) gsap.set(slide1, { opacity: 1 });

      // Requirement 6: hero text fade-up on load
      const heroTextElements = [wordmark, subtextBadge, incomingStage].filter(Boolean);
      if (heroTextElements.length) {
        gsap.fromTo(heroTextElements,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 }
        );
      }
    });

    // Clean up on page unmount
    window.addEventListener('beforeunload', () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    });

    return;
  }

  // Native Fallback if GSAP is unavailable
  let ticking = false;
  const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

  const onScrollFallback = () => {
    const rect = track.getBoundingClientRect();
    const scrollDist = track.offsetHeight - window.innerHeight;
    const progress = clamp(-rect.top / (scrollDist || 1), 0, 1);

    // Incoming stage translate fallback (pure GPU transform)
    if (incomingStage) {
      incomingStage.style.transform = `translate3d(0, ${((1 - progress) * 100).toFixed(2)}%, 0)`;
    }

    // Wordmark
    if (wordmark) {
      const scale = 1.0 - progress * (isMobile() ? 0.56 : 0.60);
      wordmark.style.transform = `scale(${scale.toFixed(3)}) translateY(${(progress * 16).toFixed(1)}px)`;
    }

    // Subtext
    if (subtextBadge) {
      const subOpacity = progress > 0.65 ? clamp((progress - 0.65) / 0.35, 0, 1) : 0;
      subtextBadge.style.opacity = subOpacity.toFixed(3);
    }

    // Navigation
    if (header) {
      if (progress > 0.10) {
        header.classList.add('header-visible');
      } else {
        header.classList.remove('header-visible');
      }
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScrollFallback);
      ticking = true;
    }
  }, { passive: true });

  onScrollFallback();
}

function initHeroScrollChoreography() {
  // Alias pointing to initScrollDrivenHero
  initScrollDrivenHero();
}

/* ==========================================================================
   STICKY BOOKING BAR LOGIC (Check-in / Check-out / Guests / Book Flow)
   - Synchronizes with existing booking modal
   - Sets today / tomorrow defaults
   ========================================================================== */
function initStickyBookingBar() {
  const checkinInput = document.getElementById('bar-checkin');
  const checkoutInput = document.getElementById('bar-checkout');
  const guestsSelect = document.getElementById('bar-guests');
  const reserveBtn = document.getElementById('btn-bar-reserve');

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  if (checkinInput && checkoutInput) {
    checkinInput.min = formatDate(today);
    checkinInput.value = formatDate(today);
    checkoutInput.min = formatDate(tomorrow);
    checkoutInput.value = formatDate(tomorrow);

    checkinInput.addEventListener('change', () => {
      const selected = new Date(checkinInput.value);
      const nextDay = new Date(selected);
      nextDay.setDate(nextDay.getDate() + 1);
      checkoutInput.min = formatDate(nextDay);
      if (new Date(checkoutInput.value) <= selected) {
        checkoutInput.value = formatDate(nextDay);
      }
    });
  }

  if (reserveBtn) {
    reserveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const checkin = checkinInput ? checkinInput.value : '';
      const checkout = checkoutInput ? checkoutInput.value : '';
      const guests = guestsSelect ? guestsSelect.value : '2';

      if (typeof window.openBookingModal === 'function') {
        window.openBookingModal({ checkin, checkout, guests });
      }
    });
  }
}


/* ==========================================================================
   3D MOTIONFRAME ROOM SLIDER (Cinematic Perspective Depth & HUD Telemetry)
   ========================================================================== */
function initRooms3DMotionframeSlider() {
  const stage = document.getElementById('motionframe-rooms-stage');
  const cards = Array.from(document.querySelectorAll('.motionframe-card'));
  const prevBtn = document.getElementById('motionframe-prev-btn');
  const nextBtn = document.getElementById('motionframe-next-btn');
  const frameNumEl = document.getElementById('current-frame-num');
  const dots = Array.from(document.querySelectorAll('.motionframe-dot'));

  if (!stage || !cards.length) return;

  const totalCards = cards.length;
  let activeIndex = 0;

  const updateCardClasses = () => {
    cards.forEach((card, i) => {
      card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next', 'hidden');

      const diff = (i - activeIndex + totalCards) % totalCards;

      if (diff === 0) {
        card.classList.add('active');
      } else if (diff === 1) {
        card.classList.add('next');
      } else if (diff === 2) {
        card.classList.add('far-next');
      } else if (diff === totalCards - 1) {
        card.classList.add('prev');
      } else if (diff === totalCards - 2) {
        card.classList.add('far-prev');
      } else {
        card.classList.add('hidden');
      }
    });

    // Update HUD frame number
    if (frameNumEl) {
      frameNumEl.textContent = String(activeIndex + 1).padStart(2, '0');
    }

    // Update dots
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeIndex);
    });
  };

  const goToFrame = (index) => {
    activeIndex = (index + totalCards) % totalCards;
    updateCardClasses();
  };

  // Nav buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToFrame(activeIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToFrame(activeIndex + 1);
    });
  }

  // Click card to make it active
  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      // Don't hijack if clicking booking/details buttons
      if (e.target.closest('button') || e.target.closest('a')) return;
      if (index !== activeIndex) {
        e.preventDefault();
        goToFrame(index);
      }
    });
  });

  // Dots click
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToFrame(index);
    });
  });

  // Keyboard navigation when user is focused on slider
  window.addEventListener('keydown', (e) => {
    const stageRect = stage.getBoundingClientRect();
    const inView = stageRect.top < window.innerHeight && stageRect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowLeft') {
      goToFrame(activeIndex - 1);
    } else if (e.key === 'ArrowRight') {
      goToFrame(activeIndex + 1);
    }
  });

  // Touch and drag swipe
  let startX = 0;
  let isSwiping = false;

  stage.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    isSwiping = false;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (diff > 50) {
      goToFrame(activeIndex - 1);
    } else if (diff < -50) {
      goToFrame(activeIndex + 1);
    }
  });

  // Initialize state
  updateCardClasses();
}

/* ==========================================================================
   VIP ROYAL RED CARPET WELCOME RUNWAY (Scroll-Driven Welcome Animation)
   ========================================================================== */
function initRedCarpetWelcomeAnimation() {
  const section = document.getElementById('red-carpet-welcome');
  const mat = document.getElementById('red-carpet-mat');
  const letters = Array.from(document.querySelectorAll('.carpet-letter'));

  if (!section || !letters.length) return;

  let ticking = false;

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate progress as section scrolls into viewport
    const sectionHeight = section.offsetHeight;
    const totalDistance = windowHeight + sectionHeight;
    const currentPos = windowHeight - rect.top;
    const progress = Math.min(1.0, Math.max(0, currentPos / totalDistance));

    // Dynamic unroll effect on the velvet carpet runner
    if (mat) {
      const carpetProgress = Math.min(1.0, Math.max(0, (progress - 0.12) / 0.68));
      const rotateX = (1 - carpetProgress) * 10;
      const scaleX = 0.95 + carpetProgress * 0.05;
      mat.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) scaleX(${scaleX.toFixed(3)})`;
    }

    // Sequentially illuminate W · E · L · C · O · M · E letters
    const startProgress = 0.22;
    const endProgress = 0.72;
    const step = (endProgress - startProgress) / letters.length;

    letters.forEach((letter, idx) => {
      const threshold = startProgress + idx * step;
      if (progress >= threshold) {
        letter.classList.add('illuminated');
      } else {
        letter.classList.remove('illuminated');
      }
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // Initial check
  onScroll();
}

/* ==========================================================================
   PINNED SCROLL-STORYTELLING SECTION (GSAP + ScrollTrigger, pin: true, scrub: 0.6)
   Theme: Luxury Deep Forest Green (#0D2318) + White & Black Font Accents
   - Irregular rounded polygon shapes with slanted side (SVG objectBoundingBox)
   - Size swap via scale transform:
       Right side: Image A small (scale 0.6), Image B big (scale 1.0)
       Left side: Image A big (scale 1.0), Image B small (scale 0.6)
   - Motion: "Azaad parinda" flight feel with S-curve y drift (~30-50px)
   - ~15% scroll progress follow lag/stagger between Image A and Image B
   - Travel rotation: Image A (-6deg -> +3deg), Image B (+4deg -> -4deg)
   - Idle float on inner wrapper (y +-10px, rot +-1.5deg, 4s & 5.5s)
   ========================================================================== */
function initPinnedStorytellingSection() {
  const section = document.getElementById('storytelling-scroll-section');
  const stickyStage = document.getElementById('storytelling-sticky-stage');
  const step1Content = document.getElementById('story-step1-content');
  const title1 = step1Content ? step1Content.querySelector('.story-display-title') : null;
  const paragraph1 = document.getElementById('story-reveal-p1');
  const exploreBtn1 = step1Content ? step1Content.querySelector('.btn-story-explore') : null;
  const step3Content = document.getElementById('story-step3-content');
  const title2 = step3Content ? step3Content.querySelector('.story-display-title') : null;
  const paragraph2 = document.getElementById('story-reveal-p2');
  const exploreBtn2 = step3Content ? step3Content.querySelector('.btn-story-explore') : null;
  const climaxBlock = document.getElementById('story-center-climax');
  const card1 = document.getElementById('diamond-card-1');
  const card2 = document.getElementById('diamond-card-2');
  const inner1 = document.getElementById('diamond-inner-1');
  const inner2 = document.getElementById('diamond-inner-2');
  const img1A = document.getElementById('diamond-1-img-a');
  const img1C = document.getElementById('diamond-1-img-c');
  const img2B = document.getElementById('diamond-2-img-b');
  const img2D = document.getElementById('diamond-2-img-d');

  if (!section || !stickyStage) return;

  // Helper: Split text and em tags into individual kinetic words with alternating upper/downside floating wrappers
  function prepareWritingWords(container) {
    if (!container) return [];
    if (container.getAttribute('data-writing-split') === 'true') {
      return Array.from(container.querySelectorAll('.writing-word-wrap'));
    }

    const temp = document.createElement('div');
    temp.innerHTML = container.innerHTML;

    let wordIdx = 0;
    const fragment = document.createDocumentFragment();

    function process(node, isItalic = false) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const rawWords = text.split(/\s+/).filter(Boolean);
        rawWords.forEach((word) => {
          const fromTop = (wordIdx % 2 === 0);
          const dirClass = fromTop ? 'word-from-top' : 'word-from-bottom';
          const emClass = isItalic ? 'writing-word-em' : '';
          const delay = ((wordIdx % 8) * 0.14).toFixed(2);

          const wrap = document.createElement('span');
          wrap.className = `writing-word-wrap ${dirClass}`;
          wrap.setAttribute('data-word-idx', wordIdx);

          const inner = document.createElement('span');
          inner.className = `writing-word-inner ${emClass}`.trim();
          inner.style.animationDelay = `${delay}s`;
          inner.textContent = word;

          wrap.appendChild(inner);
          fragment.appendChild(wrap);
          fragment.appendChild(document.createTextNode(' '));
          wordIdx++;
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const italic = isItalic || node.tagName.toLowerCase() === 'em';
        Array.from(node.childNodes).forEach(child => process(child, italic));
      }
    }

    Array.from(temp.childNodes).forEach(child => process(child, false));

    container.innerHTML = '';
    container.appendChild(fragment);
    container.setAttribute('data-writing-split', 'true');
    return Array.from(container.querySelectorAll('.writing-word-wrap'));
  }

  const titleWords1 = prepareWritingWords(title1);
  const paraWords1 = prepareWritingWords(paragraph1);
  const titleWords2 = prepareWritingWords(title2);
  const paraWords2 = prepareWritingWords(paragraph2);

  const allWords = [...titleWords1, ...paraWords1, ...titleWords2, ...paraWords2];

  // Helper to set alternating initial position (upper side vs downside) with blur & tilt
  const setupWordInitialState = (words, fromTopY = -46, fromBottomY = 46, blurAmt = '8px') => {
    if (!words || !words.length) return;
    words.forEach(w => {
      const isTop = w.classList.contains('word-from-top');
      gsap.set(w, {
        y: isTop ? fromTopY : fromBottomY,
        opacity: 0,
        filter: `blur(${blurAmt})`,
        scale: 0.9,
        rotation: isTop ? -4 : 4
      });
    });
  };

  // Reduced motion check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    allWords.forEach(w => {
      w.style.opacity = '1';
      w.style.transform = 'none';
      w.style.filter = 'none';
    });
    if (card1) {
      card1.style.opacity = '1';
      card1.style.transform = 'scale(1.0)';
    }
    if (card2) {
      card2.style.opacity = '1';
      card2.style.transform = 'scale(1.0)';
    }
    if (step1Content) step1Content.style.opacity = '1';
    if (step3Content) {
      step3Content.style.position = 'relative';
      step3Content.style.opacity = '1';
      step3Content.style.pointerEvents = 'auto';
    }
    if (climaxBlock) {
      climaxBlock.style.position = 'relative';
      climaxBlock.style.opacity = '1';
      climaxBlock.style.transform = 'none';
    }
    return;
  }

  // Check GSAP and ScrollTrigger availability
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    allWords.forEach(w => {
      w.style.opacity = '1';
      w.style.transform = 'none';
      w.style.filter = 'none';
    });
    if (card1) card1.style.opacity = '1';
    if (card2) card2.style.opacity = '1';
    if (step3Content) step3Content.style.opacity = '1';
    if (climaxBlock) climaxBlock.style.opacity = '1';
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  // DESKTOP CONTEXT: (min-width: 1025px) - Untouched original 520% pinned storytelling timeline
  mm.add("(min-width: 1025px)", () => {

  // Dynamic distance calculation for cluster slide (from right column to left column)
  const getClusterSlideDistance = () => {
    if (window.innerWidth <= 768) return 0;
    const colLeft = document.getElementById('storytelling-col-left');
    const colRight = document.getElementById('storytelling-col-right');
    if (colLeft && colRight) {
      const leftRect = colLeft.getBoundingClientRect();
      const rightRect = colRight.getBoundingClientRect();
      const diff = rightRect.left - leftRect.left;
      return -diff;
    }
    return -560;
  };

  // 1. Initial State:
  // Grand & Large Image Cubes: Card 1 starts at scale 0.88 (~390px), Card 2 starts at scale 1.15 (~500px)
  gsap.set(card1, { x: 0, y: 130, scale: 0.88, rotation: -6, opacity: 0 });
  gsap.set(card2, { x: 0, y: 150, scale: 1.15, rotation: 4, opacity: 0 });

  // Floating Kinetic Words: Upper words come from -46px, bottom words from +46px
  setupWordInitialState(titleWords1, -50, 50, '8px');
  setupWordInitialState(paraWords1, -38, 38, '6px');
  setupWordInitialState(titleWords2, -50, 50, '8px');
  setupWordInitialState(paraWords2, -38, 38, '6px');

  if (exploreBtn1) gsap.set(exploreBtn1, { opacity: 0, y: 16 });
  if (img1C) gsap.set(img1C, { opacity: 0, scale: 1.1 });
  if (img2D) gsap.set(img2D, { opacity: 0, scale: 1.1 });

  if (step3Content) gsap.set(step3Content, { opacity: 0, y: 24, pointerEvents: 'none' });
  if (exploreBtn2) gsap.set(exploreBtn2, { opacity: 0, y: 16 });
  if (climaxBlock) gsap.set(climaxBlock, { opacity: 0, scale: 0.92, pointerEvents: 'none' });

  // 2. Autonomous Idle Float on INNER wrappers
  if (inner1) {
    gsap.to(inner1, {
      y: 12,
      rotation: 1.5,
      duration: 4.2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }
  if (inner2) {
    gsap.to(inner2, {
      y: -12,
      rotation: -1.5,
      duration: 5.8,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }

  // 3. Main ScrollTrigger timeline
  const storyTimeline = gsap.timeline({
    scrollTrigger: {
      id: 'storytelling-pinned-trigger',
      trigger: section,
      pin: stickyStage,
      start: 'top top',
      end: '+=520%',
      scrub: 0.6,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  // -------------------------------------------------------------
  // STEP 1: (0.00 -> 0.24)
  // - Right: Image Cubes rise into view
  // - Left: Title words write themselves out from upper (-50px) & lower (+50px)
  // - Left: Paragraph words write themselves out sequentially
  // - Left: Explore button fades in
  // -------------------------------------------------------------
  storyTimeline.to(card1, {
    y: 0,
    opacity: 1,
    duration: 0.14,
    ease: 'power2.out'
  }, 0.0);

  storyTimeline.to(card2, {
    y: 0,
    opacity: 1,
    duration: 0.16,
    ease: 'power2.out'
  }, 0.02);

  // Progressive Title writing animation (words assemble from alternating upper & lower positions)
  if (titleWords1.length) {
    const titleDuration = 0.07;
    const titleStep = titleDuration / Math.max(titleWords1.length, 1);
    storyTimeline.to(titleWords1, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      rotation: 0,
      stagger: titleStep,
      duration: 0.04,
      ease: 'power2.out'
    }, 0.01);
  }

  // Progressive Paragraph writing animation (words stream in like live ink)
  if (paraWords1.length) {
    const paraDuration = 0.14;
    const paraStep = paraDuration / Math.max(paraWords1.length, 1);
    storyTimeline.to(paraWords1, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      rotation: 0,
      stagger: paraStep,
      duration: 0.035,
      ease: 'power2.out'
    }, 0.05);
  }

  if (exploreBtn1) {
    storyTimeline.to(exploreBtn1, {
      opacity: 1,
      y: 0,
      duration: 0.05,
      ease: 'power1.out'
    }, 0.18);
  }

  // Pacing settle for reading Step 1
  storyTimeline.to({}, { duration: 0.03 }, 0.21);

  // -------------------------------------------------------------
  // STEP 2: (0.24 -> 0.50)
  // - Left: Step 1 content block fades out (y: 0 -> -30px)
  // - Crossfade images: Card 1 (A -> C) & Card 2 (B -> D)
  // - MOTION: "Azaad Parinda" S-curve travel, scale swap
  //     Image A: leads, scale 0.88 -> 1.15, rot -6deg -> +3deg, y arc (0 -> -40 -> 0)
  //     Image B: follows ~15% behind, scale 1.15 -> 0.88, rot +4deg -> -4deg, y arc (0 -> +45 -> 0)
  // -------------------------------------------------------------
  if (step1Content) {
    storyTimeline.to(step1Content, {
      opacity: 0,
      y: -30,
      duration: 0.07,
      ease: 'power2.in'
    }, 0.24);
  }

  // Crossfade Card 1: Image A out, Image C in
  if (img1A && img1C) {
    storyTimeline.to(img1A, {
      opacity: 0,
      duration: 0.10,
      ease: 'power1.inOut'
    }, 0.26);
    storyTimeline.to(img1C, {
      opacity: 1,
      scale: 1.0,
      duration: 0.11,
      ease: 'power1.out'
    }, 0.26);
  }

  // Crossfade Card 2: Image B out, Image D in
  if (img2B && img2D) {
    storyTimeline.to(img2B, {
      opacity: 0,
      duration: 0.10,
      ease: 'power1.inOut'
    }, 0.29);
    storyTimeline.to(img2D, {
      opacity: 1,
      scale: 1.0,
      duration: 0.11,
      ease: 'power1.out'
    }, 0.29);
  }

  // Card 1: Leading flight + Size increase (0.88 -> 1.15)
  storyTimeline.to(card1, {
    x: () => getClusterSlideDistance(),
    scale: 1.15,
    rotation: 3,
    duration: 0.18,
    ease: 'sine.inOut'
  }, 0.26);

  storyTimeline.to(card1, {
    y: -40,
    duration: 0.09,
    ease: 'sine.out'
  }, 0.26);
  storyTimeline.to(card1, {
    y: 0,
    duration: 0.09,
    ease: 'sine.in'
  }, 0.35);

  // Card 2: Following flight (~15% relative follow lag) + Size adapt (1.15 -> 0.88)
  storyTimeline.to(card2, {
    x: () => getClusterSlideDistance(),
    scale: 0.88,
    rotation: -4,
    duration: 0.18,
    ease: 'sine.inOut'
  }, 0.32);

  storyTimeline.to(card2, {
    y: 45,
    duration: 0.09,
    ease: 'sine.out'
  }, 0.32);
  storyTimeline.to(card2, {
    y: 0,
    duration: 0.09,
    ease: 'sine.in'
  }, 0.41);

  // Settle pause at left side
  storyTimeline.to({}, { duration: 0.02 }, 0.50);

  // -------------------------------------------------------------
  // STEP 3: (0.50 -> 0.74)
  // - Images remain resting on the left side (with idle float active)
  // - Right: Step 3 content block fades in
  // - Right: Title 2 words write themselves out from upper & lower sides
  // - Right: Paragraph 2 words write themselves out sequentially
  // - Right: Explore button fades in
  // -------------------------------------------------------------
  if (step3Content) {
    storyTimeline.to(step3Content, {
      opacity: 1,
      y: 0,
      duration: 0.06,
      ease: 'power2.out',
      onStart: () => { step3Content.style.pointerEvents = 'auto'; }
    }, 0.50);
  }

  // Progressive Title 2 writing animation
  if (titleWords2.length) {
    const titleDuration2 = 0.06;
    const titleStep2 = titleDuration2 / Math.max(titleWords2.length, 1);
    storyTimeline.to(titleWords2, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      rotation: 0,
      stagger: titleStep2,
      duration: 0.04,
      ease: 'power2.out'
    }, 0.52);
  }

  // Progressive Paragraph 2 writing animation
  if (paraWords2.length) {
    const paraDuration2 = 0.13;
    const paraStep2 = paraDuration2 / Math.max(paraWords2.length, 1);
    storyTimeline.to(paraWords2, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      rotation: 0,
      stagger: paraStep2,
      duration: 0.035,
      ease: 'power2.out'
    }, 0.56);
  }

  if (exploreBtn2) {
    storyTimeline.to(exploreBtn2, {
      opacity: 1,
      y: 0,
      duration: 0.05,
      ease: 'power1.out'
    }, 0.68);
  }

  // Reading pause for Step 3
  storyTimeline.to({}, { duration: 0.06 }, 0.68);

  // -------------------------------------------------------------
  // STEP 4: (0.74 -> 1.00)
  // - Images on left and text on right fade out
  // - Center: Large Serif Climax Heading fades/scales in
  //   "Welcome to our hotel with your energetic smile"
  // - Heading stays held for ~10-12% scroll progress before pin releases
  // -------------------------------------------------------------
  // Fade out left images
  storyTimeline.to([card1, card2], {
    opacity: 0,
    y: -25,
    duration: 0.06,
    ease: 'power2.in'
  }, 0.74);

  // Fade out right Step 3 content
  if (step3Content) {
    storyTimeline.to(step3Content, {
      opacity: 0,
      y: -25,
      duration: 0.06,
      ease: 'power2.in',
      onComplete: () => { step3Content.style.pointerEvents = 'none'; }
    }, 0.74);
  }

  // Fade & scale in Center Climax Heading
  if (climaxBlock) {
    storyTimeline.to(climaxBlock, {
      opacity: 1,
      scale: 1.0,
      duration: 0.09,
      ease: 'power2.out',
      onStart: () => { climaxBlock.style.pointerEvents = 'auto'; }
    }, 0.79);
  }

    // Hold centered climax heading for the final ~12% of scroll before releasing pin
    storyTimeline.to({}, { duration: 0.12 }, 0.88);
  });

  // MOBILE CONTEXT: (max-width: 1024px) - Lightweight unpinned animations & gentle parallax
  mm.add("(max-width: 1024px)", () => {
    // 1. Reveal kinetic words and reset layout props
    allWords.forEach(w => {
      w.style.opacity = '1';
      w.style.transform = 'none';
      w.style.filter = 'none';
    });
    if (card1) gsap.set(card1, { clearProps: 'all', opacity: 1 });
    if (card2) gsap.set(card2, { display: 'none' });
    if (img1C) gsap.set(img1C, { opacity: 0, display: 'none' });
    if (img2D) gsap.set(img2D, { opacity: 0, display: 'none' });
    if (step1Content) gsap.set(step1Content, { clearProps: 'all', opacity: 1, pointerEvents: 'auto' });
    if (step3Content) gsap.set(step3Content, { clearProps: 'all', opacity: 1, pointerEvents: 'auto' });
    if (climaxBlock) gsap.set(climaxBlock, { clearProps: 'all', opacity: 1, pointerEvents: 'auto' });
    if (exploreBtn1) gsap.set(exploreBtn1, { clearProps: 'all', opacity: 1, y: 0 });
    if (exploreBtn2) gsap.set(exploreBtn2, { clearProps: 'all', opacity: 1, y: 0 });
    if (stickyStage) gsap.set(stickyStage, { clearProps: 'all' });

    // 2. Requirement 4: Gentle parallax on About image (y: -30 to 30, scrub: true)
    if (card1) {
      gsap.fromTo(card1,
        { y: -30 },
        {
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: card1,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }

    // 3. Requirement 3: Animate in with ScrollTrigger (trigger: element, start: "top 85%", once: true):
    // fade + translateY(40px to 0), duration 0.9, ease "power3.out", stagger 0.12 for children
    const mobileBlocks = [step1Content, step3Content, climaxBlock].filter(Boolean);
    mobileBlocks.forEach(block => {
      const children = Array.from(block.children).filter(el => !el.classList.contains('climax-accent-line'));
      if (children.length) {
        gsap.fromTo(children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    });
  });
}

/* ==========================================================================
   02 — ARCHITECTURAL LOOKBOOK (18-IMAGE RAPID 3D BOOK FLIPBOOK SHOWCASE)
   - 18 images sweep in from UPPER-RIGHT down to LEFT like rapidly switching book pages
   - Real 3D page curl, specular light beam, spine axis, and depth layering
   - Left-Top corner displays active picture number and name with reduced opacity
   - Synchronous 18-tick interactive scrubber, Prev/Next arrows, and Speed Flip auto-riffle
   ========================================================================== */
function initFloatingPerspectiveShowcase() {
  const section = document.getElementById('brand-story');
  const stage = document.getElementById('floating-perspective-stage');
  const deck = document.getElementById('flipbook-deck');
  const cards = Array.from(document.querySelectorAll('.flip-page-card'));
  const watermark = document.getElementById('perspective-watermark-text');
  const telemetryBadge = document.getElementById('motion-telemetry-badge');
  const cornerNum = document.getElementById('corner-pic-number');
  const cornerName = document.getElementById('corner-pic-name');
  const cornerCaption = document.getElementById('corner-pic-caption');
  const speedBtn = document.getElementById('flipbook-speed-btn');
  const speedLabel = document.getElementById('flipbook-speed-label');
  const prevBtn = document.getElementById('flip-nav-prev');
  const nextBtn = document.getElementById('flip-nav-next');
  const scrubBar = document.getElementById('flipbook-scrub-bar');
  const scrubTicks = Array.from(document.querySelectorAll('.scrub-tick'));
  const scrubFill = document.getElementById('scrub-progress-fill');

  if (!section || !stage || !deck || cards.length === 0) return;

  const FOLIO_DATA = [
    { num: '01', name: 'PREMIUM ROOMS', desc: 'Soundproof Sanctuary & Teak Craftsmanship' },
    { num: '02', name: 'LUXURY SUITES', desc: 'Panoramic Balcony & Marble Ensuite' },
    { num: '03', name: 'FINE DINING RESTAURANT', desc: 'The Wallflower Bistro & Global Cuisine' },
    { num: '04', name: 'CAFÉ & LOUNGE', desc: 'Artisanal Brews & Chesterfield Library' },
    { num: '05', name: 'ROOFTOP DINING', desc: 'Open Sky Terrace & Amber Sunset Views' },
    { num: '06', name: 'SWIMMING POOL', desc: 'Acoustic Stillness & Azure Waters' },
    { num: '07', name: 'FITNESS CENTER', desc: 'Cardio, Strength & Garden Horizons' },
    { num: '08', name: 'SPA & WELLNESS', desc: 'Ayurvedic Aromatherapy & Rejuvenation' },
    { num: '09', name: 'BANQUET & EVENT HALL', desc: 'Grand Galas, Receptions & Celebrations' },
    { num: '10', name: 'CONFERENCE ROOM', desc: 'Executive Boardroom & High-Tech AV' },
    { num: '11', name: '24X7 FRONT DESK', desc: 'Italian Marble Concierge & Warm Welcome' },
    { num: '12', name: 'VALET PARKING', desc: 'Secure Porte-Cochère & EV Charging' },
    { num: '13', name: 'HIGH-SPEED WI-FI', desc: 'Ultra-Fast Fiber Across Every Suite' },
    { num: '14', name: 'IN-ROOM DINING', desc: '24x7 Artisanal Gourmet Room Service' },
    { num: '15', name: 'AIRPORT SHUTTLE', desc: 'Chauffeured Transfers & Station Pickups' },
    { num: '16', name: 'LAUNDRY & DRY CLEANING', desc: 'Same-Day Express Garment Care' },
    { num: '17', name: 'CONCIERGE SERVICE', desc: 'Curated Kota Tours & Custom Itineraries' },
    { num: '18', name: 'PET-FRIENDLY STAYS', desc: 'Dedicated Pampered Pet Amenities' }
  ];

  const totalPages = cards.length;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    cards.forEach((card, idx) => {
      card.style.transform = 'none';
      card.style.opacity = idx === 0 ? '1' : '0.4';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Kill existing trigger if reinitialized
  const oldTrigger = ScrollTrigger.getById('floating-perspective-trigger');
  if (oldTrigger) oldTrigger.kill();

  const isMobile = () => window.innerWidth <= 768;

  // Geometry configuration for book page switch trajectory
  const getRightX = () => (isMobile() ? window.innerWidth * 0.32 : Math.max(260, window.innerWidth * 0.22));
  const getRightY = () => (isMobile() ? -45 : -60);
  const getLeftX = () => (isMobile() ? -window.innerWidth * 0.32 : -Math.max(260, window.innerWidth * 0.22));
  const getLeftY = () => (isMobile() ? 35 : 45);

  let activeIndex = 0;

  // Real-time UI indicator updater
  const updateUI = (idx, progress = null) => {
    const clampedIdx = Math.max(0, Math.min(totalPages - 1, idx));
    activeIndex = clampedIdx;
    const item = FOLIO_DATA[clampedIdx] || { num: String(clampedIdx + 1).padStart(2, '0'), name: 'HOTEL WALLFLOWER', desc: '' };

    if (cornerNum) cornerNum.textContent = `${item.num} / ${String(totalPages).padStart(2, '0')}`;
    if (cornerName) cornerName.textContent = item.name;
    if (cornerCaption) cornerCaption.textContent = item.desc;
    if (telemetryBadge) telemetryBadge.textContent = `FOLIO ${item.num} / ${String(totalPages).padStart(2, '0')} · ${item.name}`;

    // Update scrubber ticks
    scrubTicks.forEach((tick, tIdx) => {
      if (tIdx === clampedIdx) {
        tick.classList.add('active');
      } else {
        tick.classList.remove('active');
      }
    });

    if (scrubFill) {
      const p = progress !== null ? progress : clampedIdx / (totalPages - 1);
      scrubFill.style.width = `${Math.min(100, Math.max(0, p * 100))}%`;
    }
  };

  const mm = gsap.matchMedia();

  // DESKTOP CONTEXT: (min-width: 1025px) - Untouched original 3D continuous stack & pinned timeline
  mm.add("(min-width: 1025px)", () => {

  // ==========================================================================
  // CONTINUOUS 3D DEPTH & STACK RENDERER
  // Active Card: 1.30x larger, sharp (0px blur), bright (1.0)
  // Behind Cards (Right Stack): 3 to 4 visible stacked cards, smaller, blurred, darker
  // ==========================================================================
  function renderCardPositions(floatIdx) {
    const rX = getRightX();
    const rY = getRightY();
    const lX = getLeftX();
    const lY = getLeftY();

    cards.forEach((card, idx) => {
      const diff = idx - floatIdx;

      // Cull cards outside visible sliding window (-2.2 to +4.5)
      if (diff < -2.2 || diff > 4.6) {
        if (card.style.display !== 'none') {
          card.style.display = 'none';
          card.style.opacity = '0';
          card.classList.remove('active', 'is-visible');
        }
        return;
      }

      if (card.style.display === 'none') {
        card.style.display = 'block';
      }

      let x, y, z, rotX, rotY, rotZ, scale, blur, brightness, opacity, zIndex;

      if (diff >= 0) {
        // Active card and cards waiting on the right stack (0 to 4 cards)
        if (diff <= 1) {
          // Active card (diff=0, scale 1.30) to Card +1 (diff=1, scale 0.88)
          const t = diff;
          x = t * rX;
          y = t * rY;
          z = (1 - t) * 75 + t * 12;
          rotX = t * 5;
          rotY = t * -36;
          rotZ = t * 6;
          scale = 1.30 * (1 - t) + 0.88 * t;
          blur = t * 0.6;
          brightness = 1.0 * (1 - t) + 0.78 * t;
          opacity = 1.0 * (1 - t) + 0.95 * t;
          zIndex = Math.round(50 - t * 10);
        } else if (diff <= 2) {
          // Card +1 (scale 0.88) to Card +2 (scale 0.80)
          const t = diff - 1;
          x = rX + t * 38;
          y = rY - t * 22;
          z = 12 - t * 36;
          rotX = 5 + t * 1;
          rotY = -36 - t * 3;
          rotZ = 6 + t * 2;
          scale = 0.88 * (1 - t) + 0.80 * t;
          blur = 0.6 * (1 - t) + 1.8 * t;
          brightness = 0.78 * (1 - t) + 0.60 * t;
          opacity = 0.95 * (1 - t) + 0.82 * t;
          zIndex = Math.round(40 - t * 10);
        } else if (diff <= 3) {
          // Card +2 (scale 0.80) to Card +3 (scale 0.72)
          const t = diff - 2;
          x = rX + 38 + t * 36;
          y = rY - 22 - t * 20;
          z = -24 - t * 32;
          rotX = 6 + t * 1;
          rotY = -39 - t * 3;
          rotZ = 8 + t * 2;
          scale = 0.80 * (1 - t) + 0.72 * t;
          blur = 1.8 * (1 - t) + 3.0 * t;
          brightness = 0.60 * (1 - t) + 0.45 * t;
          opacity = 0.82 * (1 - t) + 0.68 * t;
          zIndex = Math.round(30 - t * 10);
        } else {
          // Card +3 (scale 0.72) to Card +4 (scale 0.65, dark & blurred deep stack)
          const t = Math.min(1.5, diff - 3) / 1.5;
          x = rX + 74 + t * 34;
          y = rY - 42 - t * 18;
          z = -56 - t * 30;
          rotX = 7 + t * 1;
          rotY = -42 - t * 3;
          rotZ = 10 + t * 2;
          scale = 0.72 * (1 - t) + 0.65 * t;
          blur = 3.0 * (1 - t) + 4.5 * t;
          brightness = 0.45 * (1 - t) + 0.30 * t;
          opacity = 0.68 * (1 - t);
          zIndex = 15;
        }
      } else {
        // Turned cards on the left stack (diff < 0)
        const neg = -diff;
        if (neg <= 1) {
          const t = neg;
          x = t * lX;
          y = t * lY;
          z = (1 - t) * 75 - t * 30;
          rotX = t * -4;
          rotY = t * 55;
          rotZ = t * -8;
          scale = 1.30 * (1 - t) + 0.82 * t;
          blur = t * 2.0;
          brightness = 1.0 * (1 - t) + 0.55 * t;
          opacity = 1.0 * (1 - t) + 0.65 * t;
          zIndex = Math.round(45 - t * 15);
        } else {
          const t = Math.min(1.2, neg - 1) / 1.2;
          x = lX - t * 35;
          y = lY + t * 18;
          z = -30 - t * 40;
          rotX = -4 - t * 1;
          rotY = 55 + t * 3;
          rotZ = -8 - t * 2;
          scale = 0.82 * (1 - t) + 0.75 * t;
          blur = 2.0 * (1 - t) + 3.8 * t;
          brightness = 0.55 * (1 - t) + 0.30 * t;
          opacity = 0.65 * (1 - t);
          zIndex = 10;
        }
      }

      const isActive = Math.abs(diff) < 0.45;
      if (isActive) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }

      card.classList.add('is-visible');
      card.style.zIndex = zIndex;
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = `blur(${blur.toFixed(1)}px) brightness(${brightness.toFixed(2)})`;
      card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) rotateZ(${rotZ.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
    });
  }

  // Initial render at page 0
  renderCardPositions(0);

  // Main ScrollTrigger: pins stage and smoothly scrubs 3D stack positions
  const scrollTriggerInstance = ScrollTrigger.create({
    id: 'floating-perspective-trigger',
    trigger: section,
    pin: stage,
    start: 'top top',
    end: '+=280%',
    scrub: 0.65, // Silky smooth organic scrub
    pinSpacing: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const p = self.progress;
      const floatIdx = p * (totalPages - 1);
      const targetIdx = Math.min(totalPages - 1, Math.round(floatIdx));

      renderCardPositions(floatIdx);
      updateUI(targetIdx, p);
    }
  });

  // Speed Flip (Autoplay Riffle) Engine
  let isSpeedFlipping = false;
  let speedTween = null;

  const stopSpeedFlip = () => {
    if (speedTween) {
      speedTween.kill();
      speedTween = null;
    }
    isSpeedFlipping = false;
    if (speedBtn) speedBtn.classList.remove('is-active');
    if (speedLabel) speedLabel.textContent = 'SPEED FLIP';
  };

  const startSpeedFlip = () => {
    isSpeedFlipping = true;
    if (speedBtn) speedBtn.classList.add('is-active');
    if (speedLabel) speedLabel.textContent = 'PAUSE';

    // If already at end, rewind to start
    const currentP = scrollTriggerInstance.progress;
    const startP = currentP >= 0.98 ? 0 : currentP;

    // Rapid riffle speed: ~2.4 seconds across all 18 images
    const remainingP = 1.0 - startP;
    const duration = Math.max(1.4, remainingP * 2.8);

    const stStart = scrollTriggerInstance.start;
    const stEnd = scrollTriggerInstance.end;
    const targetScroll = stStart + (stEnd - stStart);

    if (startP === 0) {
      if (window.lenis) {
        window.lenis.scrollTo(stStart, { immediate: true });
      } else {
        window.scrollTo({ top: stStart, behavior: 'auto' });
      }
    }

    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, {
        duration: duration,
        easing: (t) => t,
        onComplete: stopSpeedFlip
      });
    } else {
      const scrollObj = { y: window.scrollY };
      speedTween = gsap.to(scrollObj, {
        y: targetScroll,
        duration: duration,
        ease: 'none',
        onUpdate: () => window.scrollTo(0, scrollObj.y),
        onComplete: stopSpeedFlip
      });
    }
  };

  if (speedBtn) {
    speedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isSpeedFlipping) {
        stopSpeedFlip();
      } else {
        startSpeedFlip();
      }
    });
  }

  // Prev / Next Folio Page Jump Buttons
  const navigateToPage = (targetIdx) => {
    stopSpeedFlip();
    const clamped = Math.max(0, Math.min(totalPages - 1, targetIdx));
    const targetProgress = clamped / (totalPages - 1);
    const stStart = scrollTriggerInstance.start;
    const stEnd = scrollTriggerInstance.end;
    const targetScroll = stStart + targetProgress * (stEnd - stStart);

    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, { duration: 0.65 });
    } else {
      const scrollObj = { y: window.scrollY };
      gsap.to(scrollObj, {
        y: targetScroll,
        duration: 0.65,
        ease: 'power2.out',
        onUpdate: () => window.scrollTo(0, scrollObj.y)
      });
    }
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToPage(activeIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToPage(activeIndex + 1);
    });
  }

  // 18-Tick Interactive Scrubber Click & Drag
  scrubTicks.forEach((tick, idx) => {
    tick.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToPage(idx);
    });
  });

  // Enable direct click on timeline bar
  if (scrubBar) {
    scrubBar.addEventListener('click', (e) => {
      if (e.target.classList.contains('scrub-tick')) return;
      const rect = scrubBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const p = Math.max(0, Math.min(1, clickX / rect.width));
      const targetIdx = Math.floor(p * totalPages);
      navigateToPage(targetIdx);
    });
  }

  // Card click: clicking active card advances to next page
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      if (idx === activeIndex) {
        navigateToPage(activeIndex + 1 >= totalPages ? 0 : activeIndex + 1);
      } else {
        navigateToPage(idx);
      }
    });
  });

  // Initial update
  updateUI(0, 0);
  });

  // MOBILE CONTEXT: (max-width: 1024px) - Lightweight touch swipe Lookbook
  mm.add("(max-width: 1024px)", () => {
    gsap.set(section, { clearProps: 'all' });
    gsap.set(stage, { clearProps: 'all' });

    let mobileActiveIdx = 0;

    const renderMobileCards = (targetIdx, immediate = false) => {
      mobileActiveIdx = Math.max(0, Math.min(totalPages - 1, targetIdx));
      updateUI(mobileActiveIdx, mobileActiveIdx / (totalPages - 1));

      cards.forEach((card, idx) => {
        const diff = idx - mobileActiveIdx;

        if (diff === 0) {
          // One large centered card with 3D tilt reduced (rotateX 6deg max)
          card.style.display = 'block';
          card.style.zIndex = '10';
          card.classList.add('active', 'is-visible');

          if (immediate) {
            gsap.set(card, {
              x: 0,
              y: 0,
              scale: 1.0,
              rotateX: 6,
              rotateY: 0,
              rotateZ: 0,
              opacity: 1,
              filter: 'none'
            });
          } else {
            gsap.to(card, {
              x: 0,
              y: 0,
              scale: 1.0,
              rotateX: 6,
              rotateY: 0,
              rotateZ: 0,
              opacity: 1,
              filter: 'none',
              duration: 0.6,
              ease: 'power3.out'
            });
          }
        } else if (diff === 1 || (mobileActiveIdx === totalPages - 1 && idx === 0)) {
          // Next card peeking behind it
          card.style.display = 'block';
          card.style.zIndex = '5';
          card.classList.remove('active');
          card.classList.add('is-visible');

          if (immediate) {
            gsap.set(card, {
              x: 28,
              y: 0,
              scale: 0.92,
              rotateX: 8,
              rotateY: 0,
              rotateZ: 0,
              opacity: 0.45,
              filter: 'none'
            });
          } else {
            gsap.to(card, {
              x: 28,
              y: 0,
              scale: 0.92,
              rotateX: 8,
              rotateY: 0,
              rotateZ: 0,
              opacity: 0.45,
              filter: 'none',
              duration: 0.6,
              ease: 'power3.out'
            });
          }
        } else {
          card.classList.remove('active', 'is-visible');
          if (immediate) {
            card.style.display = 'none';
            gsap.set(card, { opacity: 0 });
          } else {
            gsap.to(card, {
              opacity: 0,
              duration: 0.35,
              ease: 'power2.in',
              onComplete: () => {
                const currentDiff = idx - mobileActiveIdx;
                if (currentDiff !== 0 && currentDiff !== 1 && !(mobileActiveIdx === totalPages - 1 && idx === 0)) {
                  card.style.display = 'none';
                }
              }
            });
          }
        }
      });
    };

    renderMobileCards(0, true);

    // Touch swipe left/right to change cards
    let touchStartX = 0;
    let touchStartY = 0;
    const motionCanvas = document.getElementById('floating-motion-canvas') || stage;

    const onTouchStart = (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    };

    const onTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;
      if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          renderMobileCards(mobileActiveIdx < totalPages - 1 ? mobileActiveIdx + 1 : 0);
        } else {
          renderMobileCards(mobileActiveIdx > 0 ? mobileActiveIdx - 1 : totalPages - 1);
        }
      }
    };

    motionCanvas.addEventListener('touchstart', onTouchStart, { passive: true });
    motionCanvas.addEventListener('touchend', onTouchEnd, { passive: true });

    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.preventDefault();
        renderMobileCards(mobileActiveIdx > 0 ? mobileActiveIdx - 1 : totalPages - 1);
      };
    }

    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.preventDefault();
        renderMobileCards(mobileActiveIdx < totalPages - 1 ? mobileActiveIdx + 1 : 0);
      };
    }

    scrubTicks.forEach((tick, idx) => {
      tick.onclick = (e) => {
        e.preventDefault();
        renderMobileCards(idx);
      };
    });

    if (scrubBar) {
      scrubBar.onclick = (e) => {
        if (e.target.classList.contains('scrub-tick')) return;
        const rect = scrubBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const p = Math.max(0, Math.min(1, clickX / rect.width));
        renderMobileCards(Math.floor(p * totalPages));
      };
    }

    cards.forEach((card, idx) => {
      card.onclick = () => {
        if (idx === mobileActiveIdx) {
          renderMobileCards(mobileActiveIdx < totalPages - 1 ? mobileActiveIdx + 1 : 0);
        } else {
          renderMobileCards(idx);
        }
      };
    });

    // Reveal animation on scroll (fade + translateY)
    gsap.from(stage, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        once: true
      }
    });
  });
}

/* ==========================================================================
   03 — ROOMS & SUITES: HORIZONTAL PINNED TRACK (DESKTOP) & SWIPE (MOBILE)
   - Large "STAY YOUR WAY" heading
   - Desktop: pins section and translates track based on trackWidth - viewportWidth
   - Recalculates dynamically on resize
   - Thin progress bar indicator (0% to 100%)
   - Mobile and tablet portrait: native horizontal swipe with scroll-snap
   - Page itself never scrolls horizontally
   - Keyboard arrow access and prefers-reduced-motion respect
   ========================================================================== */
/* ==========================================================================
   03 — ROOMS & SUITES: CINEMATIC GLIDER SHOWCASE WITH ATTACHED GLIDING SEMI-MENU
   - Seamless glider track with attached frosted obsidian glass semi-menu
   - Smooth synchronized gliding motion transitions
   - Desktop pinned GSAP ScrollTrigger with scrub
   - Tab pills with smooth fluid glider highlight
   - Prev/Next arrows & keyboard arrow navigation
   - Mobile touch swipe support
   - Links to Specs Modal and Reserve Stay Modal
   ========================================================================== */
function initRoomsGliderShowcase() {
  const section = document.getElementById('rooms-track');
  const viewport = document.getElementById('rooms-pinned-viewport');
  const stage = document.getElementById('rooms-glider-stage');
  const scenicViewport = document.getElementById('glider-scenic-viewport');
  const track = document.getElementById('glider-scenic-track');
  const slides = document.querySelectorAll('.glider-scenic-slide');
  const tabs = document.querySelectorAll('.glider-tab');
  const tabPill = document.getElementById('glider-tab-pill');
  const progressBar = document.getElementById('rooms-progress-bar');
  const prevBtn = document.getElementById('rooms-glider-prev');
  const nextBtn = document.getElementById('rooms-glider-next');

  // Attached Semi-Menu Elements
  const semiCard = document.getElementById('semi-menu-content-card');
  const axisFill = document.getElementById('semi-axis-fill');
  const axisCounter = document.getElementById('semi-menu-counter');
  const roomBadge = document.getElementById('semi-room-badge');
  const roomCategory = document.getElementById('semi-room-category');
  const roomPrice = document.getElementById('semi-room-price');
  const roomName = document.getElementById('semi-room-name');
  const roomTagline = document.getElementById('semi-room-tagline');
  const roomDesc = document.getElementById('semi-room-desc');
  const specSize = document.getElementById('semi-spec-size');
  const specBed = document.getElementById('semi-spec-bed');
  const specGuests = document.getElementById('semi-spec-guests');
  const specView = document.getElementById('semi-spec-view');
  const amenitiesBox = document.getElementById('semi-room-amenities');
  const specsBtn = document.getElementById('btn-semi-specs');
  const reserveBtn = document.getElementById('btn-semi-reserve');

  if (!section || !viewport || !track || !semiCard) return;

  const ROOMS = [
    {
      id: "deluxe-executive",
      badge: "SANCTUARY 01",
      category: "DELUXE SUITE",
      price: "₹2,499",
      name: "Deluxe Executive Room",
      tagline: "Contemporary Comfort with City Views",
      desc: "Thoughtfully crafted for business professionals and visiting parents, featuring premium bedding, an ergonomic workstation, and serene city views.",
      specs: {
        size: "300 sq. ft",
        bed: "1 King Bed",
        guests: "2 Guests",
        view: "Kota City View"
      },
      amenities: ["King Size Bed", "Workstation", "Rain Shower", "Free Breakfast"]
    },
    {
      id: "superior-twin",
      badge: "SANCTUARY 02",
      category: "TWIN SUITE",
      price: "₹2,299",
      name: "Superior Twin Room",
      tagline: "Ideal for Students, Parents & Colleagues",
      desc: "Tailored specifically for student-parent duos or visiting colleagues, with dual dedicated study/work desks and tranquil acoustic comfort.",
      specs: {
        size: "320 sq. ft",
        bed: "2 Twin Beds",
        guests: "2 Guests",
        view: "Courtyard View"
      },
      amenities: ["2 Single Beds", "Study Workstation", "Sound Insulated", "Free WiFi"]
    },
    {
      id: "super-deluxe-balcony",
      badge: "SANCTUARY 03",
      category: "BALCONY SUITE",
      price: "₹3,299",
      name: "Super Deluxe Room with Balcony",
      tagline: "Boutique Elegance with Private Sit-Out",
      desc: "Spacious boutique room featuring a private balcony overlooking Kota's cityscape, cozy lounge seating, and complimentary evening tea.",
      specs: {
        size: "380 sq. ft",
        bed: "King + Daybed",
        guests: "2–3 Guests",
        view: "Private Balcony"
      },
      amenities: ["Private Balcony", "King + Daybed", "Mini Fridge", "Buffet Breakfast"]
    },
    {
      id: "premium-royal-suite",
      badge: "SANCTUARY 04",
      category: "ROYAL SUITE",
      price: "₹4,499",
      name: "Premium Royal Suite",
      tagline: "Opulent Living with Private Salon",
      desc: "An exquisite suite featuring a private living room with velvet Chesterfields, dining table, opulent bedroom, and VIP amenities.",
      specs: {
        size: "490 sq. ft",
        bed: "1 King Bed",
        guests: "3 Guests",
        view: "Separate Lounge"
      },
      amenities: ["Separate Living Area", "2x 55\" Smart TVs", "Bathtub & Rain Shower", "VIP Welcome"]
    },
    {
      id: "presidential-wallflower-suite",
      badge: "SANCTUARY 05",
      category: "FLAGSHIP RESIDENCE",
      price: "₹6,999",
      name: "Presidential Wallflower Suite",
      tagline: "The Pinnacle of Boutique Splendor",
      desc: "The pinnacle of hospitality in Kota featuring an expansive private salon, marble jacuzzi bath, and dedicated butler service.",
      specs: {
        size: "750 sq. ft",
        bed: "King Residence",
        guests: "2–4 Guests",
        view: "Jacuzzi & Butler"
      },
      amenities: ["750 Sq.Ft Penthouse", "Jacuzzi Whirlpool", "Dedicated Butler", "Terrace Vista"]
    }
  ];

  let currentIdx = 0;
  let isGliding = false;
  let scrollTriggerInstance = null;

  const isReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = () => window.innerWidth > 1024 && !isReducedMotion();

  // Position the Glider Tab highlight pill over active tab
  const updateTabPill = (idx) => {
    if (!tabPill || !tabs[idx]) return;
    const targetTab = tabs[idx];
    tabPill.style.transform = `translateX(${targetTab.offsetLeft}px)`;
    tabPill.style.width = `${targetTab.offsetWidth}px`;
    
    tabs.forEach((tab, i) => {
      const active = i === idx;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  };

  // Update Attached Semi-Menu Content with Gliding Animation
  const updateAttachedSemiMenu = (idx) => {
    const room = ROOMS[idx];
    if (!room) return;

    // Trigger attached gliding motion shift
    semiCard.classList.add('gliding');

    setTimeout(() => {
      if (roomBadge) roomBadge.textContent = room.badge;
      if (roomCategory) roomCategory.textContent = room.category;
      if (roomPrice) roomPrice.textContent = room.price;
      if (roomName) roomName.textContent = room.name;
      if (roomTagline) roomTagline.textContent = room.tagline;
      if (roomDesc) roomDesc.textContent = room.desc;

      if (specSize) specSize.textContent = room.specs.size;
      if (specBed) specBed.textContent = room.specs.bed;
      if (specGuests) specGuests.textContent = room.specs.guests;
      if (specView) specView.textContent = room.specs.view;

      if (amenitiesBox) {
        amenitiesBox.innerHTML = room.amenities
          .map(a => `<span class="semi-amenity-pill">${a}</span>`)
          .join('');
      }

      // Wire Action Buttons
      if (specsBtn) {
        specsBtn.onclick = (e) => {
          e.preventDefault();
          if (typeof window.openRoomDetailsModal === 'function') {
            window.openRoomDetailsModal(room.id);
          }
        };
      }

      if (reserveBtn) {
        reserveBtn.onclick = (e) => {
          e.preventDefault();
          if (typeof window.openBookingModal === 'function') {
            window.openBookingModal({ roomType: room.id });
          }
        };
      }

      // Settle glide motion
      semiCard.classList.remove('gliding');
    }, 150);
  };

  // Main Glide Controller
  const glideTo = (idx, syncScroll = false) => {
    if (idx < 0) idx = 0;
    if (idx >= ROOMS.length) idx = ROOMS.length - 1;
    if (idx === currentIdx && isGliding) return;

    currentIdx = idx;
    isGliding = true;

    // 1. Slide Scenic Glider Track (5 slides = 20% each)
    track.style.transform = `translateX(-${idx * 20}%)`;

    // 2. Active slide styling
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });

    // 3. Tab Pill & Progress
    updateTabPill(idx);
    if (tabs[idx] && window.innerWidth <= 768) {
      tabs[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    const progressFrac = (idx + 1) / ROOMS.length;
    if (progressBar) {
      progressBar.style.transform = `scaleX(${progressFrac})`;
      const progParent = progressBar.parentElement;
      if (progParent) progParent.setAttribute('aria-valuenow', Math.round(progressFrac * 100));
    }

    // 4. Axis Indicator
    if (axisFill) axisFill.style.width = `${progressFrac * 100}%`;
    if (axisCounter) axisCounter.textContent = `0${idx + 1} / 05`;

    // 5. Attached Semi-Menu Gliding Effect
    updateAttachedSemiMenu(idx);

    // 6. Sync ScrollTrigger if requested (e.g. from tab click or arrow)
    if (syncScroll && scrollTriggerInstance && isDesktop()) {
      const scrollDist = scrollTriggerInstance.end - scrollTriggerInstance.start;
      const targetScroll = scrollTriggerInstance.start + (idx / (ROOMS.length - 1)) * scrollDist;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }

    setTimeout(() => {
      isGliding = false;
    }, 450);
  };

  // Tab Click Events
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-room-idx'), 10);
      if (!isNaN(idx)) {
        glideTo(idx, true);
      }
    });
  });

  // Prev / Next Arrows
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const prevIdx = currentIdx > 0 ? currentIdx - 1 : ROOMS.length - 1;
      glideTo(prevIdx, true);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextIdx = currentIdx < ROOMS.length - 1 ? currentIdx + 1 : 0;
      glideTo(nextIdx, true);
    });
  }

  // Keyboard Navigation
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      const nextIdx = Math.min(ROOMS.length - 1, currentIdx + 1);
      glideTo(nextIdx, true);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      const prevIdx = Math.max(0, currentIdx - 1);
      glideTo(prevIdx, true);
      e.preventDefault();
    }
  });

  // Mobile / Touch Swipe Navigation
  let touchStartX = 0;
  let touchEndX = 0;
  if (scenicViewport) {
    scenicViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    scenicViewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 45) {
        if (diff > 0 && currentIdx < ROOMS.length - 1) {
          glideTo(currentIdx + 1, false);
        } else if (diff < 0 && currentIdx > 0) {
          glideTo(currentIdx - 1, false);
        }
      }
    }, { passive: true });
  }

  // Setup GSAP Desktop Pinned ScrollTrigger with gsap.matchMedia
  const setupDesktopPinnedScroll = () => {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
      scrollTriggerInstance = null;
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      // DESKTOP CONTEXT: (min-width: 1025px) - Untouched original pinned glider track
      mm.add("(min-width: 1025px)", () => {
        const scrollDistance = window.innerHeight * 2.2;

        scrollTriggerInstance = ScrollTrigger.create({
          id: 'rooms-glider-pin',
          trigger: section,
          pin: viewport,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 0.35,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const targetIdx = Math.min(ROOMS.length - 1, Math.floor(progress * ROOMS.length));
            if (targetIdx !== currentIdx) {
              glideTo(targetIdx, false);
            }
          }
        });
      });

      // MOBILE CONTEXT: (max-width: 1024px) - Unpinned lightweight stage reveal
      mm.add("(max-width: 1024px)", () => {
        gsap.set(viewport, { clearProps: 'all' });
        gsap.set(section, { clearProps: 'all' });

        gsap.from(stage, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true
          }
        });
      });
    }
  };

  // Initialize Showcase State
  glideTo(0, false);
  setupDesktopPinnedScroll();

  // Resize Listener with debounce
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateTabPill(currentIdx);
      setupDesktopPinnedScroll();
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 150);
  });
}

/* ==========================================================================
   04 — THE ATMOSPHERE: EDITORIAL COMPOSITION & SUBTLE REVEAL
   - Short editorial statement + One strong verified photograph
   - Subtle scroll reveal via IntersectionObserver
   - Subtle, light parallax on desktop only (kept buttery smooth on mobile)
   - Bypassed under prefers-reduced-motion
   ========================================================================== */
function initAtmosphereReveal() {
  const section = document.getElementById('hotel-experience');
  if (!section) return;

  const statementBlock = document.getElementById('atmosphere-statement');
  const imageShowcase = document.getElementById('atmosphere-image-showcase');
  const photoImg = document.getElementById('atmosphere-img');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    if (statementBlock) statementBlock.classList.add('in-view');
    if (imageShowcase) imageShowcase.classList.add('in-view');
    return;
  }

  // 1. Reveal on IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    if (statementBlock) observer.observe(statementBlock);
    if (imageShowcase) observer.observe(imageShowcase);
  } else {
    if (statementBlock) statementBlock.classList.add('in-view');
    if (imageShowcase) imageShowcase.classList.add('in-view');
  }

  // 2. Desktop-only subtle parallax (never on mobile or small tablets to preserve 60fps)
  const isDesktop = () => window.innerWidth > 1024 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (photoImg) {
    let ticking = false;

    const onScroll = () => {
      if (!isDesktop()) {
        photoImg.style.transform = '';
        ticking = false;
        return;
      }

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate scroll progress through the section
        const totalDist = windowHeight + section.offsetHeight;
        const currentDist = windowHeight - rect.top;
        const progress = Math.min(1, Math.max(0, currentDist / totalDist));
        // Subtle vertical parallax movement: -18px to +18px
        const translateY = (progress - 0.5) * 36;
        photoImg.style.transform = `scale(1.04) translateY(${translateY.toFixed(2)}px)`;
      }

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (!isDesktop()) {
        photoImg.style.transform = '';
      }
    });

    onScroll();
  }
}

/* ==========================================================================
   05 — A MOMENT TO REMEMBER: FULL-WIDTH STATEMENT (IMAGE MASK REVEAL)
   ========================================================================== */
function initStatementMaskReveal() {
  const section = document.getElementById('statement-moment');
  const viewport = document.getElementById('statement-viewport');
  const bgImg = document.getElementById('statement-bg-img');

  if (!section || !viewport) return;

  if (window.innerWidth <= 1024) {
    viewport.style.clipPath = 'none';
    return;
  }

  let ticking = false;

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top <= windowHeight && rect.bottom >= 0) {
      const totalDist = windowHeight + section.offsetHeight;
      const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / (totalDist * 0.75)));

      // Expand clip-path mask from inset(7% 6% round 20px) down to inset(0% 0% round 0px)
      const insetY = Math.max(0, (1 - progress) * 7);
      const insetX = Math.max(0, (1 - progress) * 6);
      const roundR = Math.max(0, (1 - progress) * 20);

      viewport.style.clipPath = `inset(${insetY.toFixed(2)}% ${insetX.toFixed(2)}% round ${roundR.toFixed(1)}px)`;

      if (bgImg) {
        const scale = 1.08 - (progress * 0.08); // slow cinematic zoom-out
        bgImg.style.transform = `scale(${scale.toFixed(4)})`;
      }
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  onScroll();
}

/* ==========================================================================
   06 — BOOK YOUR STAY: QUICK RESERVATION FLOW CONSOLE
   ========================================================================== */
function initHomepageQuickBookForm() {
  const checkinInput = document.getElementById('flow-checkin');
  const checkoutInput = document.getElementById('flow-checkout');
  const guestsSelect = document.getElementById('flow-guests');
  const suiteSelect = document.getElementById('flow-suite');
  const form = document.getElementById('homepage-quick-book-form');

  if (!form) return;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  if (checkinInput && checkoutInput) {
    checkinInput.min = formatDate(today);
    checkinInput.value = formatDate(today);
    checkoutInput.min = formatDate(tomorrow);
    checkoutInput.value = formatDate(tomorrow);

    checkinInput.addEventListener('change', () => {
      const selDate = new Date(checkinInput.value);
      const nextDay = new Date(selDate);
      nextDay.setDate(nextDay.getDate() + 1);
      checkoutInput.min = formatDate(nextDay);
      if (new Date(checkoutInput.value) <= selDate) {
        checkoutInput.value = formatDate(nextDay);
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const checkin = checkinInput ? checkinInput.value : '';
    const checkout = checkoutInput ? checkoutInput.value : '';
    const guests = guestsSelect ? guestsSelect.value : '2';
    const roomType = suiteSelect ? suiteSelect.value : 'deluxe-executive';

    if (typeof window.openBookingModal === 'function') {
      window.openBookingModal({ checkin, checkout, guests, roomType });
    }
  });
}

/* ==========================================================================
   07 — MOBILE MOTION SUITE (GSAP + ScrollTrigger for max-width: 1024px)
   - Hero text fade-up on load (handled in initScrollDrivenHero)
   - Section labels slide in (x: -30 to 0, opacity: 0 to 1)
   - Images scale from 1.08 to 1 on reveal
   - Gold lines draw in (scaleX: 0 to 1)
   - Content blocks animate with fade + translateY(40px to 0), stagger 0.12 for children
   - Pure transform and opacity only
   ========================================================================== */
function initMobileMotionSuite() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const mm = gsap.matchMedia();

  mm.add("(max-width: 1024px)", () => {
    // 1. Section labels slide in (x: -30 to 0, opacity: 0 to 1)
    const labels = document.querySelectorAll('.chapter-kicker, .story-kicker-badge, .perspective-badge-pill');
    labels.forEach(label => {
      gsap.fromTo(label,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: label,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // 2. Images scale from 1.08 to 1 on reveal
    const imagesToScale = document.querySelectorAll(
      '#atmosphere-img, .page-card-photo, .glider-scenic-slide.active img, #statement-bg-img'
    );
    imagesToScale.forEach(img => {
      gsap.fromTo(img,
        { scale: 1.08 },
        {
          scale: 1.0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img.closest('section') || img,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // 3. Gold lines draw in (scaleX: 0 to 1)
    const lines = document.querySelectorAll('.perspective-divider-line, .climax-accent-line');
    lines.forEach(line => {
      gsap.fromTo(line,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // 4. Atmosphere, Statement & Reservation Invitation content blocks:
    // fade + translateY(40px to 0), duration 0.9, ease power3.out, stagger 0.12 for children
    const sectionsToAnimate = [
      document.getElementById('atmosphere-statement'),
      document.querySelector('.statement-content'),
      document.querySelector('.invitation-header')
    ].filter(Boolean);

    sectionsToAnimate.forEach(sectionEl => {
      const children = Array.from(sectionEl.children);
      if (children.length) {
        gsap.fromTo(children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    });
  });
}

