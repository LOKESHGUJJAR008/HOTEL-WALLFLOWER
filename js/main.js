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
  initBrandStoryParallax();
  initRoomsHorizontalTrack();
  initAtmosphereReveal();
  initStatementMaskReveal();
  initHomepageQuickBookForm();
  initRooms3DMotionframeSlider();
  initRedCarpetWelcomeAnimation();
});

// Refresh ScrollTrigger when window loads and web fonts are fully rendered
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
});

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
        <img src="${item.src}" alt="${item.title}" loading="lazy">
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
  if (prefersReducedMotion || typeof Lenis === 'undefined') return;

  lenisInstance = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false
  });

  if (typeof ScrollTrigger !== 'undefined') {
    lenisInstance.on('scroll', ScrollTrigger.update);
  }

  if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

/* ==========================================================================
   SCROLL-DRIVEN HERO PIN & SHRINK (GSAP + ScrollTrigger, scrub: true)
   - Pins hero at top
   - Height shrinks 100vh -> 28vh (35svh on mobile)
   - 3 Images crossfade: 0-33%, 33-66%, 66-100% with scale 1.15 -> 1.0 parallax
   - Logo centers then shifts to bottom-center of the 28vh strip, shrinks
   - "HOTEL" subtext fades in under the logo
   - Incoming content (tagline + carousel) slides up in normal flow
   - Top nav fades in after 10% scroll progress (transparent -> blur background)
   - Bypassed under prefers-reduced-motion
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

  const isMobile = () => window.innerWidth <= 768;

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Clean up any existing trigger
    const existing = ScrollTrigger.getById('hero-shrink-trigger');
    if (existing) existing.kill();

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
          // Top navigation fades in after 10% scroll progress
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
      const targetScale = isMobile() ? 0.44 : 0.40;
      const targetY = isMobile() ? 12 : 16;
      heroTimeline.to(wordmark, {
        scale: targetScale,
        y: targetY,
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
    if (carouselTrack && !isMobile()) {
      heroTimeline.fromTo(carouselTrack,
        { x: 20 },
        { x: -40, ease: 'none', duration: 0.4 },
        0.60
      );
    }

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
  const paragraph1 = document.getElementById('story-reveal-p1');
  const exploreBtn1 = step1Content ? step1Content.querySelector('.btn-story-explore') : null;
  const step3Content = document.getElementById('story-step3-content');
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

  // Word-by-word span splitting for #story-reveal-p1
  if (paragraph1 && !paragraph1.querySelector('.story-word')) {
    const rawText1 = paragraph1.textContent.trim();
    paragraph1.innerHTML = rawText1.split(/\s+/).map(w => `<span class="story-word">${w}</span>`).join(' ');
  }
  const words1 = paragraph1 ? paragraph1.querySelectorAll('.story-word') : [];

  // Word-by-word span splitting for #story-reveal-p2
  if (paragraph2 && !paragraph2.querySelector('.story-word')) {
    const rawText2 = paragraph2.textContent.trim();
    paragraph2.innerHTML = rawText2.split(/\s+/).map(w => `<span class="story-word">${w}</span>`).join(' ');
  }
  const words2 = paragraph2 ? paragraph2.querySelectorAll('.story-word') : [];

  // Reduced motion check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    if (words1.length) words1.forEach(w => w.style.opacity = '1');
    if (words2.length) words2.forEach(w => w.style.opacity = '1');
    if (card1) {
      card1.style.opacity = '1';
      card1.style.transform = 'scale(0.85)';
    }
    if (card2) {
      card2.style.opacity = '1';
      card2.style.transform = 'scale(0.85)';
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
    if (words1.length) words1.forEach(w => w.style.opacity = '1');
    if (words2.length) words2.forEach(w => w.style.opacity = '1');
    if (card1) card1.style.opacity = '1';
    if (card2) card2.style.opacity = '1';
    if (step3Content) step3Content.style.opacity = '1';
    if (climaxBlock) climaxBlock.style.opacity = '1';
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Clean up previous trigger if reinitialized
  const existingTrigger = ScrollTrigger.getById('storytelling-pinned-trigger');
  if (existingTrigger) existingTrigger.kill();

  // Dynamic distance calculation for cluster slide (from right column to left column)
  const getClusterSlideDistance = () => {
    if (window.innerWidth <= 768) return 0; // Stacked vertically on mobile
    const colLeft = document.getElementById('storytelling-col-left');
    const colRight = document.getElementById('storytelling-col-right');
    if (colLeft && colRight) {
      const leftRect = colLeft.getBoundingClientRect();
      const rightRect = colRight.getBoundingClientRect();
      const diff = rightRect.left - leftRect.left;
      return -diff;
    }
    return -520;
  };

  // 1. Initial State:
  // Right side: Image A is small (scale 0.6, rotation -6deg), Image B is big (scale 1.0, rotation +4deg)
  gsap.set(card1, { x: 0, y: 120, scale: 0.6, rotation: -6, opacity: 0 });
  gsap.set(card2, { x: 0, y: 140, scale: 1.0, rotation: 4, opacity: 0 });
  if (words1.length) gsap.set(words1, { opacity: 0.15 });
  if (exploreBtn1) gsap.set(exploreBtn1, { opacity: 0, y: 16 });
  if (img1C) gsap.set(img1C, { opacity: 0, scale: 1.1 });
  if (img2D) gsap.set(img2D, { opacity: 0, scale: 1.1 });

  if (step3Content) gsap.set(step3Content, { opacity: 0, y: 24, pointerEvents: 'none' });
  if (words2.length) gsap.set(words2, { opacity: 0.15 });
  if (exploreBtn2) gsap.set(exploreBtn2, { opacity: 0, y: 16 });
  if (climaxBlock) gsap.set(climaxBlock, { opacity: 0, scale: 0.92, pointerEvents: 'none' });

  // 2. Autonomous Idle Float on INNER wrappers (avoids conflict with outer scroll timeline)
  if (inner1) {
    gsap.to(inner1, {
      y: 10,
      rotation: 1.5,
      duration: 4.0,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }
  if (inner2) {
    gsap.to(inner2, {
      y: -10,
      rotation: -1.5,
      duration: 5.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }

  // 3. Main ScrollTrigger timeline (pin length +=500%, scrub: 0.6)
  const storyTimeline = gsap.timeline({
    scrollTrigger: {
      id: 'storytelling-pinned-trigger',
      trigger: section,
      pin: stickyStage,
      start: 'top top',
      end: '+=500%',
      scrub: 0.6, // Smooth organic scrub
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  // -------------------------------------------------------------
  // STEP 1: (0.00 -> 0.24)
  // - Right: Image A (scale 0.6) and Image B (scale 1.0) rise with stagger
  // - Left: paragraph words reveal opacity 0.15 -> 1.0
  // - Left: explore button fades in
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

  if (words1.length) {
    const totalStagger = 0.15;
    const stepDuration = totalStagger / Math.max(words1.length, 1);
    storyTimeline.to(words1, {
      opacity: 1,
      stagger: stepDuration,
      duration: 0.05,
      ease: 'none'
    }, 0.02);
  }

  if (exploreBtn1) {
    storyTimeline.to(exploreBtn1, {
      opacity: 1,
      y: 0,
      duration: 0.05,
      ease: 'power1.out'
    }, 0.16);
  }

  // Pacing settle for reading Step 1
  storyTimeline.to({}, { duration: 0.03 }, 0.21);

  // -------------------------------------------------------------
  // STEP 2: (0.24 -> 0.50)
  // - Left: Step 1 content block fades out (y: 0 -> -30px)
  // - Crossfade images: Card 1 (A -> C) & Card 2 (B -> D)
  // - MOTION: "Azaad Parinda" S-curve travel, ~15% follow lag, scale swap
  //     Image A: leads, scale 0.6 -> 1.0, rot -6deg -> +3deg, y arc (0 -> -40 -> 0)
  //     Image B: follows ~15% behind, scale 1.0 -> 0.6, rot +4deg -> -4deg, y arc (0 -> +45 -> 0)
  // -------------------------------------------------------------
  if (step1Content) {
    storyTimeline.to(step1Content, {
      opacity: 0,
      y: -30,
      duration: 0.07,
      ease: 'power2.in'
    }, 0.24);
  }

  // Crossfade Card 1: Image A out, Image C in (scale 1.1 -> 1.0)
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

  // Crossfade Card 2: Image B out, Image D in (scale 1.1 -> 1.0)
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

  // --- Image A: Leading bird (starts at 0.26, duration 0.18 -> ends at 0.44) ---
  // Horizontal travel + Size swap (0.6 -> 1.0) + Rotation change (-6deg -> +3deg)
  storyTimeline.to(card1, {
    x: () => getClusterSlideDistance(),
    scale: 1.0,
    rotation: 3,
    duration: 0.18,
    ease: 'sine.inOut'
  }, 0.26);

  // S-Curve vertical arc for Image A: rises up by -40px then returns to 0
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

  // --- Image B: Following bird (~15% relative follow lag: starts at 0.32, duration 0.18 -> ends at 0.50) ---
  // Horizontal travel + Size swap (1.0 -> 0.6) + Rotation change (+4deg -> -4deg)
  storyTimeline.to(card2, {
    x: () => getClusterSlideDistance(),
    scale: 0.6,
    rotation: -4,
    duration: 0.18,
    ease: 'sine.inOut'
  }, 0.32);

  // S-Curve vertical arc for Image B: dips down by +45px then returns to 0
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
  // - Right: Step 3 content block fades in (y: 20 -> 0)
  // - Right: paragraph #story-reveal-p2 words reveal word-by-word
  // - Right: explore button fades in
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

  if (words2.length) {
    const totalStagger2 = 0.14;
    const stepDuration2 = totalStagger2 / Math.max(words2.length, 1);
    storyTimeline.to(words2, {
      opacity: 1,
      stagger: stepDuration2,
      duration: 0.04,
      ease: 'none'
    }, 0.52);
  }

  if (exploreBtn2) {
    storyTimeline.to(exploreBtn2, {
      opacity: 1,
      y: 0,
      duration: 0.05,
      ease: 'power1.out'
    }, 0.66);
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
}

/* ==========================================================================
   02 — BRAND STORY: SPLIT TEXT REVEAL & ASYMMETRIC ARCHITECTURAL PARALLAX
   ========================================================================== */
