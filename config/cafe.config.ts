export const CAFE_CONFIG = {
  // Identity
  name: "Noir Café",
  tagline: "Where every sip tells a story.",
  shortName: "NOIR",
  logo: "https://res.cloudinary.com/demo/image/upload/v1625645634/sample.jpg",
  heroImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",

  // Theme — change these = entire site transforms
  theme: {
    bg: "#0a0a0a",
    bgSecondary: "#111111",
    accent: "#c9a84c",
    accentMuted: "#c9a84c33",
    text: "#f0ece4",
    textMuted: "#8a8070",
    cardBg: "#161616",
    border: "#2a2520",
  },

  // Typography
  fonts: {
    heading: "Cormorant Garamond",
    body: "DM Sans",
  },

  // Loading screen
  loader: {
    text: "Brewing your experience",
    duration: 2800,
  },

  // Currency & table
  currency: "₹",
  showTableNumber: true,

  // Social
  social: {
    instagram: "https://instagram.com/noircafe",
    zomato: "",
    maps: "https://maps.google.com",
  },

  // Features
  features: {
    combos: true,
    specials: true,
    vegNonVegFilter: true,
    searchBar: false,
  },
};
