export const packageTypes = [
  {
    name: "Mini Faith Gift Package",
    price: 28,
    description: "A thoughtful starter gift for encouragement, thank-you moments, and small blessings.",
    included: ["Mini Scripture candle", "Matching prayer card", "Simple gift wrap"],
  },
  {
    name: "Scripture Candle Package",
    price: 38,
    description: "A candle-centered gift with a selected verse and peaceful scent.",
    included: ["Scripture candle", "Prayer card", "Personalized gift message"],
  },
  {
    name: "Prayer Room Package",
    price: 58,
    description: "A quiet set for desks, nightstands, prayer corners, and devotional spaces.",
    included: ["Scripture candle", "Verse acrylic stand", "Prayer card set"],
  },
  {
    name: "Blessed Home Package",
    price: 72,
    description: "A warm home blessing package for housewarmings, families, and hospitality gifts.",
    included: ["Scripture candle", "Acrylic stand", "Scripture frame", "Handwritten note"],
  },
  {
    name: "Rosary Keepsake Package",
    price: 64,
    description: "A keepsake gift for prayer, remembrance, First Communion, or wedding moments.",
    included: ["Rosary option", "Keepsake box", "Prayer card", "Gift message"],
  },
  {
    name: "Family Blessing Package",
    price: 86,
    description: "A family-centered gift with Scripture, memories, and home decor pieces.",
    included: ["Scripture candle", "Family acrylic stand", "Photo frame", "Family blessing card"],
  },
  {
    name: "Premium Faith Gift Box",
    price: 118,
    description: "A fuller gift box with premium packaging and multiple personalized keepsakes.",
    included: ["Scripture candle", "Premium gift box", "Acrylic stand", "Frame", "Prayer cards", "Handwritten note"],
  },
] as const;

export const scriptureThemes = {
  "Peace & Rest": [
    "Psalm 46:10 - Be still, and know that I am God.",
    "Matthew 11:28 - Come to me, all who labor and are heavy laden.",
    "John 14:27 - Peace I leave with you; my peace I give to you.",
  ],
  "Provision, Work & Blessing": [
    "Deuteronomy 8:18 - He gives you power to get wealth.",
    "Proverbs 10:22 - The blessing of the Lord makes rich.",
    "Philippians 4:19 - My God shall supply every need.",
    "Proverbs 16:3 - Commit your work to the Lord.",
    "Galatians 6:9 - In due season we will reap.",
    "Proverbs 22:29 - A man skillful in his work will stand before kings.",
    "Psalm 128:2 - You shall eat the fruit of the labor of your hands.",
  ],
  "Home & Family": [
    "Joshua 24:15 - As for me and my house, we will serve the Lord.",
    "Numbers 6:24-26 - The Lord bless you and keep you.",
    "Psalm 91:1 - Whoever dwells in the shelter of the Most High.",
    "Proverbs 24:3 - By wisdom a house is built.",
  ],
  "Faith & Courage": [
    "Isaiah 41:10 - Fear not, for I am with you.",
    "2 Timothy 1:7 - God gave us a spirit not of fear.",
    "Proverbs 3:5-6 - Trust in the Lord with all your heart.",
    "Philippians 4:13 - I can do all things through Christ who strengthens me.",
  ],
  "Healing & Comfort": [
    "Psalm 23:1 - The Lord is my shepherd.",
    "Psalm 34:18 - The Lord is near to the brokenhearted.",
    "Revelation 21:4 - He will wipe away every tear.",
    "Isaiah 40:31 - Those who hope in the Lord will renew their strength.",
  ],
} as const;

export const candleScents = [
  "Lavender Vanilla",
  "Frankincense Amber",
  "Warm Vanilla Cedar",
  "Coffee Cinnamon",
  "Fresh Linen",
  "Sandalwood Musk",
  "Citrus White Tea",
  "Chamomile Honey",
  "Rose Vanilla",
  "Cedarwood Spice",
];

export const acrylicStandOptions = [
  { name: "Verse Only Acrylic Stand", price: 0 },
  { name: "Photo + Scripture Acrylic Stand", price: 12 },
  { name: "Family Name Acrylic Stand", price: 8 },
  { name: "Memorial Acrylic Stand", price: 10 },
  { name: "Wedding Acrylic Stand", price: 10 },
  { name: "Baby Blessing Acrylic Stand", price: 10 },
  { name: "New Home Acrylic Stand", price: 8 },
] as const;

export const frameOptions = [
  { name: "No Frame", price: 0 },
  { name: "Wood Scripture Frame", price: 18 },
  { name: "White Scripture Frame", price: 16 },
  { name: "Black Scripture Frame", price: 16 },
  { name: "Family Photo Frame", price: 22 },
] as const;

export const calendarOptions = [
  { name: "No Calendar", price: 0 },
  { name: "Family Blessings Calendar", price: 24 },
  { name: "Prayer Calendar", price: 20 },
  { name: "Grandparent Photo Calendar", price: 26 },
  { name: "Marriage Calendar", price: 26 },
  { name: "Baby First Year Calendar", price: 28 },
] as const;

export const rosaryOptions = [
  { name: "No Rosary", price: 0 },
  { name: "Classic Rosary", price: 16 },
  { name: "Rosary Keepsake Box", price: 28 },
  { name: "First Communion Rosary Box", price: 32 },
  { name: "Memorial Rosary Box", price: 34 },
  { name: "Wedding Rosary Box", price: 34 },
] as const;

export const addOns = [
  { name: "Rosary", price: 16 },
  { name: "Framed Print", price: 22 },
  { name: "Photo Acrylic", price: 28 },
  { name: "Prayer Card Set", price: 10 },
  { name: "Family Calendar", price: 24 },
  { name: "Premium Gift Box", price: 18 },
  { name: "Handwritten Note", price: 6 },
  { name: "LED Acrylic Base", price: 20 },
] as const;
