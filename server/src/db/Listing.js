import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});
import mongoose from "mongoose";
import { Listing } from "../models/Listing.model.js";
const ownerId = new mongoose.Types.ObjectId("6a4a29a0e16df0e8a7edd381");
const connInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
const listings = [
  {
    owner: ownerId,
    title: "Golden Beach Resort",
    description:
      "Wake up to breathtaking sea views at Golden Beach Resort. Located just a short walk from the shoreline, this property offers spacious rooms, modern interiors, complimentary breakfast, high-speed Wi-Fi, and a relaxing outdoor pool. Perfect for couples, families, and beach lovers looking for a memorable getaway.",
    aiSummary: "Luxury beach resort with ocean views and modern amenities.",
    propertyType: "Resort",

    address: "Calangute Beach Road",
    city: "Goa",
    state: "Goa",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Beach Access",
      "Breakfast",
      "Parking",
      "Air Conditioning",
    ],

    basePrice: 9500,
    currentPrice: 7899,

    contactPerson: {
      name: "Rahul Sharma",
      phone: "9876543210",
    },

    aiSuggestions: [
      "Best for honeymoon trips",
      "Book during weekdays for discounts",
    ],

    tags: ["Beach", "Luxury", "Family"],

    slug: "golden-beach-resort",

    weather: {},

    // Image: Beach.jpg
  },

  {
    owner: ownerId,
    title: "Skyline Executive Suites",
    description:
      "Experience premium city living with stunning skyline views. Skyline Executive Suites provides elegant interiors, fast internet, business-friendly workspaces, and easy access to shopping malls, restaurants, and nightlife.",
    aiSummary: "Premium city apartment with skyline views.",
    propertyType: "Apartment",

    address: "Marine Drive",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    amenities: ["WiFi", "Lift", "Kitchen", "Parking", "TV"],

    basePrice: 7000,
    currentPrice: 6200,

    contactPerson: {
      name: "Priya Mehta",
      phone: "9876543211",
    },

    aiSuggestions: [
      "Ideal for business travelers",
      "Excellent city connectivity",
    ],

    tags: ["City", "Business", "Luxury"],

    slug: "skyline-executive-suites",

    weather: {},

    // Image: city-Skyline.jpg
  },

  {
    owner: ownerId,
    title: "Metropolitan Grand Hotel",
    description:
      "Stay in the heart of the city with luxurious rooms, rooftop dining, conference facilities, complimentary breakfast, and exceptional hospitality. Perfect for both leisure and corporate guests.",
    aiSummary: "Luxury hotel in the city center.",
    propertyType: "Hotel",

    address: "MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,

    amenities: ["Restaurant", "WiFi", "Gym", "Breakfast", "Room Service"],

    basePrice: 6400,
    currentPrice: 5599,

    contactPerson: {
      name: "Amit Verma",
      phone: "9876543212",
    },

    aiSuggestions: [
      "Close to metro station",
      "Popular among business travelers",
    ],

    tags: ["Hotel", "Business", "City"],

    slug: "metropolitan-grand-hotel",

    weather: {},

    // Image: cityHotel.jpg
  },

  {
    owner: ownerId,
    title: "Cliffside Ocean Retreat",
    description:
      "Perched on a scenic cliff overlooking the Arabian Sea, this luxurious resort offers panoramic sunsets, infinity pool, spacious suites, and gourmet dining. An unforgettable destination for romantic vacations and premium holidays.",
    aiSummary: "Luxury cliffside resort overlooking the ocean.",
    propertyType: "Resort",

    address: "Vagator Cliff Road",
    city: "Goa",
    state: "Goa",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,

    amenities: [
      "Infinity Pool",
      "Spa",
      "Restaurant",
      "Ocean View",
      "WiFi",
      "Parking",
    ],

    basePrice: 14000,
    currentPrice: 11899,

    contactPerson: {
      name: "Sneha Kapoor",
      phone: "9876543213",
    },

    aiSuggestions: ["Excellent sunset views", "Highly rated for couples"],

    tags: ["Ocean", "Luxury", "Resort"],

    slug: "cliffside-ocean-retreat",

    weather: {},

    // Image: cliff-ocean-resort.jpg
  },

  {
    owner: ownerId,
    title: "Royal Desert Glamping Camp",
    description:
      "Experience the magic of Rajasthan's golden dunes in luxurious Swiss tents equipped with modern amenities. Enjoy traditional folk performances, camel safaris, bonfire nights, authentic Rajasthani cuisine, and breathtaking desert sunsets under a sky full of stars.",
    aiSummary: "Luxury desert camping experience with cultural activities.",
    propertyType: "Resort",

    address: "Sam Sand Dunes",
    city: "Jaisalmer",
    state: "Rajasthan",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,

    amenities: [
      "Camel Safari",
      "Campfire",
      "Breakfast",
      "Parking",
      "Restaurant",
      "Cultural Show",
    ],

    basePrice: 6800,
    currentPrice: 5499,

    contactPerson: {
      name: "Vikram Singh",
      phone: "9876543214",
    },

    aiSuggestions: [
      "Perfect for winter vacations",
      "Book sunset safari in advance",
    ],

    tags: ["Desert", "Camping", "Adventure"],

    slug: "royal-desert-glamping-camp",

    weather: {},

    // Image: desertGlamping.jpg
  },

  {
    owner: ownerId,
    title: "Whispering Forest Tree House",
    description:
      "Reconnect with nature in this charming tree house surrounded by lush greenery. Enjoy peaceful mornings, birdsong, wooden interiors, scenic balconies, and unforgettable nights beneath the forest canopy.",
    aiSummary: "Nature-inspired tree house surrounded by dense forest.",
    propertyType: "Cottage",

    address: "Vythiri Forest Road",
    city: "Wayanad",
    state: "Kerala",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,

    amenities: ["Forest View", "WiFi", "Breakfast", "Parking", "Balcony"],

    basePrice: 7200,
    currentPrice: 6299,

    contactPerson: {
      name: "Joseph Mathew",
      phone: "9876543215",
    },

    aiSuggestions: [
      "Ideal for nature lovers",
      "Great destination during monsoon",
    ],

    tags: ["Forest", "Nature", "Tree House"],

    slug: "whispering-forest-tree-house",

    weather: {},

    // Image: forestTreeHouse.jpg
  },

  {
    owner: ownerId,
    title: "Royal Heritage Homestay",
    description:
      "Stay inside a beautifully restored heritage mansion featuring antique interiors, traditional hospitality, handcrafted décor, and authentic regional cuisine. Experience Rajasthan's royal culture while enjoying modern comforts.",
    aiSummary: "Traditional heritage homestay with royal ambience.",
    propertyType: "Homestay",

    address: "Old City Palace Road",
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    amenities: ["Breakfast", "WiFi", "Garden", "Parking", "Restaurant"],

    basePrice: 5900,
    currentPrice: 4999,

    contactPerson: {
      name: "Anjali Rathore",
      phone: "9876543216",
    },

    aiSuggestions: [
      "Perfect for cultural tourism",
      "Visit nearby forts and palaces",
    ],

    tags: ["Heritage", "Culture", "Family"],

    slug: "royal-heritage-homestay",

    weather: {},

    // Image: heritageHomeStay.jpg
  },

  {
    owner: ownerId,
    title: "Peaceful Lakeside Cottage",
    description:
      "Escape to this serene lakeside cottage featuring beautiful sunrise views, cozy wooden interiors, private gardens, boating opportunities, and a relaxing atmosphere perfect for family vacations and romantic escapes.",
    aiSummary: "Peaceful cottage beside a scenic lake.",
    propertyType: "Cottage",

    address: "Lake View Road",
    city: "Nainital",
    state: "Uttarakhand",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,

    amenities: [
      "Lake View",
      "Boating",
      "WiFi",
      "Parking",
      "Garden",
      "Fireplace",
    ],

    basePrice: 7600,
    currentPrice: 6499,

    contactPerson: {
      name: "Neha Joshi",
      phone: "9876543217",
    },

    aiSuggestions: [
      "Best during spring season",
      "Excellent for family vacations",
    ],

    tags: ["Lake", "Nature", "Family"],

    slug: "peaceful-lakeside-cottage",

    weather: {},

    // Image: lakeSideCottage.jpg
  },

  {
    owner: ownerId,
    title: "Modern Skyline Penthouse",
    description:
      "Enjoy luxury living in this elegant penthouse featuring floor-to-ceiling windows, premium interiors, a spacious living room, private balcony, and panoramic city views. Perfect for business executives, couples, and luxury travelers seeking a sophisticated stay.",
    aiSummary:
      "Luxury penthouse with stunning skyline views and premium interiors.",
    propertyType: "Apartment",

    address: "Brigade Road",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    amenities: [
      "High-Speed WiFi",
      "Smart TV",
      "Kitchen",
      "Balcony",
      "Parking",
      "Air Conditioning",
    ],

    basePrice: 9500,
    currentPrice: 8399,

    contactPerson: {
      name: "Arjun Malhotra",
      phone: "9876543218",
    },

    aiSuggestions: ["Ideal for business travelers", "Book weekends early"],

    tags: ["Luxury", "City", "Penthouse"],

    slug: "modern-skyline-penthouse",

    weather: {},

    // Image: modern-penthose.jpg
  },

  {
    owner: ownerId,
    title: "Snow Peak Mountain Cabin",
    description:
      "Nestled among majestic mountains, this cozy wooden cabin offers spectacular valley views, warm interiors, a fireplace, and peaceful surroundings. A perfect destination for adventure lovers and couples seeking a relaxing mountain escape.",
    aiSummary: "Cozy mountain cabin with scenic valley views.",
    propertyType: "Cottage",

    address: "Old Manali Road",
    city: "Manali",
    state: "Himachal Pradesh",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,

    amenities: [
      "Fireplace",
      "Mountain View",
      "WiFi",
      "Parking",
      "Balcony",
      "Breakfast",
    ],

    basePrice: 6400,
    currentPrice: 5499,

    contactPerson: {
      name: "Karan Thakur",
      phone: "9876543219",
    },

    aiSuggestions: [
      "Perfect during snowfall",
      "Suitable for trekking enthusiasts",
    ],

    tags: ["Cabin", "Mountains", "Adventure"],

    slug: "snow-peak-mountain-cabin",

    weather: {},

    // Image: mountain-cabin.jpg
  },

  {
    owner: ownerId,
    title: "Private Island Paradise Villa",
    description:
      "Escape to this exclusive island villa surrounded by crystal-clear waters and tropical greenery. Relax by your private pool, enjoy direct beach access, and experience unmatched luxury in a peaceful island setting.",
    aiSummary: "Exclusive island villa with private pool and beach access.",
    propertyType: "Villa",

    address: "Agatti Island",
    city: "Lakshadweep",
    state: "Lakshadweep",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 6,
    bedrooms: 3,
    beds: 3,
    bathrooms: 3,

    amenities: [
      "Private Pool",
      "Beach Access",
      "WiFi",
      "Breakfast",
      "Airport Pickup",
      "Air Conditioning",
    ],

    basePrice: 22000,
    currentPrice: 18999,

    contactPerson: {
      name: "Riya Fernandes",
      phone: "9876543220",
    },

    aiSuggestions: [
      "Best for honeymoon trips",
      "Limited availability during holidays",
    ],

    tags: ["Island", "Luxury", "Villa"],

    slug: "private-island-paradise-villa",

    weather: {},

    // Image: privateIslandVilla.jpg
  },

  {
    owner: ownerId,
    title: "Rainforest Resort Lodge",
    description:
      "Surrounded by lush rainforest, this eco-friendly resort offers comfortable rooms, guided nature walks, organic dining, and peaceful surroundings. A wonderful retreat for nature lovers and wildlife enthusiasts.",
    aiSummary: "Eco resort located in a tropical rainforest.",
    propertyType: "Resort",

    address: "Madikeri Forest Road",
    city: "Coorg",
    state: "Karnataka",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    amenities: [
      "Nature Walk",
      "Restaurant",
      "WiFi",
      "Parking",
      "Garden",
      "Bonfire",
    ],

    basePrice: 7800,
    currentPrice: 6699,

    contactPerson: {
      name: "Deepak Nair",
      phone: "9876543221",
    },

    aiSuggestions: [
      "Excellent for wildlife lovers",
      "Visit coffee plantations nearby",
    ],

    tags: ["Forest", "Nature", "Resort"],

    slug: "rainforest-resort-lodge",

    weather: {},

    // Image: resort-lodge.jpg
  },

  {
    owner: ownerId,
    title: "Riverside Nature Lodge",
    description:
      "Enjoy the calming sound of flowing water from this riverside lodge featuring wooden cottages, open gardens, riverside seating, and adventure activities like rafting and hiking nearby.",
    aiSummary: "Nature lodge beside a peaceful river.",
    propertyType: "Homestay",

    address: "River View Road",
    city: "Rishikesh",
    state: "Uttarakhand",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    amenities: [
      "River View",
      "Bonfire",
      "WiFi",
      "Parking",
      "Garden",
      "Breakfast",
    ],

    basePrice: 5200,
    currentPrice: 4499,

    contactPerson: {
      name: "Rohit Negi",
      phone: "9876543222",
    },

    aiSuggestions: [
      "Perfect for adventure seekers",
      "Enjoy morning riverside yoga",
    ],

    tags: ["River", "Nature", "Adventure"],

    slug: "riverside-nature-lodge",

    weather: {},

    // Image: riverSlide-lodge.jpg
  },

  {
    owner: ownerId,
    title: "Sunset Hill Retreat",
    description:
      "Located atop a peaceful hill, this retreat offers breathtaking sunset views, spacious balconies, cozy interiors, and a tranquil atmosphere perfect for couples and families looking to unwind.",
    aiSummary: "Hilltop retreat with beautiful sunset views.",
    propertyType: "Villa",

    address: "Hill View Point",
    city: "Mussoorie",
    state: "Uttarakhand",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 5,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,

    amenities: [
      "Hill View",
      "Fireplace",
      "Parking",
      "WiFi",
      "Garden",
      "Breakfast",
    ],

    basePrice: 8900,
    currentPrice: 7599,

    contactPerson: {
      name: "Megha Rawat",
      phone: "9876543223",
    },

    aiSuggestions: [
      "Watch the sunset from the balcony",
      "Ideal for family vacations",
    ],

    tags: ["Hill", "Sunset", "Villa"],

    slug: "sunset-hill-retreat",

    weather: {},

    // Image: sunSetHill.jpg
  },

  {
    owner: ownerId,
    title: "Tropical Infinity Pool Resort",
    description:
      "Relax in this luxurious tropical resort featuring an infinity pool, landscaped gardens, spa facilities, premium suites, and exceptional hospitality. An excellent destination for luxury holidays and romantic escapes.",
    aiSummary: "Luxury tropical resort with infinity pool and spa.",
    propertyType: "Resort",

    address: "Candolim Beach Road",
    city: "Goa",
    state: "Goa",
    country: "India",

    image: {
      url: "",
      public_id: "",
    },

    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    amenities: ["Infinity Pool", "Spa", "Restaurant", "WiFi", "Parking", "Gym"],

    basePrice: 12500,
    currentPrice: 10999,

    contactPerson: {
      name: "Aditya Desai",
      phone: "9876543224",
    },

    aiSuggestions: ["Highly rated luxury stay", "Book pool-view rooms"],

    tags: ["Luxury", "Pool", "Beach"],

    slug: "tropical-infinity-pool-resort",

    weather: {},

    // Image: tropocal-pool-resort.jpg
  },
];

async function initDB() {
  await Listing.deleteMany();
  await Listing.insertMany(listings);

  console.log("Listings Added");
  process.exit();
}

initDB();
