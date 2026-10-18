/**
 * Hotel Wallflower - 3D Image Stack Showcase
 * Scroll-driven 3D stack for all 18 hotel images with paper-bending perspective,
 * big blurred counter, dynamic right-side list, and Web Audio ambient toggle.
 */

(function () {
  'use strict';

  // 18 Showcase Items mapped to images in assets/images/hotel-images
  const STACK_ITEMS = [
    {
      index: 1,
      id: '01-premium-rooms',
      title: 'Premium Rooms',
      desc: 'Spacious architectural sanctuaries featuring sculpted Kota limestone, warm teak accents, and king posturepedic beds.',
      image: 'assets/images/hotel-images/01-premium-rooms.png',
      colors: ['#2A6F73', '#EFE6D8', '#1F2D2E']
    },
    {
      index: 2,
      id: '02-luxury-suites',
      title: 'Luxury Suites',
      desc: 'Expansive multi-zone suites with private lounge salons, panoramic city vistas, and dedicated dressing spaces.',
      image: 'assets/images/hotel-images/02-luxury-suites.png',
      colors: ['#1E5256', '#D8C7B5', '#243435']
    },
    {
      index: 3,
      id: '03-fine-dining-restaurant',
      title: 'Fine Dining Restaurant',
      desc: 'Culinary artistry rooted in Rajasthani royal traditions and contemporary global gastronomy.',
      image: 'assets/images/hotel-images/03-fine-dining-restaurant.png',
      colors: ['#2A6F73', '#CFE5E3', '#1F2D2E']
    },
    {
      index: 4,
      id: '04-cafe-lounge',
      title: 'Café & Velvet Lounge',
      desc: 'Artisan single-origin coffees, handcrafted pastries, and intimate evening aperitifs in plush emerald velvet.',
      image: 'assets/images/hotel-images/04-cafe-lounge.png',
      colors: ['#306B6F', '#E8DFD1', '#182425']
    },
    {
      index: 5,
      id: '05-rooftop-dining',
      title: 'Rooftop Sky Dining',
      desc: 'Open-air starlight dining overlooking Kota’s skyline with curated charcoal grills and vintage cellars.',
      image: 'assets/images/hotel-images/05-rooftop-dining.png',
      colors: ['#255E62', '#D2E3E0', '#1C2829']
    },
    {
      index: 6,
      id: '06-swimming-pool',
      title: 'Azure Swimming Pool',
      desc: 'Temperature-controlled sanctuary pool surrounded by private shaded cabanas and acoustic limestone walls.',
      image: 'assets/images/hotel-images/06-swimming-pool.png',
      colors: ['#2A6F73', '#CFE5E3', '#152E30']
    },
    {
      index: 7,
      id: '07-fitness-center',
      title: 'State-of-the-Art Fitness Center',
      desc: 'Equipped with advanced biometric cardio systems, Olympic free weights, and dedicated yoga spaces.',
      image: 'assets/images/hotel-images/07-fitness-center.png',
      colors: ['#1E5256', '#E2D7C8', '#202B2C']
    },
    {
      index: 8,
      id: '08-spa-wellness',
      title: 'Spa & Holistic Wellness',
      desc: 'Therapeutic Ayurvedic massages, restorative steam hydrotherapy, and organic botanical rituals.',
      image: 'assets/images/hotel-images/08-spa-wellness.png',
      colors: ['#36787C', '#F3EFE7', '#253536']
    },
    {
      index: 9,
      id: '09-banquet-event-hall',
      title: 'Grand Banquet & Event Hall',
      desc: 'Monumental pillarless ballroom customized for landmark weddings, royal galas, and corporate summits.',
      image: 'assets/images/hotel-images/09-banquet-event-hall.png',
      colors: ['#2A6F73', '#EFE6D8', '#1B2627']
    },
    {
      index: 10,
      id: '10-conference-room',
      title: 'Executive Conference Room',
      desc: 'Acoustically isolated boardroom equipped with 4K telepresence screens, ergonomic seating, and high-speed fiber.',
      image: 'assets/images/hotel-images/10-conference-room.png',
      colors: ['#1E5256', '#CFE5E3', '#1F2D2E']
    },
    {
      index: 11,
      id: '11-front-desk-24x7',
      title: '24/7 Front Desk & Reception',
      desc: 'Seamless express check-in and attentive bilingual hospitality around the clock.',
      image: 'assets/images/hotel-images/11-front-desk-24x7.png',
      colors: ['#2B6E72', '#EBE2D4', '#212D2E']
    },
    {
      index: 12,
      id: '12-valet-parking',
      title: 'Complimentary Valet Parking',
      desc: 'Secure multi-tier subterranean parking with dedicated EV charging stations and chauffeur lounge.',
      image: 'assets/images/hotel-images/12-valet-parking.png',
      colors: ['#1E5256', '#CFE5E3', '#182425']
    },
    {
      index: 13,
      id: '13-high-speed-wifi',
      title: 'High-Speed Optical Wi-Fi',
      desc: 'Enterprise-grade symmetrical gigabit connectivity seamless across guestrooms, gardens, and meeting zones.',
      image: 'assets/images/hotel-images/13-high-speed-wifi.png',
      colors: ['#2A6F73', '#DCEBE9', '#1F2D2E']
    },
    {
      index: 14,
      id: '14-in-room-dining',
      title: 'Curated In-Room Dining',
      desc: 'Bespoke chef-crafted meals served tableside in the privacy of your suite 24 hours a day.',
      image: 'assets/images/hotel-images/14-in-room-dining.png',
      colors: ['#336F73', '#EDE4D6', '#222F30']
    },
    {
      index: 15,
      id: '15-airport-shuttle',
      title: 'Airport Shuttle Service',
      desc: 'Private luxury chauffeur transfers to and from Kota Airport and railway stations in climate-controlled comfort.',
      image: 'assets/images/hotel-images/15-airport-shuttle.png',
      colors: ['#1E5256', '#CFE5E3', '#1C2728']
    },
    {
      index: 16,
      id: '16-laundry-dry-cleaning',
      title: 'Laundry & Dry Cleaning',
      desc: 'Eco-friendly fabric care, precision garment steaming, and express same-day return service.',
      image: 'assets/images/hotel-images/16-laundry-dry-cleaning.png',
      colors: ['#2A6F73', '#EBE0D2', '#1F2D2E']
    },
    {
      index: 17,
      id: '17-concierge-service',
      title: 'Dedicated Concierge Service',
      desc: 'Private heritage city tours, Kishore Sagar boat reservations, and tailored local exploration itineraries.',
      image: 'assets/images/hotel-images/17-concierge-service.png',
      colors: ['#1E5256', '#D8ECE9', '#233132']
    },
    {
      index: 18,
      id: '18-pet-friendly-stays',
      title: 'Pet-Friendly Stays',
      desc: 'Thoughtfully appointed amenities, plush pet beds, organic treats, and dedicated walking gardens.',
      image: 'assets/images/hotel-images/18-pet-friendly-stays.png',
      colors: ['#2A6F73', '#EFE6D8', '#1F2D2E']
    }
  ];

  // Web Audio Ambient Synthesizer
  class AmbientAudioPlayer {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.nodes = [];
      this.masterGain = null;
    }

    init() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      this.masterGain.connect(filter);
      filter.connect(this.ctx.destination);

      // Create warm ambient tri-tone chord (F3, A3, C4 drone: 174.61Hz, 220Hz, 261.63Hz)
      const freqs = [174.61, 220.0, 261.63, 349.23];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Gentle sub-LFO for organic slow breathing
        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.08 + idx * 0.03, this.ctx.currentTime);

        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        lfo.connect(lfoGain.gain);

        const voiceGain = this.ctx.createGain();
        voiceGain.gain.setValueAtTime(0.05, this.ctx.currentTime);

        osc.connect(voiceGain);
        voiceGain.connect(this.masterGain);

        osc.start();
        lfo.start();
        this.nodes.push(osc, lfo);
      });

      return true;
    }

    toggle() {
      if (!this.ctx) {
        const ok = this.init();
        if (!ok) return false;
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      if (this.isPlaying) {
        // Fade out
        this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.4);
        this.isPlaying = false;
      } else {
        // Fade in
        this.masterGain.gain.setTargetAtTime(0.35, this.ctx.currentTime, 0.5);
        this.isPlaying = true;
      }

      return this.isPlaying;
    }
  }

  // Showcase Controller
  class ImageStackShowcase {
    constructor() {
      this.section = document.getElementById('brand-story');
      this.viewport = document.getElementById('stack-viewport');
      this.cardsContainer = document.getElementById('stack-cards-container');
      this.listContainer = document.getElementById('stack-items-list');
      this.bigCounterNumber = document.getElementById('stack-big-counter-number');
      this.totalCounterEl = document.getElementById('stack-total-counter');
      this.audioToggleBtn = document.getElementById('stack-audio-toggle');
      this.audioLabel = document.getElementById('stack-audio-label');
      this.activeItemCard = document.getElementById('stack-mobile-active-card');

      this.items = STACK_ITEMS;
      this.total = this.items.length;
      this.cardElements = [];
      this.listElements = [];
      this.currentIndex = 0;
      this.audioPlayer = new AmbientAudioPlayer();
      this.scrollTriggerInstance = null;
    }

    init() {
      if (!this.section || !this.viewport) return;

      this.renderCards();
      this.renderList();
      this.setupAudio();
      this.setupScrollTrigger();
      this.updateTotalCounter();
      this.updateActiveItem(0, true);

      window.addEventListener('resize', () => {
        if (this.scrollTriggerInstance) {
          this.scrollTriggerInstance.refresh();
        }
      });
    }

    updateTotalCounter() {
      if (this.totalCounterEl) {
        this.totalCounterEl.textContent = `${this.total} shown`;
      }
    }

    renderCards() {
      if (!this.cardsContainer) return;
      this.cardsContainer.innerHTML = '';
      this.cardElements = [];

      this.items.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'stack-card';
        card.dataset.index = idx;

        const padIndex = String(item.index).padStart(2, '0');

        card.innerHTML = `
          <div class="stack-card-inner">
            <div class="stack-card-photo-box">
              <img src="${item.image}" alt="${item.title}" class="stack-card-img" loading="${idx < 4 ? 'eager' : 'lazy'}" decoding="async">
              <div class="stack-card-bend-highlight" aria-hidden="true"></div>
              <div class="stack-card-bend-shadow" aria-hidden="true"></div>
            </div>
            <div class="stack-card-hud">
              <span class="stack-card-hud-num">${padIndex}</span>
              <span class="stack-card-hud-title">${item.title}</span>
            </div>
          </div>
        `;

        this.cardsContainer.appendChild(card);
        this.cardElements.push(card);
      });
    }

    renderList() {
      if (!this.listContainer) return;
      this.listContainer.innerHTML = '';
      this.listElements = [];

      this.items.forEach((item, idx) => {
        const li = document.createElement('li');
        li.className = 'stack-list-item' + (idx === 0 ? ' is-active' : '');
        li.dataset.index = idx;
        li.tabIndex = 0;
        li.setAttribute('role', 'button');
        li.setAttribute('aria-label', `View ${item.title}`);

        const padIndex = String(item.index).padStart(2, '0');
        const dotsHtml = item.colors
          .map(c => `<span class="stack-color-dot" style="background-color: ${c};" aria-hidden="true"></span>`)
          .join('');

        li.innerHTML = `
          <div class="stack-item-row">
            <span class="stack-item-num">${padIndex}</span>
            <div class="stack-item-dots" aria-hidden="true">${dotsHtml}</div>
            <h4 class="stack-item-title">${item.title}</h4>
          </div>
          <p class="stack-item-desc">${item.desc}</p>
        `;

        // Click to navigate directly to this item's scroll progress
        li.addEventListener('click', () => {
          this.scrollToItem(idx);
        });

        li.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.scrollToItem(idx);
          }
        });

        this.listContainer.appendChild(li);
        this.listElements.push(li);
      });
    }

    setupAudio() {
      if (!this.audioToggleBtn) return;

      this.audioToggleBtn.addEventListener('click', () => {
        const isOn = this.audioPlayer.toggle();
        this.audioToggleBtn.classList.toggle('audio-active', isOn);
        if (this.audioLabel) {
          this.audioLabel.textContent = isOn ? 'Audio On' : 'Audio Off';
        }
      });
    }

    setupScrollTrigger() {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        this.setupFallbackScroll();
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Pin the section for (total * 100vh)
      const pinDistance = (this.total - 1) * 100;

      this.scrollTriggerInstance = ScrollTrigger.create({
        id: 'image-stack-trigger',
        trigger: this.section,
        pin: this.viewport,
        start: 'top top',
        end: () => `+=${(this.total - 1) * window.innerHeight}`,
        scrub: 0.8,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          this.applyStackPhysics(progress, prefersReducedMotion);
        }
      });

      // Initial frame setup
      this.applyStackPhysics(0, prefersReducedMotion);
    }

    applyStackPhysics(progress, prefersReducedMotion) {
      const u = progress * (this.total - 1);
      const activeIdx = Math.min(Math.round(u), this.total - 1);

      if (activeIdx !== this.currentIndex) {
        this.updateActiveItem(activeIdx, false);
      }

      if (prefersReducedMotion) {
        this.cardElements.forEach((card, idx) => {
          const dist = Math.abs(idx - u);
          card.style.transform = 'none';
          card.style.opacity = dist < 0.6 ? 1 : 0;
          card.style.pointerEvents = dist < 0.5 ? 'auto' : 'none';
        });
        return;
      }

      // Smooth 3D Paper-Bending Stack Calculation
      const isMobile = window.innerWidth <= 768;
      const baseTilt = isMobile ? 26 : 35;
      const baseTransY = isMobile ? 80 : 120;
      const baseTransZ = isMobile ? -80 : -120;

      this.cardElements.forEach((card, idx) => {
        const d = idx - u; // distance from active index

        let translateY = 0;
        let translateZ = 0;
        let rotateX = 0;
        let rotateZ = 0;
        let scale = 1.0;
        let opacity = 0;
        let blur = 0;
        let bendShadowOpacity = 0;
        let bendHighlightOpacity = 0;
        let zIndex = 100 - Math.round(Math.abs(d) * 10);

        if (Math.abs(d) < 0.001) {
          // Exactly active in the center
          translateY = 0;
          translateZ = 0;
          rotateX = 0;
          rotateZ = 0;
          scale = 1.0;
          opacity = 1.0;
          blur = 0;
          zIndex = 100;
        } else if (d > 0 && d <= 1) {
          // Entering from below / rising to center (straightening out)
          translateY = d * baseTransY;
          translateZ = d * baseTransZ;
          rotateX = d * baseTilt;
          rotateZ = d * 1.5;
          scale = 1.0 - d * 0.08;
          opacity = 1.0 - d * 0.25;
          blur = d * 1.5;
          bendShadowOpacity = d * 0.35;
          bendHighlightOpacity = d * 0.2;
          zIndex = 90 - Math.round(d * 10);
        } else if (d > 1 && d <= 3.5) {
          // Stacked behind in depth (tilted paper stack)
          const excess = d - 1;
          translateY = baseTransY + excess * (isMobile ? 24 : 32);
          translateZ = baseTransZ - excess * (isMobile ? 50 : 70);
          rotateX = baseTilt;
          rotateZ = 1.5 + excess * 0.8;
          scale = 0.92 - excess * 0.05;
          opacity = Math.max(0, 0.75 - excess * 0.25);
          blur = Math.min(6, 1.5 + excess * 1.8);
          bendShadowOpacity = 0.45;
          zIndex = 80 - Math.round(excess * 10);
        } else if (d < 0 && d >= -1) {
          // Active card exiting upward (tilts opposite way & curves before vanishing)
          translateY = d * (baseTransY * 1.25);
          translateZ = d * (baseTransZ * 0.5);
          rotateX = d * (baseTilt * 0.9); // negative tilt
          rotateZ = d * 2.0;
          scale = 1.0 + d * 0.06;
          opacity = 1.0 + d * 1.0; // fades to 0 as d -> -1
          blur = -d * 3;
          bendHighlightOpacity = -d * 0.3;
          zIndex = 95 + Math.round(d * 10);
        } else {
          // Outside visible depth range
          opacity = 0;
          translateY = d > 0 ? baseTransY * 2 : -baseTransY * 2;
          translateZ = -300;
          rotateX = d > 0 ? baseTilt : -baseTilt;
          scale = 0.8;
          blur = 8;
          zIndex = 0;
        }

        // Apply transforms via hardware accelerated 3D
        card.style.transform = `translate3d(0px, ${translateY.toFixed(1)}px, ${translateZ.toFixed(1)}px) rotateX(${rotateX.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = Math.max(0, Math.min(1, opacity)).toFixed(3);
        card.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : 'none';
        card.style.zIndex = zIndex;
        card.style.pointerEvents = Math.abs(d) < 0.6 ? 'auto' : 'none';

        // Paper bend light/shadow overlays
        const shadowOverlay = card.querySelector('.stack-card-bend-shadow');
        if (shadowOverlay) {
          shadowOverlay.style.opacity = bendShadowOpacity.toFixed(2);
        }
        const highlightOverlay = card.querySelector('.stack-card-bend-highlight');
        if (highlightOverlay) {
          highlightOverlay.style.opacity = bendHighlightOpacity.toFixed(2);
        }
      });
    }

    updateActiveItem(index, isInitial) {
      this.currentIndex = index;
      const item = this.items[index];
      if (!item) return;

      const padIndex = String(item.index).padStart(2, '0');

      // Update Big Blurred Counter with vertical slide/fade animation
      if (this.bigCounterNumber) {
        if (!isInitial) {
          this.bigCounterNumber.classList.add('is-changing');
          setTimeout(() => {
            this.bigCounterNumber.textContent = padIndex;
            this.bigCounterNumber.classList.remove('is-changing');
          }, 180);
        } else {
          this.bigCounterNumber.textContent = padIndex;
        }
      }

      // Update Right-side List Active States
      this.listElements.forEach((li, idx) => {
        const isActive = idx === index;
        li.classList.toggle('is-active', isActive);
        li.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Scroll list so active item stays comfortably in view on desktop
      const activeLi = this.listElements[index];
      if (activeLi && this.listContainer && window.innerWidth > 992) {
        const containerHeight = this.listContainer.clientHeight;
        const liTop = activeLi.offsetTop;
        const liHeight = activeLi.offsetHeight;
        const targetScroll = liTop - containerHeight / 2 + liHeight / 2;

        this.listContainer.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }

      // Update mobile active card details if present
      if (this.activeItemCard) {
        const numEl = this.activeItemCard.querySelector('.mobile-active-num');
        const titleEl = this.activeItemCard.querySelector('.mobile-active-title');
        const descEl = this.activeItemCard.querySelector('.mobile-active-desc');
        if (numEl) numEl.textContent = padIndex;
        if (titleEl) titleEl.textContent = item.title;
        if (descEl) descEl.textContent = item.desc;
      }
    }

    scrollToItem(index) {
      if (!this.scrollTriggerInstance) return;

      const start = this.scrollTriggerInstance.start;
      const end = this.scrollTriggerInstance.end;
      const targetProgress = index / (this.total - 1);
      const targetScroll = start + targetProgress * (end - start);

      const lenis = window.lenis || window.lenisInstance;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(targetScroll, { duration: 1.2 });
      } else {
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    }

    setupFallbackScroll() {
      // Basic fallback if GSAP is unavailable
      window.addEventListener('scroll', () => {
        const rect = this.section.getBoundingClientRect();
        const totalDist = (this.total - 1) * window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalDist));
        this.applyStackPhysics(progress, false);
      }, { passive: true });
    }
  }

  // Auto-initialize when DOM is ready
  function init() {
    const showcase = new ImageStackShowcase();
    showcase.init();
    window.hotelImageStackShowcase = showcase;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
