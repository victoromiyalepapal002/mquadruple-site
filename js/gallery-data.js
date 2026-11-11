/* =====================================================================
   GALLERY PHOTOS. The Gallery page shows them in four groups (see GALLERY_CATS).
   The home page shows only the ones marked  home: true

   Each photo line has:
     src      the image file in assets/images/
     caption  text shown when you hover / tap the photo
     alt      short description for screen readers
     cat      which group it goes in:  "biosensor"  "microbiology"  "molecular"  "training"
     tag      the small label written on the photo. Write ANY words you like.
              (Photos taken in our own lab use "Biosensor".)
     size     "" normal, "wide" 2 across, "tall" 2 down, "big" 2 across and 2 down, "full" the whole row
     position optional, which part of the photo stays in view, e.g. "50% 20%"

   To ADD a photo:   upload it to assets/images/ (JPG, about 1000 px wide, under 150 KB),
                     copy one { ... }, line, paste it, change the file name, cat, tag and caption.
   To REPLACE one:   upload the new photo with the SAME file name, or change "src".
   To REMOVE one:    delete its line.
   To MOVE a photo to another group: change its "cat".
   ===================================================================== */

/* The four groups. Change the titles here. "key" must match the "cat" of the photos. */
window.GALLERY_CATS = [
  { key: "biosensor",    title: "Biosensor and diagnostics", note: "Paper microfluidics, test strips and bench work in our laboratory." },
  { key: "microbiology", title: "Microbiology",              note: "Culture plates, Salmonella and Shigella work, and sample handling." },
  { key: "molecular",    title: "Molecular biology",         note: "Photos for this group will be added soon." },
  { key: "training",     title: "Training and conferences",  note: "Workshops, training sessions and conferences." }
];

window.GALLERY = [
  /* ---- Biosensor and diagnostics ---- */
  { src: "assets/images/hero-1.jpg",               cat: "biosensor", tag: "Biosensor", caption: "Five-channel µPAD test strips",         alt: "Numbered paper microfluidic test strips in a foam-lined box", size: "tall", home: true },
  { src: "assets/images/gallery-prototypes.jpg",   cat: "biosensor", tag: "Biosensor", caption: "µPAD prototypes under test",            alt: "Paper microfluidic prototypes taped to a foam block", size: "", home: true },
  { src: "assets/images/gallery-reader.jpg",       cat: "biosensor", tag: "Biosensor", caption: "Sample loading on a portable analyser", alt: "Loading a sample onto a portable analyser", size: "", home: true },
  { src: "assets/images/gallery-assay-tubes.jpg",  cat: "biosensor", tag: "Biosensor", caption: "Colorimetric assay tubes",              alt: "Four labelled tubes with pink colorimetric assay results", size: "wide", position: "50% 18%", home: true },
  { src: "assets/images/hero-3.jpg",               cat: "biosensor", tag: "Biosensor", caption: "Whole-blood samples on paper strips",   alt: "Three paper microfluidic strips carrying blood samples", size: "", home: true },
  { src: "assets/images/hero-2.jpg",               cat: "biosensor", tag: "Biosensor", caption: "Loading a sample",                      alt: "A researcher loading a sample with a pipette", size: "", position: "50% 30%", home: true },
  { src: "assets/images/founder.jpg",              cat: "biosensor", tag: "Biosensor", caption: "Our co-founder in the laboratory",      alt: "Dr Adewoyin M. Ogunmolasuyi in a laboratory coat", size: "tall", position: "50% 22%" },
  { src: "assets/images/gallery-pipetting.jpg",    cat: "biosensor", tag: "Biosensor", caption: "Bench work in the laboratory",          alt: "Researchers in white coats loading samples with pipettes", size: "", position: "50% 28%" },
  { src: "assets/images/gallery-lab-room.jpg",     cat: "biosensor", tag: "Biosensor", caption: "The team at work in the laboratory",    alt: "Team members working at the benches in the laboratory", size: "", position: "50% 55%" },
  { src: "assets/images/gallery-bench.jpg",        cat: "biosensor", tag: "Biosensor", caption: "Preparing a sample at the bench",       alt: "A researcher in a mask and white coat at a laboratory bench", size: "wide", position: "50% 30%" },
  { src: "assets/images/gallery-pipette-bench.jpg",cat: "biosensor", tag: "Biosensor", caption: "Pipetting at the laboratory bench",     alt: "A researcher in a white coat and mask pipetting at a laboratory bench", size: "tall", position: "50% 30%" },
  { src: "assets/images/gallery-review.jpg",       cat: "biosensor", tag: "Biosensor", caption: "Reviewing results together",            alt: "Two researchers in white coats looking at a phone", size: "wide", position: "50% 30%" },
  { src: "assets/images/gallery-bench-2.jpg",      cat: "biosensor", tag: "Biosensor", caption: "Working at the laboratory bench",       alt: "A researcher pipetting at a laboratory bench", size: "wide", position: "50% 35%" },

  /* ---- Microbiology ---- */
  { src: "assets/images/gallery-micro-plates-2.jpg", cat: "microbiology", tag: "Salmonella and Shigella", caption: "Salmonella and Shigella culture work", alt: "Two researchers in white coats handling culture plates", size: "tall" },
  { src: "assets/images/gallery-micro-tubes.jpg",    cat: "microbiology", tag: "Salmonella and Shigella", caption: "Salmonella and Shigella media preparation", alt: "A researcher in a white coat and mask pouring media next to a rack of tubes", size: "tall", position: "50% 30%" },
  { src: "assets/images/gallery-plates.jpg",       cat: "microbiology", tag: "Microbiology", caption: "Culture plates in the laboratory",      alt: "A table of labelled culture plates", size: "tall" },
  { src: "assets/images/gallery-plates-wide.jpg",  cat: "microbiology", tag: "Microbiology", caption: "Culture plates, overhead view",         alt: "Labelled culture plates laid out on a white table", size: "full", position: "50% 45%" },
  { src: "assets/images/gallery-sample-prep.jpg",  cat: "microbiology", tag: "Sample preparation", caption: "Sample preparation",              alt: "Grinding a sample with a mortar and pestle", size: "", home: true },
  { src: "assets/images/gallery-samples.jpg",      cat: "microbiology", tag: "Sample collection", caption: "Transporting samples",             alt: "A researcher carrying a labelled sample cooler box", size: "" },

  /* ---- Molecular biology: add photos here with  cat: "molecular" ---- */

  /* ---- Training and conferences ---- */
  { src: "assets/images/gallery-training.jpg",     cat: "training", tag: "Training with JR Biotek", caption: "Training session with JR Biotek", alt: "Researchers practising pipetting in a training session", size: "wide", home: true },
  { src: "assets/images/gallery-conference.jpg",   cat: "training", tag: "Nairobi, Kenya", caption: "At the African International Biomedical and Biotechnology Conference, Nairobi, Kenya", alt: "Dr Ogunmolasuyi with colleagues at the African International Biomedical and Biotechnology Conference in Nairobi, Kenya", size: "wide", position: "50% 35%" }
];
