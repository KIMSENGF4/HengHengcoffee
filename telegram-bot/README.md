# 🤖 Telegram Order Bot

A Telegram bot for your coffee shop. It speaks Khmer, English and 中文 and uses the same menu as the website.

**What customers can do**
- Browse the menu by category (or ⭐ Popular), pick a drink and choose a sugar level
- Edit the basket (➕ / ➖), then check out with pickup or delivery
- Share their phone number and delivery location with one tap, and add a note
- See opening hours, the map location and contact info
- Press **Send order on Telegram** on the website to open the bot with their basket already filled in

**What you (the shop) get**
- Each new order arrives in your Telegram chat with the customer's name, phone, address or location pin, the drinks and the total
- Your buttons: **👍 Accept**, then **✅ Ready / 🛵 On the way**, or **❌ Reject**. Each tap sends a message to the customer in their own language.

It runs free on **Cloudflare Workers**. You don't need to install anything or keep a computer running.

---

## Setup (about 15 minutes)

### 1. Create the bot
1. In Telegram, open **@BotFather** and send `/newbot`.
2. Pick a name (e.g. `HengHeng Coffee`) and a username ending in `bot` (e.g. `HengHengCoffeeBot`).
3. BotFather gives you a **token** like `123456:ABC-xyz…`. Keep it secret.
4. Optional: send `/setuserpic` to add your logo and `/setdescription` to add a short intro.

### 2. Create the Worker
1. Sign up free at [dash.cloudflare.com](https://dash.cloudflare.com).
2. Go to **Workers & Pages → Create → Create Worker**. Name it e.g. `coffee-bot` and click **Deploy**.
3. Click **Edit code**, delete everything in the editor, paste in all of **`worker.js`** from this folder and click **Deploy**.

### 3. Add memory (KV) so the bot remembers baskets
1. Go to **Storage & Databases → KV → Create** and name it `coffee-bot-state`.
2. Open your Worker → **Settings → Bindings → Add → KV namespace**.
   Set **Variable name** to `STATE` and pick `coffee-bot-state`.

### 4. Add the settings
Open your Worker → **Settings → Variables and Secrets → Add**:

| Name | Type | Value |
|---|---|---|
| `BOT_TOKEN` | Secret | the token from BotFather |
| `WEBHOOK_SECRET` | Secret | any long random password you make up (letters and numbers only) |

### 5. Connect the bot
In your browser, open:
```
https://coffee-bot.<your-subdomain>.workers.dev/setup?key=<your WEBHOOK_SECRET>
```
You should see **✅ Bot is connected!**

### 6. Tell the bot where to send orders
1. Open your bot in Telegram and send `/id`. It replies with your chat id.
   - To have the whole staff receive orders, add the bot to a staff **group** and send `/id` in that group instead. The group id starts with `-`.
2. Add one more variable to the Worker: `ADMIN_CHAT_ID` (Text) = that number.
3. Done! Send `/start` to your bot and place a test order.

### 7. Connect the website
In `js/data.js`, set your bot's username (without @):
```js
telegramBot: "HengHengCoffeeBot",
```
Now **Send order on Telegram** on the website opens the bot with the basket filled in.
Very large orders (more than about 10 different drinks) fall back to the old copy‑and‑paste method.

---

## Changing the menu
The bot reads its menu from a copy of `js/data.js` that is built into `worker.js`. When you change the menu:
1. Edit `js/data.js` as usual.
2. Right-click `telegram-bot/build.ps1` → **Run with PowerShell**. This rebuilds `worker.js`.
3. Paste the new `worker.js` into the Cloudflare editor and click **Deploy**.

> Always update the bot when you add, remove or reorder drinks. Website orders send drinks by their position in the menu, so the bot and the website must have the same list.

## Files
| File | What it is |
|---|---|
| `worker.js` | ✅ the file you paste into Cloudflare (generated, don't edit) |
| `bot.js` | the bot logic and all the bot texts (KH / EN / 中文 are in `T` at the top) |
| `build.ps1` | combines `../js/data.js` + `bot.js` into `worker.js` |
