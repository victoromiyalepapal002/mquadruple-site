# M-Quadruple Biotek website

A fast static site: HTML pages, one CSS file and a little JavaScript. No build step.

## Pages

| Page | What it shows |
|---|---|
| `index.html` | Home: short summaries, each with a "Read more" button |
| `about.html` | Full about, services, research areas, journey, current work |
| `software.html` | Full details of each software |
| `team.html` | Co-founders and the manager |
| `publications.html` | Every publication, with topic filters |
| `gallery.html` | Every photo |

## The 5 files you will edit most

| File | Edit it to change |
|---|---|
| `js/site.js` | Menu, phone number, WhatsApp, email, address, social icons, footer links, logo path. **Changes on every page at once.** |
| `js/gallery-data.js` | Gallery photos (add, replace, remove, reorder, captions). Photos marked `home: true` also show on the home page. |
| `js/publications-data.js` | Publications. The home page shows the first 3, the Publications page shows all. |
| `team.html` | Co-founder and manager text and photos |
| `index.html` / `about.html` / `software.html` | Page text. Search for the words you want to change. |

## Common jobs

**Change the phone number / WhatsApp:** `js/site.js` -> `contact` (`phone` is shown, `whatsapp` is digits only, e.g. `2347048474903`).

**Add / replace / remove a gallery photo:** upload the picture to `assets/images/`, then edit its line in `js/gallery-data.js`. To replace a photo keep the same file name. Photos under about 150 KB load fastest.

**Add a publication:** copy one `{ ... },` block in `js/publications-data.js` to the top and edit it.

**Add software:** in `software.html` copy a whole `<article class="sw"> ... </article>` and edit it. Also copy a card on the home page (`<article class="swc">` in `index.html`). Put real screenshots in `assets/images/software/` and change the `img src` (the two `.svg` files are illustrations).

**GitHub "View code" button:** in `software.html`, remove the `<!--` and `-->` around the "View code" link and paste your repository address.

**Dr Adeniyi's photo:** replace `assets/images/profile-adeniyi.jpg` (same file name) to change it.

**Change the logo:** replace `assets/logo.png` (keep the name). **Favicon:** replace `assets/favicon.ico`, `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png`.

**3D DNA / molecule animations:** each `<canvas class="helix">` or `<canvas class="mol">` is one animation. Delete the line to remove it.

**Gold italic words in headings:** wrap them in `<em>...</em>`.

## Publish

**Vercel:** push the folder to GitHub, then Vercel -> Add New -> Project -> import. Framework preset **Other**, leave build command and output directory empty -> Deploy. Later GitHub edits redeploy automatically.

## Before going live

- **Link previews:** in each page's `<head>`, change `og:image` to the full address of `assets/og-image.png` once your domain is live.
- **X (Twitter) link:** `js/site.js` uses `https://twitter.com/mquadruple`. Correct it if the handle is different, and add GitHub if you like.
- **Contact form:** it opens the visitor's email app. To send directly, put a Formspree address in `contact.formEndpoint` in `js/site.js`.
- **Founder photo:** `assets/images/founder.jpg` shows a lab coat reading "Ricores University" and posters with garbled text. Consider replacing it with a real photo (same file name).
