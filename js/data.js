/* ==========================================================================
   SHOP DATA — edit this file to change your shop info and menu.
   No coding needed: just change the text between the quotes "..." and
   the numbers. Save, and the website updates automatically.
   ========================================================================== */

const SHOP = {
  name: "HengHeng Coffee",
  nameKh: "ហេងហេង កាហ្វេ",
  nameZh: "兴兴咖啡",
  phone: "010 367 199",            // shown on the site
  phoneLink: "+85510367199",       // used for the "Call" button (no spaces)
  telegram: "+85587728077",        // Telegram username (without @) or phone number with +855
  telegramDisplay: "087 728 077",  // shown on the site
  telegramBot: "HengHengcoffeebot",               // your order bot's username (without @). Leave "" to send orders to the chat above
  facebook: "https://facebook.com/yourpage",
  instagram: "https://instagram.com/yourpage",
  email: "hello@coffeeshop.com",
  address: "Phnom Penh · Open in Google Maps",
  hours: "Every day · 7:00 AM – 6:00 PM",
  mapLink: "https://maps.app.goo.gl/11wdizqCUpBjVHxP6",
  // Map shown on the page (latitude,longitude of the shop)
  mapEmbed: "https://www.google.com/maps?q=11.5481768,104.9228912&z=17&output=embed",
};

/* Menu categories (the tabs above the menu). */
const CATEGORIES = [
  { id: "all",      en: "All",        kh: "ទាំងអស់",     zh: "全部" },
  { id: "coffee",   en: "Coffee",     kh: "កាហ្វេ",      zh: "咖啡" },
  { id: "phin",     en: "Phin Coffee", kh: "កាហ្វេរហ្វីន", zh: "滴滤咖啡" },
  { id: "matcha",   en: "Matcha",     kh: "ម៉ាឆា",       zh: "抹茶" },
  { id: "tea",      en: "Tea",        kh: "តែ",          zh: "茶饮" },
  { id: "frappe",   en: "Frappe",     kh: "ក្រឡុក",      zh: "冰沙" },
  { id: "soda",     en: "Soda",       kh: "សូដា",        zh: "苏打" },
  { id: "hot",      en: "Hot Drinks", kh: "ភេសជ្ជៈក្តៅ", zh: "热饮" },
];

/* --------------------------------------------------------------------------
   MENU ITEMS
   kh / en / zh : drink name in Khmer, English and Chinese
   price     : price in Riel (number, no commas)
   cat       : one of the category ids above
   popular   : true → also shows in "Most Popular" + a badge
   image     : (optional) path to a real photo, e.g. "images/menu/latte.png"
               If there is no image, a drink cup is drawn automatically using:
   layers    : drink colours from BOTTOM to TOP, [colour, height]  (heights add up to 1)
   top       : "cream" | "whip" | "foam"   (optional topping)
   extra     : "pearls" | "lemon" | "bubbles" | "jelly"  (optional)
   hot       : true → draws a hot ceramic cup instead of an iced cup
   -------------------------------------------------------------------------- */
