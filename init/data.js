const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b" },
    price: 1500,
    location: "Delhi, India",
    country: "United States",
    category: ["beach","countryside","nature","romantic","rooms"]
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: ["apartment","cities","trending","rooms"]
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d" },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: ["mountains","cabin","nature","adventure"]
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945" },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: ["villa","historic","luxury","romantic", "rooms"]
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4" },
    price: 800,
    location: "Portland",
    country: "United States",
    category: ["treehouse","forest","nature","eco"]
  },
  {
    title: "Beachfront Paradise",
    description: "Step out onto the sandy beach.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9" },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: ["beach","luxury","romantic","pools"]
  },
  {
    title: "Rustic Cabin by the Lake",
    description: "Fishing and kayaking.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b" },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    category: ["cabin","lake","nature","adventure","farms"]
  },
  {
    title: "Luxury Penthouse with City Views",
    description: "Panoramic city views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd" },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: ["apartment","cities","luxury"]
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Hit the slopes.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb" },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: ["mountains","luxury","adventure"]
  },
  {
    title: "Safari Lodge in the Serengeti",
    description: "Wild experience.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e" },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: ["wildlife","adventure","nature","luxury"]
  },
  {
    title: "Historic Canal House",
    description: "Stay in history.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4" },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    category: ["historic","cities","romantic"]
  },
  {
    title: "Private Island Retreat",
    description: "Entire island.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972" },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    category: ["island","luxury","romantic"]
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description: "Picturesque escape.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f" },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    category: ["countryside","historic","romantic"]
  },
  {
    title: "Historic Brownstone in Boston",
    description: "Elegant stay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1533619239233-6280475a633a" },
    price: 2200,
    location: "Boston",
    country: "United States",
    category: ["historic","cities","apartment"]
  },
  {
    title: "Beachfront Bungalow in Bali",
    description: "Relax on beach.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602391833977-358a52198938" },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    category: ["beach","villa","romantic","nature","pools"]
  },
  {
    title: "Mountain View Cabin in Banff",
    description: "Breathtaking views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb" },
    price: 1500,
    location: "Banff",
    country: "Canada",
    category: ["mountains","cabin","nature","domes"]
  },
  {
    title: "Art Deco Apartment in Miami",
    description: "1920s glamour.",
    image: { filename: "listingimage", url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579" },
    price: 1600,
    location: "Miami",
    country: "United States",
    category: ["apartment","cities","beach","rooms","pools","arctic"]
  },
  {
    title: "Tropical Villa in Phuket",
    description: "Infinity pool.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9" },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    category: ["villa","beach","luxury","romantic","pools","arctic"]
  },
  {
    title: "Historic Castle in Scotland",
    description: "Royal stay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98" },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    category: ["historic","luxury","unique","castles"]
  },
  {
    title: "Desert Oasis in Dubai",
    description: "Luxury desert stay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1518684079-3c830dcef090" },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    category: ["desert","luxury","resort"]
  },
  {
    title: "Beachfront Villa in Banglore",
    description: "Mediterranean views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f" },
    price: 2500,
    location: "Mykonos",
    country: "NIT Surathkhal, Banglore",
    category: ["villa","beach","luxury","romantic","pools"]
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    description: "Eco stay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7" },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    category: ["treehouse","eco","nature","forest"]
  },
  {
    title: "Historic Cottage in Charleston",
    description: "Charming stay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904" },
    price: 1600,
    location: "Charleston",
    country: "United States",
    category: ["historic","romantic","countryside"]
  },
  {
    title: "Modern Apartment in Tokyo",
    description: "City life.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1480796927426-f609979314bd" },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    category: ["apartment","cities","trending"]
  },
  {
    title: "Lakefront Cabin in New Hampshire",
    description: "Lake stay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce" },
    price: 1200,
    location: "New Hampshire",
    country: "United States",
    category: ["lake","cabin","nature","family","farms"]
  },
  {
    title: "Luxury Villa in the Maldives",
    description: "Ocean villa.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000" },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
    category: ["island","villa","luxury","romantic"]
  },
  {
    title: "Ski Chalet in Aspen",
    description: "Ski resort.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1" },
    price: 4000,
    location: "Aspen",
    country: "United States",
    category: ["mountains","luxury","adventure", "trending"]
  },
  {
    title: "Secluded Beach House in Costa Rica",
    description: "Beach escape.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2" },
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
    category: ["beach","nature","romantic","eco", "rooms","pools"]
  },
];

module.exports = { data: sampleListings };