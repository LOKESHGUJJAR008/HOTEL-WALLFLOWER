/**
 * Hotel Wallflower - Main JavaScript
 * Handles navigation, mobile drawer, booking bar, modals, sliders, lightbox & WhatsApp integration
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initMobileNav();
  initBookingBarDates();
  initCountdownTimer();
  initReviewSlider();
  initModals();
  initGalleryLightbox();
  initToast();
  initHeroScrollChoreography();
  initRoomAccelerator();
});

/* ==========================================================================
   STICKY NAVBAR & SCROLL BEHAVIOR
   ========================================================================== */
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
  handleScroll(); // Initial check
}

/* ==========================================================================
   MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');

  if (!hamburgerBtn || !drawer || !overlay) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    hamburgerBtn.classList.add('active');
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburgerBtn.classList.remove('active');
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Close when clicking mobile nav links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
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
          <a id="conf-dialog-wa" href="#" target="_blank" class="btn btn-gold" style="width:100%; background:#25D366; color:#FFF; box-shadow:0 8px 20px rgba(37,211,102,0.35);">
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
   HERO SCROLL CHOREOGRAPHY (Zoom Out + Watermark Slide + Section Slide)
   ========================================================================== */
function initHeroScrollChoreography() {
  const hero = document.getElementById('hero');
  const heroImg = document.getElementById('hero-img');
  const watermarkText = document.getElementById('hero-watermark-text');
  const heroContent = document.getElementById('hero-content');

  if (!hero || !heroImg) return;

  let ticking = false;

  const onScroll = () => {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight || window.innerHeight;

    // Progress through hero viewport [0.0 -> 1.0]
    const progress = Math.min(1.2, Math.max(0, scrollY / (heroHeight * 0.95)));

    // 1. Image zooms out as user scrolls down: from 1.25 down to 1.00 smoothly
    const zoomScale = Math.max(0.98, 1.25 - progress * 0.25);
    const parallaxY = scrollY * 0.2;
    const brightness = Math.max(0.48, 0.68 - progress * 0.2);
    heroImg.style.transform = `scale(${zoomScale.toFixed(4)}) translateY(${parallaxY.toFixed(1)}px)`;
    heroImg.style.filter = `brightness(${brightness.toFixed(3)}) contrast(1.1) grayscale(0.12)`;

    // 2. Bold italic transparent watermark text slides horizontally across the screen
    if (watermarkText) {
      const slideX = progress * 260; // slides right-to-left
      const slideY = progress * 70;
      const textScale = 1 + progress * 0.05;
      watermarkText.style.transform = `translate3d(${-slideX.toFixed(1)}px, ${slideY.toFixed(1)}px, 0) scale(${textScale.toFixed(3)})`;
      watermarkText.style.opacity = Math.max(0.08, 1 - progress * 0.75);
    }

    // 3. Foreground title & booking bar slide up with parallax & fade
    if (heroContent) {
      const contentSlideY = -scrollY * 0.35;
      const contentOpacity = Math.max(0, 1 - progress * 1.35);
      heroContent.style.transform = `translate3d(0, ${contentSlideY.toFixed(1)}px, 0)`;
      heroContent.style.opacity = contentOpacity.toFixed(3);
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // Initial calculation
  onScroll();
}

/* ==========================================================================
   KINETIC ROOM ACCELERATOR (Motion Graphics Carousel & Speedometer Telemetry)
   ========================================================================== */
function initRoomAccelerator() {
  const viewport = document.getElementById('room-accelerator-viewport');
  const track = document.getElementById('room-accelerator-track');
  const speedValEl = document.getElementById('accel-speed-val');
  const statusTextEl = document.getElementById('accel-status-text');
  const ledBar = document.getElementById('accel-led-bar');
  const pedalBtn = document.getElementById('accel-pedal');
  const brakeBtn = document.getElementById('accel-brake');
  const gearBtns = document.querySelectorAll('.accel-gear-btn');
  const toggleViewBtn = document.getElementById('toggle-rooms-view-btn');
  const staticGrid = document.getElementById('static-rooms-grid');

  if (!viewport || !track) return;

  // Duplicate cards inside track to achieve infinite seamless loop
  const initialCards = Array.from(track.children);
  initialCards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  let currentSpeed = 80; // Starting speed (KM/H)
  let targetSpeed = 80;
  let baseGearSpeed = 80;
  let offset = 0;
  let isBraking = false;
  let isPedalHeld = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartOffset = 0;
  let lastDragTime = 0;
  let lastDragX = 0;
  let dragVelocity = 0;
  let isHovered = false;

  const ledSegments = ledBar ? Array.from(ledBar.querySelectorAll('.hud-led-segment')) : [];

  // Update LED segments based on current speed (0 - 260)
  const updateLEDs = (speed) => {
    if (!ledSegments.length) return;
    const activeCount = Math.min(ledSegments.length, Math.round((speed / 240) * ledSegments.length));
    ledSegments.forEach((seg, i) => {
      if (i < activeCount) {
        seg.classList.add('active');
      } else {
        seg.classList.remove('active');
      }
    });
  };

  // Gear Button Clicks
  gearBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gearBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const speed = parseInt(btn.dataset.speed, 10) || 80;
      baseGearSpeed = speed;
      targetSpeed = speed;
      isBraking = false;
      if (brakeBtn) brakeBtn.textContent = '⏸ BRAKE';
      if (statusTextEl) {
        statusTextEl.textContent = btn.textContent.toUpperCase();
      }
    });
  });

  // Accelerator Pedal (Push / Rev to Nitro Speed)
  const pressPedal = (e) => {
    if (e && e.type === 'touchstart') e.preventDefault();
    isPedalHeld = true;
    targetSpeed = 240;
    isBraking = false;
    if (pedalBtn) pedalBtn.classList.add('accelerating');
    if (brakeBtn) brakeBtn.textContent = '⏸ BRAKE';
    if (statusTextEl) statusTextEl.textContent = '⚡ NITRO BOOST (240 KM/H)';
  };

  const releasePedal = () => {
    if (!isPedalHeld) return;
    isPedalHeld = false;
    targetSpeed = baseGearSpeed;
    if (pedalBtn) pedalBtn.classList.remove('accelerating');
    if (statusTextEl) statusTextEl.textContent = 'CRUISING SYNCED';
  };

  if (pedalBtn) {
    pedalBtn.addEventListener('mousedown', pressPedal);
    window.addEventListener('mouseup', releasePedal);
    pedalBtn.addEventListener('touchstart', pressPedal, { passive: false });
    window.addEventListener('touchend', releasePedal);

    // Click toggle fallback for desktop click or tap
    pedalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      pressPedal();
      setTimeout(releasePedal, 2200);
    });
  }

  // Brake / Pause Button
  if (brakeBtn) {
    brakeBtn.addEventListener('click', () => {
      if (!isBraking) {
        isBraking = true;
        targetSpeed = 0;
        brakeBtn.textContent = '▶ RESUME';
        if (statusTextEl) statusTextEl.textContent = 'BRAKE ENGAGED (0 KM/H)';
      } else {
        isBraking = false;
        targetSpeed = baseGearSpeed;
        brakeBtn.textContent = '⏸ BRAKE';
        if (statusTextEl) statusTextEl.textContent = 'CRUISING SYNCED';
      }
    });
  }

  // Hover over cards slows down for inspection
  track.addEventListener('mouseenter', () => {
    isHovered = true;
    if (!isPedalHeld && !isBraking) {
      targetSpeed = 25; // Gentle crawl for viewing
      if (statusTextEl) statusTextEl.textContent = 'INSPECTION CRAWL (25 KM/H)';
    }
  });

  track.addEventListener('mouseleave', () => {
    isHovered = false;
    if (!isPedalHeld && !isBraking) {
      targetSpeed = baseGearSpeed;
      if (statusTextEl) statusTextEl.textContent = 'CRUISING SYNCED';
    }
  });

  // Mouse / Touch Drag Support
  const onPointerDown = (e) => {
    isDragging = true;
    dragStartX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartOffset = offset;
    lastDragX = dragStartX;
    lastDragTime = performance.now();
    dragVelocity = 0;
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - dragStartX;
    offset = dragStartOffset - deltaX;

    const now = performance.now();
    const dt = now - lastDragTime;
    if (dt > 0) {
      dragVelocity = (lastDragX - clientX) / dt;
    }
    lastDragX = clientX;
    lastDragTime = now;
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    isDragging = false;
    // Impart flick velocity to current speed temporarily
    if (Math.abs(dragVelocity) > 0.5) {
      targetSpeed = Math.min(240, Math.max(30, Math.abs(dragVelocity) * 100));
      setTimeout(() => {
        if (!isPedalHeld && !isBraking) targetSpeed = baseGearSpeed;
      }, 1200);
    }
  };

  viewport.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  viewport.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Mouse Wheel Accelerator Scrub
  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    offset += delta * 0.8;
    // Temporarily increase speed response
    targetSpeed = Math.min(240, targetSpeed + Math.abs(delta) * 0.2);
    clearTimeout(viewport._wheelTimer);
    viewport._wheelTimer = setTimeout(() => {
      if (!isPedalHeld && !isBraking) targetSpeed = baseGearSpeed;
    }, 400);
  }, { passive: false });

  // Main Accelerator Animation Loop
  let lastTimestamp = performance.now();

  const animateAccelerator = (timestamp) => {
    const deltaTime = Math.min(60, timestamp - lastTimestamp);
    lastTimestamp = timestamp;

    // Smooth lerp speed
    currentSpeed += (targetSpeed - currentSpeed) * 0.08;

    // Update speedometer readout
    if (speedValEl) {
      speedValEl.textContent = Math.round(currentSpeed);
    }
    updateLEDs(currentSpeed);

    // Advance offset
    if (!isDragging) {
      offset += (currentSpeed * 0.025) * (deltaTime / 16.6);
    }

    // Measure total loop width
    const totalWidth = track.scrollWidth;
    const halfWidth = totalWidth / 2;

    if (halfWidth > 0) {
      if (offset >= halfWidth) {
        offset = offset % halfWidth;
      } else if (offset < 0) {
        offset = halfWidth + (offset % halfWidth);
      }
    }

    track.style.transform = `translate3d(${-offset.toFixed(2)}px, 0, 0)`;

    // Apply kinetic scanline & motion blur if revving high
    if (currentSpeed > 150) {
      const blurAmount = ((currentSpeed - 150) * 0.012).toFixed(1);
      track.style.filter = `blur(${blurAmount}px)`;
    } else {
      track.style.filter = 'none';
    }

    requestAnimationFrame(animateAccelerator);
  };

  requestAnimationFrame(animateAccelerator);

  // Toggle View Button (Accelerator Track vs Static Grid)
  if (toggleViewBtn && staticGrid) {
    toggleViewBtn.addEventListener('click', () => {
      const isGridVisible = staticGrid.style.display !== 'none';
      if (isGridVisible) {
        staticGrid.style.display = 'none';
        viewport.style.display = 'block';
        toggleViewBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          <span>Switch to Static Grid View</span>
        `;
      } else {
        staticGrid.style.display = 'grid';
        viewport.style.display = 'none';
        toggleViewBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          <span>Return to Kinetic Accelerator Track</span>
        `;
      }
    });
  }
}
