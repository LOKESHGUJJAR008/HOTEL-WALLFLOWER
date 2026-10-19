/**
 * Hotel Wallflower - Gallery Data
 * Categorized high-resolution images with descriptive captions
 */

const GALLERY_DATA = [
  {
    id: 1,
    title: "Grand Twilight Facade & Canopy Entrance",
    category: "lobby",
    categoryLabel: "Lobby & Exterior",
    src: "assets/images/hotel-hero.webp",
    desc: "The warm architectural illumination and brass porte-cochère of Hotel Wallflower on Jhalawar Road, Kota."
  },
  {
    id: 2,
    title: "The Wallflower Bistro - Fine Dining",
    category: "dining",
    categoryLabel: "Dining & Bar",
    src: "assets/images/hotel-dining.webp",
    desc: "Velvet seating, marble tables, and culinary mastery serving authentic Rajasthani and global cuisines."
  },
  {
    id: 3,
    title: "The Velvet Lounge & Cocktail Bar",
    category: "dining",
    categoryLabel: "Dining & Bar",
    src: "assets/images/hotel-bar.webp",
    desc: "Expert mixology, vintage spirits, and moody acoustic lounge ambience for evening unwinding."
  },
  {
    id: 4,
    title: "Executive Suite Master Bedroom",
    category: "rooms",
    categoryLabel: "Rooms & Suites",
    src: "assets/images/room-executive-suite.webp",
    desc: "Golden-hour city views through floor-to-ceiling windows, plush king bed, and private study desk."
  },
  {
    id: 5,
    title: "Billiards & Chesterfield Games Lounge",
    category: "recreation",
    categoryLabel: "Recreation & Wellness",
    src: "assets/images/hotel-lounge-pool.webp",
    desc: "Championship pool table, wood-paneled library walls, and leather armchairs for guest leisure."
  },
  {
    id: 6,
    title: "Grand Reception & 24x7 Concierge",
    category: "lobby",
    categoryLabel: "Lobby & Exterior",
    src: "assets/images/hotel-lobby.webp",
    desc: "Italian marble foyer with statement chandeliers welcoming guests day and night."
  },
  {
    id: 7,
    title: "Superior Twin Room with Study Workstations",
    category: "rooms",
    categoryLabel: "Rooms & Suites",
    src: "assets/images/room-twin.webp",
    desc: "Engineered for visiting parents and coaching students in Kota with dual study desks."
  },
  {
    id: 8,
    title: "Premium Royal Suite Parlor & Living Room",
    category: "rooms",
    categoryLabel: "Rooms & Suites",
    src: "assets/images/room-royal-suite.webp",
    desc: "Opulent private living suite with velvet Chesterfields, dining table, and master bedroom suite."
  },
  {
    id: 9,
    title: "State-of-the-Art Fitness Center",
    category: "recreation",
    categoryLabel: "Recreation & Wellness",
    src: "assets/images/hotel-fitness.webp",
    desc: "Cardio treadmills, strength equipment, and mirrors overlooking hotel greenery."
  },
  {
    id: 10,
    title: "Lavish Morning Breakfast Buffet Spread",
    category: "dining",
    categoryLabel: "Dining & Bar",
    src: "assets/images/hotel-breakfast.webp",
    desc: "Fresh morning pastries, tropical fruits, hot Rajasthani breakfast delicacies, and artisanal coffee."
  },
  {
    id: 11,
    title: "Italian Marble Ensuite Bathroom",
    category: "rooms",
    categoryLabel: "Rooms & Suites",
    src: "assets/images/room-bathroom.webp",
    desc: "Backlit LED vanity mirrors, rain shower, and luxury apothecary bath amenities."
  },
  {
    id: 12,
    title: "Kishore Sagar Lake & Jagmandir Palace (~5 Min Away)",
    category: "city",
    categoryLabel: "Kota City & Nearby",
    src: "assets/images/kota-landmark.webp",
    desc: "Kota's iconic 14th-century island palace glowing at twilight, located just 5 minutes from Hotel Wallflower."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GALLERY_DATA };
}
