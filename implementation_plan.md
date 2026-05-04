# Dropzone: Professional Polish & Hero Slideshow

## User Review Required

> [!NOTE]
> **Regarding the "Connection error"**: The server is actually currently running properly on port 3000. If you double-clicked the [index.html](file:///c:/Users/HP/Documents/dropzone/index.html) file to open it in your browser (so the URL looks like `file:///C:/...`), the backend requests will fail. You **must** open your browser and go exclusively to `http://localhost:3000` to interact with the site properly.

This plan focuses on elevating the professionalism of the site by adding a dynamic hero slideshow and removing all casual emojis in favor of sleek, modern icons.

## Proposed Changes

### 1. Image Generation & Slideshow ([index.html](file:///c:/Users/HP/Documents/dropzone/index.html))

- **Generate 5 Hero Images**: I will generate 5 high-quality, fashion/gaming and lifestyle images featuring models/outfits.
- **Implement Slideshow**: 
  - Update HTML structure in the `.hero-visual` section to contain all 5 images.
  - Add CSS animations/transitions for a smooth crossfade effect.
  - Add a JavaScript `setInterval` to rotate the active image every 30 seconds.

### 2. Replacing Emojis with Professional Icons

I will integrate a professional icon library (like Phosphor Icons via CDN) to cleanly replace every single emoji across the entire codebase.

#### [MODIFY] [index.html](file:///c:/Users/HP/Documents/dropzone/index.html)
- Replace nav icons (moon, cart).
- Replace category filter emojis (⚡, 👕, 👟, 🎮, 🔥, 🏷️).
- Replace AI section emojis (🤖, 🎮, 👕, 💻, 🔥, 💰).
- Replace "Empty Cart" emoji (🛒).

#### [MODIFY] [auth.html](file:///c:/Users/HP/Documents/dropzone/auth.html)
- Replace the success checkmark emoji (✅) with a professional validation icon.

#### [MODIFY] [admin.html](file:///c:/Users/HP/Documents/dropzone/admin.html)
- Replace sidebar emojis (📦, 🛍️, 👥, ⚙️).
- Replace table row emojis.

#### [MODIFY] [server.js](file:///c:/Users/HP/Documents/dropzone/server.js)
- Update product creation and DB defaults so that new products don't use the default box emoji (`📦`), removing emoji references from backend logic.

## Verification Plan
1. Generate images and save them to `images/hero_1.png` through `hero_5.png`.
2. Inspect [index.html](file:///c:/Users/HP/Documents/dropzone/index.html), [auth.html](file:///c:/Users/HP/Documents/dropzone/auth.html), [admin.html](file:///c:/Users/HP/Documents/dropzone/admin.html) to confirm absolutely zero emojis remain.
3. Use the browser subagent to verify the slideshow functions correctly and icons load as expected.
