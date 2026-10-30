# M-Quadruple Biotek: Dr A.M. Ogunmolasuyi & Dr Mary A. Adewoyin

A fast, static website. No build step, no frameworks: just HTML, one CSS file and one small JavaScript file.

```
index.html          all page content
css/styles.css      colours are the variables at the top (:root)
js/main.js          menu, 3D tilt, publication filters, image viewer
assets/images/      every photo on the site (replace these)
assets/logo.svg     logo and favicon
```

## Software section

In `index.html`, find `<!-- ============ SOFTWARE ============`. Each `<article class="sw">` is one app (the first is shown first).
- **Edit:** change the text, the `href` links, or the `img src` screenshot.
- **Add:** copy a whole `<article class="sw"> ... </article>` and paste it after the last one.
- **Remove:** delete its `<article>` block.
- **Real screenshots:** upload to `assets/images/software/` and change the file name in `img src`. The two `.svg` files there are illustrations.
- **GitHub button:** remove the `<!--` and `-->` around the "View code" link and paste your repo address.
- **DNA animation:** delete the `<canvas id="helix" ...>` line to remove it.
- `assets/logo-alt.svg` is an optional alternative logo (droplet with DNA); to use it, replace `assets/logo.svg` and `assets/favicon.svg` with it.

## Publish it

**GitHub Pages**
1. Create a repository and upload everything in this folder (keep the folder structure).
2. Settings → Pages → Deploy from a branch → `main` / root → Save.
3. Your site appears at `https://<username>.github.io/<repository>/`. Add your own domain under the same Pages settings.

**Vercel**
1. Push the folder to GitHub.
2. On vercel.com choose **Add New → Project**, import the repository.
3. Framework preset: **Other**. Leave build command and output directory empty. Deploy.

## Replace an image

Open `assets/images/` on GitHub, choose **Add file → Upload files**, and upload a new image **with exactly the same file name**. It replaces the old one. For best speed keep each image under about 150 KB (1400 px on the long side, JPG).

| File | Where it appears |
|---|---|
| `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` | The three floating cards in the top section (portrait, about 3:4) |
| `profile-ogunmolasuyi.jpg` | Dr Ogunmolasuyi's profile card |
| `profile-adewoyin.jpg` | Dr Adewoyin's profile card (portrait works best) |
| `research-presentation.jpg` | "Current work" section |
| `gallery-training.jpg`, `gallery-sample-prep.jpg`, `gallery-prototypes.jpg`, `gallery-reader.jpg`, `gallery-assay-tubes.jpg` | Gallery (the gallery also reuses `hero-1.jpg`, `hero-2.jpg` and `hero-3.jpg`) |
| `spare/` | Photos not currently placed on the page |

## Edit text

Open `index.html` and search for the words you want to change. Each section is marked with a comment such as `<!-- ============ PEOPLE ============ -->`. To add a publication, copy one `<article class="pub" ...>` block in the Publications section and edit it; `data-tags` controls the filter buttons.

## Things to check before going live

- **Phone number:** the old site showed two different numbers (+234 803 692 7285 and +234 803 927 2785), so none is shown. Add the correct one in the Contact section.
- **Dr Adewoyin's biography:** written only from her published papers. Please edit it to her preferred wording and job title.
- **Link previews:** in `index.html`, change the `og:image` address to a full URL once your domain is live.
- **Contact form:** it opens the visitor's email app addressed to `mquadruplebiotek@gmail.com`. For a form that sends without an email app, connect a free service such as Formspree and set the form's `action` to its address.
