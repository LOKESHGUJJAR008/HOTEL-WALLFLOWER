/**
 * Hotel Wallflower - Rooms Data
 * Authentic boutique hotel rooms tailored for Kota city travelers, corporate guests, students & families
 */

const ROOMS_DATA = [
  {
    id: "deluxe-executive",
    name: "Deluxe Executive Room",
    category: "Deluxe",
    tagline: "Contemporary Comfort with City Views",
    price: 2499,
    originalPrice: 3200,
    discount: "22% OFF",
    size: "300 sq. ft",
    bed: "1 King Bed (Plush Orthopedic)",
    guests: "2 Guests",
    maxGuests: 2,
    bedType: "King",
    view: "Kota City View",
    rating: 4.8,
    reviewsCount: 142,
    featured: true,
    coverImage: "assets/images/room-executive-suite.jpg",
    gallery: [
      "assets/images/room-executive-suite.jpg",
      "assets/images/room-bathroom.jpg",
      "assets/images/hotel-lobby.jpg"
    ],
    shortDesc: "Thoughtfully crafted for business professionals and visiting parents, featuring premium bedding, an ergonomic workstation, and serene city views.",
    description: "The Deluxe Executive Room at Hotel Wallflower offers a serene sanctuary in the heart of Kota. Designed with muted tones, warm wood accents, and natural sunlight, this room features an ultra-comfortable king-sized bed with 400-thread-count linens, a dedicated work desk with high-speed fiber internet, and an ensuite Italian-tiled bathroom with a rainforest shower.",
    amenities: [
      { icon: "wifi", text: "Complimentary Ultra-Fast WiFi (100 Mbps)" },
      { icon: "tv", text: "43-inch 4K Smart TV with OTT Apps" },
      { icon: "snowflake", text: "Whisper-Quiet Daikin Climate Control AC" },
      { icon: "briefcase", text: "Dedicated Ergonomic Work Desk & Lamp" },
      { icon: "coffee", text: "Electric Kettle with Gourmet Tea & Coffee" },
      { icon: "shower", text: "Rainforest Shower with Luxury Toiletries" },
      { icon: "shield-check", text: "Digital Electronic In-Room Safe" },
      { icon: "phone", text: "24-Hour Room Service & Concierge" }
    ],
    features: ["King Size Bed", "Workstation", "Rain Shower", "Free Breakfast"]
  },
  {
    id: "superior-twin",
    name: "Superior Twin Room",
    category: "Twin",
    tagline: "Ideal for Students, Parents & Colleagues",
    price: 2299,
    originalPrice: 2900,
    discount: "21% OFF",
    size: "320 sq. ft",
    bed: "2 Twin Single Beds",
    guests: "2 Guests",
    maxGuests: 2,
    bedType: "Twin",
    view: "Quiet Courtyard View",
    rating: 4.9,
    reviewsCount: 198,
    featured: true,
    coverImage: "assets/images/room-twin.jpg",
    gallery: [
      "assets/images/room-twin.jpg",
      "assets/images/room-bathroom.jpg",
      "assets/images/hotel-breakfast.jpg"
    ],
    shortDesc: "Tailored specifically for student-parent duos or visiting colleagues, with dual dedicated study/work desks and tranquil acoustic comfort.",
    description: "Kota is renowned for academic focus and coaching excellence. Our Superior Twin Room has been purposefully engineered for visiting parents with students, or corporate pairs. Equipped with two plush independent single beds, individual reading lights, a spacious study desk, and sound-insulated double-glazed windows to ensure total tranquility.",
    amenities: [
      { icon: "wifi", text: "High-Speed Fiber WiFi (Ideal for Online Classes)" },
      { icon: "book-open", text: "Spacious Study/Work Desk with Ergonomic Chair" },
      { icon: "tv", text: "43-inch Smart LED TV" },
      { icon: "snowflake", text: "Individual Air Conditioning" },
      { icon: "coffee", text: "Tea & Coffee Making Facilities" },
      { icon: "shower", text: "Hot Water 24/7 & Rain Shower" },
      { icon: "box", text: "Ample Wardrobe & Luggage Storage" },
      { icon: "bell", text: "Quiet Hours Policy for Undisturbed Sleep" }
    ],
    features: ["2 Single Beds", "Study Workstation", "Sound Insulated", "Free WiFi"]
  },
  {
    id: "super-deluxe-balcony",
    name: "Super Deluxe Room with Balcony",
    category: "Super Deluxe",
    tagline: "Boutique Elegance with Private Sit-Out",
    price: 3299,
    originalPrice: 4200,
    discount: "21% OFF",
    size: "380 sq. ft",
    bed: "1 King Bed + Daybed",
    guests: "2-3 Guests",
    maxGuests: 3,
    bedType: "King",
    view: "Private Skyline Balcony",
    rating: 4.9,
    reviewsCount: 164,
    featured: true,
    coverImage: "assets/images/room-executive-suite.jpg",
    gallery: [
      "assets/images/room-executive-suite.jpg",
      "assets/images/room-bathroom.jpg",
      "assets/images/hotel-dining.jpg"
    ],
    shortDesc: "Spacious boutique room featuring a private balcony overlooking Kota's cityscape, cozy lounge seating, and complimentary evening tea.",
    description: "Indulge in extra space and fresh evening breezes in our Super Deluxe Balcony Room. Step onto your private balcony with morning coffee as Kota awakens. Inside, enjoy a plush king bed, a comfortable daybed suitable for an extra guest or child, a mini-refrigerator, and designer ambient illumination.",
    amenities: [
      { icon: "sun", text: "Private Balcony with Outdoor Seating" },
      { icon: "wifi", text: "High-Speed Fiber WiFi (100 Mbps)" },
      { icon: "tv", text: "50-inch 4K Smart TV with Netflix/Prime" },
      { icon: "snowflake", text: "Climate Controlled Air Conditioning" },
      { icon: "coffee", text: "In-Room Nespresso & Tea Bar" },
      { icon: "box", text: "Stocked Minibar / Chiller" },
      { icon: "shower", text: "Designer Marble Bath & Bathrobes" },
      { icon: "sparkles", text: "Evening Turndown Service" }
    ],
    features: ["Private Balcony", "King Bed + Daybed", "Mini Fridge", "Complimentary Breakfast"]
  },
  {
    id: "premium-royal-suite",
    name: "Premium Royal Suite",
    category: "Suite",
    tagline: "Separate Living Lounge & Lavish Comfort",
    price: 4499,
    originalPrice: 5900,
    discount: "24% OFF",
    size: "490 sq. ft",
    bed: "1 King Bed + Velvet Sofa Bed",
    guests: "3 Guests",
    maxGuests: 3,
    bedType: "King",
    view: "Panoramic Kota Cityscape",
    rating: 5.0,
    reviewsCount: 112,
    featured: true,
    coverImage: "assets/images/room-royal-suite.jpg",
    gallery: [
      "assets/images/room-royal-suite.jpg",
      "assets/images/room-bathroom.jpg",
      "assets/images/hotel-lounge-pool.jpg"
    ],
    shortDesc: "An exquisite suite featuring a private living room with velvet Chesterfields, dining table, opulent bedroom, and VIP amenities.",
    description: "Designed for distinguished travelers and families who value refined living. The Premium Royal Suite showcases a separate parlor living room outfitted with velvet Chesterfield seating, a marble coffee table, a 4-seater dining arrangement, and an independent master bedroom with a grand king-sized bed and walk-in wardrobe.",
    amenities: [
      { icon: "couch", text: "Separate Living Room & Dining Area" },
      { icon: "tv", text: "Two 55-inch Ultra HD Smart TVs" },
      { icon: "wine-glass", text: "Welcome Fruit Basket & Refreshments" },
      { icon: "wifi", text: "Ultra-Fast Dedicated WiFi" },
      { icon: "snowflake", text: "Dual Zone Climate Control" },
      { icon: "shower", text: "Luxury Marble Bathroom with Rain Shower & Tub" },
      { icon: "utensils", text: "Complimentary Lavish Buffet Breakfast" },
      { icon: "car", text: "Priority Car Parking & Valet" }
    ],
    features: ["Separate Living Area", "2x 55\" Smart TVs", "Bathtub & Rain Shower", "VIP Welcome"]
  },
  {
    id: "family-luxury-suite",
    name: "Family Luxury Suite",
    category: "Family",
    tagline: "Generous Space for the Entire Family",
    price: 5499,
    originalPrice: 7000,
    discount: "21% OFF",
    size: "580 sq. ft",
    bed: "2 King Beds / Interconnecting",
    guests: "4 Guests",
    maxGuests: 5,
    bedType: "King",
    view: "City & Garden View",
    rating: 4.9,
    reviewsCount: 88,
    featured: false,
    coverImage: "assets/images/room-royal-suite.jpg",
    gallery: [
      "assets/images/room-royal-suite.jpg",
      "assets/images/room-twin.jpg",
      "assets/images/room-bathroom.jpg"
    ],
    shortDesc: "Spacious dual-bedroom layout engineered for family vacations or extended stays during Kota coaching admissions and visits.",
    description: "Traveling with family has never been more comfortable. Our Family Luxury Suite provides generous space with two plush king beds, two separate ensuite bathrooms, and an open lounge area so everyone has their own space while staying together in luxury.",
    amenities: [
      { icon: "users", text: "Accommodates up to 4-5 Family Members" },
      { icon: "bath", text: "Two Full Ensuite Bathrooms" },
      { icon: "tv", text: "Dual Smart TVs with Streaming Apps" },
      { icon: "wifi", text: "High-Speed WiFi for all Family Devices" },
      { icon: "coffee", text: "Large Beverage & Coffee Station" },
      { icon: "utensils", text: "Complimentary Breakfast for 4" },
      { icon: "bell", text: "Dedicated Family Concierge Support" },
      { icon: "gamepad", text: "Complimentary Access to Pool Table & Games Lounge" }
    ],
    features: ["2 Master Beds", "2 Bathrooms", "Sleeps 4-5", "Breakfast Included"]
  },
  {
    id: "presidential-wallflower-suite",
    name: "Presidential Wallflower Suite",
    category: "Suite",
    tagline: "The Pinnacle of Hospitality in Kota",
    price: 6999,
    originalPrice: 9500,
    discount: "26% OFF",
    size: "750 sq. ft",
    bed: "Super King Bed + Guest Lounge",
    guests: "2-4 Guests",
    maxGuests: 4,
    bedType: "King",
    view: "Panoramic 180° Kota City Skyline",
    rating: 5.0,
    reviewsCount: 54,
    featured: false,
    coverImage: "assets/images/room-royal-suite.jpg",
    gallery: [
      "assets/images/room-royal-suite.jpg",
      "assets/images/room-bathroom.jpg",
      "assets/images/hotel-bar.jpg"
    ],
    shortDesc: "Our crown jewel. A sprawling penthouse-style suite featuring a private bar counter, deep soaking jacuzzi tub, and bespoke butler service.",
    description: "The Presidential Wallflower Suite is Kota's most prestigious accommodation. From the grand entrance foyer to the wraparound glass walls with golden sunset views, this suite redefines luxury hospitality in Rajasthan. Features a master bedroom, opulent living salon, personal dining area, walk-in dressing room, and a spa-grade bathroom with jacuzzi.",
    amenities: [
      { icon: "crown", text: "Master Suite with Executive Lounge" },
      { icon: "sparkles", text: "Luxury Jacuzzi Bath with City Skyline View" },
      { icon: "wine-glass", text: "Complimentary Mini-Bar & Evening Cocktails" },
      { icon: "user-check", text: "24/7 Dedicated Butler Service" },
      { icon: "car", text: "Complimentary Airport or Railway Station Transfer" },
      { icon: "utensils", text: "In-Suite Breakfast & Chef's Special Dining" },
      { icon: "tv", text: "65-inch OLED Home Entertainment System" },
      { icon: "wifi", text: "Ultra-Fast Dedicated Gigabit WiFi" }
    ],
    features: ["Jacuzzi Soaking Tub", "Butler Service", "Free Transfers", "VIP Dining"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ROOMS_DATA };
}
