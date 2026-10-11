# ☕ Coffee Shop Website

A simple, fast coffee shop website with a trilingual menu (Khmer · English · 中文 Chinese), prices in Riel, and Telegram ordering.
It uses plain HTML, CSS and JavaScript, so there is nothing to install or build.

## Folder structure

```
coffee-shop-website/
├── index.html        ← the page layout and text
├── css/style.css     ← colours, fonts, design
├── js/data.js        ← ✏️ YOUR SHOP INFO + MENU (edit this one!)
├── js/main.js        ← site logic (menu, order basket, animations)
├── images/           ← photos
├── favicon.svg       ← browser tab icon
└── .nojekyll         ← tells GitHub Pages to serve files as-is
```

## ✏️ How to edit

| I want to change…                       | Edit this                                   |
|-----------------------------------------|---------------------------------------------|
| Shop name, phone, Telegram, address, map | `js/data.js` → `SHOP`                       |
| Drinks, prices, categories              | `js/data.js` → `MENU` / `CATEGORIES`        |
| Add-ons (pearls, jelly…)                | `js/data.js` → `TOPPINGS`                   |
| Brand colours                           | `css/style.css` → `:root` at the top        |
| Headings, About text, cakes section     | `index.html`                                |
| Hero background photo                   | replace `images/hero.jpg`                   |

### Use real drink photos
Each drink is drawn automatically as a cup. To use a real photo instead:
1. Put the photo in `images/menu/`. A PNG with a transparent background looks best.
2. In `js/data.js`, add `image` to that drink:
   ```js
   { kh: "ឡាតេ", en: "Iced Latte", zh: "冰拿铁", price: 6000, cat: "coffee", image: "images/menu/latte.png", layers: [["#6b3e1f", 1]] },
   ```

## ▶️ Run it in VS Code
1. Open the `coffee-shop-website` folder in VS Code (**File → Open Folder**).
2. Install the **Live Server** extension. VS Code will suggest it automatically.
3. Right-click `index.html` → **Open with Live Server**. The site updates every time you save.

## 🌐 Put it online with GitHub Pages (free)
1. Create a new repository on [github.com](https://github.com/new), for example `coffee-shop`.
2. Upload the files. Either drag everything inside this folder into **Add file → Upload files**, or use git:
   ```bash
   git init
   git add .
   git commit -m "Coffee shop website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/coffee-shop.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**. Under *Branch*, pick `main` and `/ (root)`, then click **Save**.
4. After about a minute your site is live at `https://YOUR-USERNAME.github.io/coffee-shop/`.

## How ordering works
Customers tap **+** on drinks, choose a sugar level and press **Send order on Telegram**.
The order text is copied, Telegram opens with your shop chat, and the customer pastes and sends it.
Set your Telegram username in `js/data.js` → `SHOP.telegram`.

## 🤖 Telegram order bot
Want customers to order inside Telegram, with the shop getting each order and Accept / Ready buttons? See [telegram-bot/README.md](telegram-bot/README.md).