const MENU = [
  // ---------- COFFEE ----------
  { kh: "កាហ្វេទឹកដោះគោទឹកកក", en: "Iced Milk Coffee", zh: "冰奶咖啡", price: 5000, cat: "coffee", popular: true,
    layers: [["#c99a68", 1]] },
  { kh: "កាហ្វេខ្មៅទឹកកក", en: "Iced Black Coffee", zh: "冰黑咖啡", price: 5000, cat: "coffee",
    layers: [["#2b160c", 1]] },
  { kh: "ឡាតេ", en: "Iced Latte", zh: "冰拿铁", price: 5000, cat: "coffee", popular: true,
    layers: [["#f3e9dc", 0.55], ["#6b3e1f", 0.45]] },
  { kh: "កាពូឈីណូ", en: "Iced Cappuccino", zh: "冰卡布奇诺", price: 5000, cat: "coffee",
    layers: [["#ecdcc6", 0.4], ["#a8774f", 0.6]], top: "foam" },
  { kh: "ម៉ូកា", en: "Iced Mocha", zh: "冰摩卡", price: 6000, cat: "coffee",
    layers: [["#5a3420", 0.4], ["#8a5a3a", 0.6]], top: "whip" },
  { kh: "កាហ្វេដូង", en: "Coconut Coffee", zh: "椰子咖啡", price: 6000, cat: "coffee", popular: true,
    layers: [["#f2ebdf", 0.6], ["#7a4a2a", 0.4]] },
  { kh: "កាហ្វេការ៉ាមែល", en: "Caramel Macchiato", zh: "焦糖玛奇朵", price: 6000, cat: "coffee",
    layers: [["#f5ecdf", 0.5], ["#a86d38", 0.5]], top: "cream" },
  { kh: "កាហ្វេខ្មៅក្រូច", en: "Orange Espresso", zh: "香橙浓缩咖啡", price: 6000, cat: "coffee",
    layers: [["#f2b632", 0.55], ["#3a1f10", 0.45]] },

  // ---------- PHIN COFFEE (កាហ្វេរហ្វីន) ----------
  { kh: "កាហ្វេរហ្វីន ទឹកដោះគោទឹកកក", en: "Phin Iced Milk Coffee", zh: "滴滤冰奶咖啡", price: 3000, cat: "phin",
    layers: [["#f1e2c4", 0.25], ["#4a2814", 0.75]] },
  { kh: "កាហ្វេរហ្វីន ខ្មៅទឹកកក", en: "Phin Iced Black Coffee", zh: "滴滤冰黑咖啡", price: 3000, cat: "phin",
    layers: [["#24120a", 1]] },

  // ---------- MATCHA ----------
  { kh: "ម៉ាឆាឡាតេ", en: "Matcha Latte", zh: "抹茶拿铁", price: 5000, cat: "matcha", popular: true,
    layers: [["#f4f1e6", 0.5], ["#7fae4a", 0.5]] },
  { kh: "ម៉ាឆាក្រែម", en: "Matcha Cream", zh: "抹茶奶盖", price: 6000, cat: "matcha",
    layers: [["#86b34f", 1]], top: "cream" },
  { kh: "ស្ត្របឺរីម៉ាឆា", en: "Strawberry Matcha", zh: "草莓抹茶", price: 9000, cat: "matcha", popular: true,
    layers: [["#d94a5c", 0.3], ["#f6eee8", 0.35], ["#6ea042", 0.35]] },
  { kh: "ម៉ាឆាដូង", en: "Coconut Matcha", zh: "椰子抹茶", price: 9000, cat: "matcha",
    layers: [["#eef3e5", 0.6], ["#8fbf5a", 0.4]] },

  // ---------- TEA ----------
  { kh: "តែទឹកដោះគោ", en: "Milk Tea", zh: "奶茶", price: 5000, cat: "tea",
    layers: [["#e2a46a", 1]] },
  { kh: "តែបៃតងទឹកដោះគោ", en: "Green Milk Tea", zh: "绿奶茶", price: 5000, cat: "tea",
    layers: [["#b9d39a", 1]] },
  { kh: "តែគុជស្ករត្នោត", en: "Brown Sugar Bubble Tea", zh: "黑糖珍珠奶茶", price: 6500, cat: "tea", popular: true,
    layers: [["#d9b48c", 1]], extra: "pearls" },
  { kh: "តែក្រូចឆ្មា", en: "Lemon Tea", zh: "柠檬茶", price: 3000, cat: "tea",
    layers: [["#c4651c", 1]], extra: "lemon" },

  // ---------- FRAPPE ----------
  { kh: "កាហ្វេក្រឡុក", en: "Coffee Frappe", zh: "咖啡冰沙", price: 6000, cat: "frappe",
    layers: [["#b98a5e", 1]], top: "whip" },
  { kh: "សូកូឡាក្រឡុក", en: "Chocolate Frappe", zh: "巧克力冰沙", price: 6000, cat: "frappe",
    layers: [["#5b3420", 1]], top: "whip" },
  { kh: "ស្ត្របឺរីក្រឡុក", en: "Strawberry Smoothie", zh: "草莓冰沙", price: 8500, cat: "frappe", popular: true,
    layers: [["#e0475a", 1]], top: "whip" },
  { kh: "ប៊្លូបឺរីក្រឡុក", en: "Blueberry Frappe", zh: "蓝莓冰沙", price: 8500, cat: "frappe",
    layers: [["#8a5bb0", 1]], top: "whip" },
  { kh: "ផាសិនក្រឡុក", en: "Passion Fruit Frappe", zh: "百香果冰沙", price: 6500, cat: "frappe",
    layers: [["#f6b21a", 1]], top: "whip" },

  // ---------- SODA ----------
  { kh: "ផាសិនសូដា", en: "Passion Soda", zh: "百香果苏打", price: 6000, cat: "soda", popular: true,
    layers: [["#f3a51a", 0.4], ["#fff1b8", 0.6]], extra: "bubbles" },
  { kh: "ស្ត្របឺរីសូដា", en: "Strawberry Soda", zh: "草莓苏打", price: 6000, cat: "soda",
    layers: [["#e3394f", 0.35], ["#ffd5db", 0.65]], extra: "bubbles" },
  { kh: "ប្លូហាវ៉ៃសូដា", en: "Blue Hawaii Soda", zh: "蓝色夏威夷苏打", price: 6000, cat: "soda",
    layers: [["#2fa4e7", 0.5], ["#cdeeff", 0.5]], extra: "bubbles" },
  { kh: "ក្រូចឆ្មាសូដា", en: "Lemon Soda", zh: "柠檬苏打", price: 5500, cat: "soda",
    layers: [["#fff3a8", 1]], extra: "lemon" },

  // ---------- HOT ----------
  { kh: "អាមេរិកាណូក្តៅ", en: "Hot Americano", zh: "热美式咖啡", price: 5000, cat: "hot", hot: true,
    layers: [["#2b160c", 1]] },
  { kh: "ឡាតេក្តៅ", en: "Hot Latte", zh: "热拿铁", price: 5000, cat: "hot", hot: true,
    layers: [["#c79a6b", 1]], top: "foam" },
  { kh: "កាពូឈីណូក្តៅ", en: "Hot Cappuccino", zh: "热卡布奇诺", price: 5000, cat: "hot", hot: true,
    layers: [["#b07d52", 1]], top: "cream" },
];

/* Extras shown under the menu. */
const TOPPINGS = [
  { kh: "គុជ", en: "Pearls", zh: "珍珠", price: 1000 },
  { kh: "ចាហួយ", en: "Jelly", zh: "果冻", price: 1000 },
  { kh: "ក្រែមឈីស", en: "Cheese Foam", zh: "芝士奶盖", price: 2000 },
  { kh: "បន្ថែមកាហ្វេ", en: "Extra Shot", zh: "加浓缩", price: 2000 },
  { kh: "កែវធំ", en: "Large Size", zh: "大杯", price: 1000 },
];

const SUGAR_LEVELS = ["0%", "25%", "50%", "75%", "100%"];
