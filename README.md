# M-Quadruple Biotek website

A fast static site. No build step, no frameworks. **Almost everything you will ever edit is in one file: `js/content.js`.**

```
index.html            page shell (meta tags, favicon links)
js/content.js         ALL text, links, software, team, publications, gallery  <-- edit this
js/main.js            builds the page + the 3D DNA animation (no need to touch)
css/styles.css        design. Brand colours are the variables at the top (:root)
assets/logo.svg       logo (header + footer)
assets/favicon.svg    browser-tab icon (also favicon.png and apple-touch-icon.png)
assets/og-image.png   picture shown when the link is shared on WhatsApp, LinkedIn, etc.
assets/images/        all photos
assets/images/software/   app screenshots
```

## Common jobs (all in `js/content.js` unless stated)

**Add software.** Open `software: { items: [ ... ] }`, copy one whole `{ ... },` block, paste it after the last one, edit the name, text, `url`, `image`. The first block is shown first and is the featured one in the top section.

**Put software in a different order.** Move its `{ ... },` block up or down.

**Remove software.** Delete its whole `{ ... },` block.

**Show real screenshots of your apps.** Open each app, take a screenshot (about 16:10, e.g. 1600x1000), save it as JPG/WebP in `assets/images/software/`, then change `image: "assets/images/software/anaemia.jpg"`. (The two `.svg` files there are illustrations used until you add screenshots.)

**Show the "View code" button.** Paste your GitHub link into `repo: ""` for that software. Empty = button hidden.

**Change the logo.** Replace `assets/logo.svg` (or upload a PNG and set `brand.logo`). Square works best.

**Change the favicon.** Replace `assets/favicon.svg`, `assets/favicon.png` (32x32) and `assets/apple-touch-icon.png` (180x180), or change `brand.favicon`.

**Change, add or remove a photo.** Upload the new image into `assets/images/` and use its file name in `content.js`. For the gallery, copy one `{ src, caption, alt, size }` line. `size` can be `"wide"`, `"tall"` or `""`. Keep photos under about 150 KB each (JPG, 1400 px on the long side).

**Add a publication.** Copy one block in `publications.items`. The filter buttons are made automatically from the `tags`.

**Reorder or hide a whole section.** Edit the `sections: [...]` list near the top (delete a name to hide it). Edit `nav` for the top menu.

**Turn off the 3D DNA animation.** Set `hero.motion: false`.

**Italic gold words in headings.** Wrap them like `<em>this</em>`.

## Publish

**Vercel (recommended, same as your apps):** push this folder to a GitHub repo, then Vercel -> Add New -> Project -> import it. Framework preset **Other**, leave build command and output directory empty -> Deploy. Every later GitHub edit updates the site automatically.

**GitHub Pages:** Settings -> Pages -> Deploy from branch -> `main` / root.

## Before going live

- **Link previews:** in `index.html`, change `og:image` to the full address of `assets/og-image.png` once your domain is live (for example `https://yourdomain.com/assets/og-image.png`).
- **Phone number:** add it to `contact.phone` once confirmed. The old site showed two different numbers, so none is shown.
- **Dr Adewoyin's bio:** written from her published papers. Please adjust to her preferred wording and job title.
- **Contact form:** by default it opens the visitor's email app. For a form that sends directly, create a free Formspree form and paste its address into `contact.formEndpoint`.
- **Screenshots:** see "Show real screenshots" above.