function initBrandStoryParallax() {
  const storySection = document.getElementById('brand-story');
  if (!storySection) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animItems = storySection.querySelectorAll('.story-anim-item');
  const photoClips = storySection.querySelectorAll('.story-photo-clip');

  // If reduced motion is preferred, show everything immediately
  if (prefersReducedMotion) {
    animItems.forEach(el => el.classList.add('in-view'));
    photoClips.forEach(el => el.classList.add('in-view'));
    return;
  }

  // 1. Text & Headline Upward Fade with Reading Stagger
  if ('IntersectionObserver' in window) {
    const textObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animItems.forEach(el => textObserver.observe(el));

    // 2. Photographs Clip-Path Mask Reveal
    const photoObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    photoClips.forEach(clip => photoObserver.observe(clip));
  } else {
    animItems.forEach(el => el.classList.add('in-view'));
    photoClips.forEach(clip => clip.classList.add('in-view'));
  }

  // 3. Optional GSAP ScrollTrigger Integration if present
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      trigger: storySection,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        animItems.forEach(el => el.classList.add('in-view'));
        photoClips.forEach(clip => clip.classList.add('in-view'));
      }
    });
  }
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
function initRoomsHorizontalTrack() {
  const section = document.getElementById('rooms-track');
  const viewport = document.getElementById('rooms-pinned-viewport');
  const track = document.getElementById('rooms-horizontal-track');
  const stage = document.getElementById('rooms-horizontal-stage');
  const progressBar = document.getElementById('rooms-progress-bar');
  const currentIdxEl = document.getElementById('rooms-current-idx');
  const cards = document.querySelectorAll('.room-horizontal-card');

  if (!section || !viewport || !track || !stage) return;

  const totalCards = cards.length || 5;
  let scrollTriggerInstance = null;

  const isReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = () => window.innerWidth > 1024 && !isReducedMotion();

  // Dynamic travel distance calculation: track.scrollWidth - window.innerWidth
  const getTravelDistance = () => {
    const trackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    // Add 48px padding buffer so the final card clears comfortably
    return Math.max(0, trackWidth - viewportWidth + 48);
  };

  const updateProgressBar = (progress) => {
    const clamped = Math.min(1, Math.max(0, progress));
    if (progressBar) {
      progressBar.style.transform = `scaleX(${clamped.toFixed(4)})`;
      const trackParent = progressBar.parentElement;
      if (trackParent) {
        trackParent.setAttribute('aria-valuenow', Math.round(clamped * 100));
      }
    }
    if (currentIdxEl) {
      const idx = Math.min(totalCards - 1, Math.floor(clamped * totalCards));
      currentIdxEl.textContent = String(idx + 1).padStart(2, '0');
    }
  };

  // Setup GSAP Desktop Pinned Scroll
  const setupDesktopPinnedScroll = () => {
    // Kill existing trigger if any
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
      scrollTriggerInstance = null;
    }

    if (!isDesktop()) {
      // Mobile / Tablet Portrait / Reduced Motion cleanup
      if (typeof gsap !== 'undefined') {
        gsap.set(track, { clearProps: 'transform' });
        gsap.set(viewport, { clearProps: 'all' });
        gsap.set(section, { clearProps: 'all' });
      } else {
        track.style.transform = 'none';
      }
      updateProgressBar(0);
      return;
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      scrollTriggerInstance = ScrollTrigger.create({
        id: 'rooms-horizontal-pin',
        trigger: section,
        pin: viewport,
        start: 'top top',
        end: () => `+=${getTravelDistance()}`,
        scrub: 0.3,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const travel = getTravelDistance();
          gsap.set(track, { x: -travel * progress });
          updateProgressBar(progress);
        }
      });
    }
  };

  // Setup Mobile / Tablet Native Swipe Listener
  const onMobileStageScroll = () => {
    if (isDesktop()) return;
    const maxScroll = stage.scrollWidth - stage.clientWidth;
    if (maxScroll > 0) {
      const progress = stage.scrollLeft / maxScroll;
      updateProgressBar(progress);
    }
  };

  stage.addEventListener('scroll', onMobileStageScroll, { passive: true });

  // Keyboard Arrow Navigation
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const direction = e.key === 'ArrowRight' ? 1 : -1;
      if (isDesktop() && scrollTriggerInstance) {
        // Smoothly scroll window vertically to advance the pinned scrub
        const scrollStep = window.innerHeight * 0.45 * direction;
        window.scrollBy({ top: scrollStep, behavior: 'smooth' });
        e.preventDefault();
      } else {
        // Mobile / Tablet / Reduced motion native scroll
        const scrollStep = 320 * direction;
        stage.scrollBy({ left: scrollStep, behavior: 'smooth' });
        e.preventDefault();
      }
    }
  });

  // Initialize
  setupDesktopPinnedScroll();

  // Resize Listener: Recalculates travel distance dynamically
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setupDesktopPinnedScroll();
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 120);
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

