/* =====================================================================
   GALLERY PHOTOS. The Gallery page shows every photo below.
   The home page shows only the ones marked  home: true

   To ADD a photo:   1) upload it to assets/images/   (JPG, about 1000 px wide, under 150 KB)
                     2) copy one { ... }, line, paste it, and change the file name and caption.
   To REPLACE one:   upload the new photo with the SAME file name, or change "src".
   To REMOVE one:    delete its line.
   To REORDER:       move the line up or down.

   size: "" = normal, "wide" = 2 across, "tall" = 2 down, "big" = 2 across and 2 down.
   position: optional, which part of the photo stays in view, e.g. "50% 20%" (left% top%).
   ===================================================================== */
window.GALLERY = [
  { src: "assets/images/gallery-training.jpg",     caption: "Hands-on biosensor training",           alt: "Researchers practising pipetting in a training session", size: "wide", home: true },
  { src: "assets/images/gallery-sample-prep.jpg",  caption: "Sample preparation",                    alt: "Grinding a sample with a mortar and pestle", size: "tall", home: true },
  { src: "assets/images/hero-1.jpg",       caption: "Five-channel µPAD test strips",         alt: "Numbered paper microfluidic test strips in a foam-lined box", size: "tall", home: true },
  { src: "assets/images/gallery-prototypes.jpg",   caption: "µPAD prototypes under test",            alt: "Paper microfluidic prototypes taped to a foam block", size: "", home: true },
  { src: "assets/images/gallery-reader.jpg",       caption: "Sample loading on a portable analyser", alt: "Loading a sample onto a portable analyser", size: "", home: true },
  { src: "assets/images/gallery-assay-tubes.jpg",  caption: "Colorimetric assay tubes",              alt: "Four labelled tubes with pink colorimetric assay results", size: "wide", position: "50% 18%", home: true },
  { src: "assets/images/hero-3.jpg", caption: "Whole-blood samples on paper strips",   alt: "Three paper microfluidic strips carrying blood samples", size: "", home: true },
  { src: "assets/images/hero-2.jpg",      caption: "Loading a sample",                      alt: "A researcher loading a sample with a pipette", size: "", position: "50% 30%", home: true },

  { src: "assets/images/founder.jpg",              caption: "Our co-founder in the laboratory",      alt: "Dr Adewoyin M. Ogunmolasuyi in a laboratory coat", size: "big", position: "50% 22%" },
  { src: "assets/images/gallery-conference.jpg",   caption: "At a conference outside Nigeria",       alt: "Dr Ogunmolasuyi with colleagues at an international conference", size: "wide", position: "50% 35%" },
  { src: "assets/images/gallery-pipetting.jpg",    caption: "Bench work in the laboratory",          alt: "Researchers in white coats loading samples with pipettes", size: "", position: "50% 28%" },
  { src: "assets/images/gallery-lab-room.jpg",     caption: "The team at work in the laboratory",    alt: "Team members working at the benches in the laboratory", size: "", position: "50% 55%" },

  { src: "assets/images/gallery-pipette-bench.jpg", caption: "Pipetting at the laboratory bench", alt: "A researcher in a white coat and mask pipetting at a laboratory bench", size: "tall", position: "50% 30%" },
  { src: "assets/images/gallery-bench.jpg",        caption: "Preparing a sample at the bench",       alt: "A researcher in a mask and white coat at a laboratory bench", size: "wide", position: "50% 30%" },
  { src: "assets/images/gallery-samples.jpg",      caption: "Transporting samples",                  alt: "A researcher carrying a labelled sample cooler box", size: "tall" },
  { src: "assets/images/gallery-review.jpg",       caption: "Reviewing results together",            alt: "Two researchers in white coats looking at a phone", size: "wide", position: "50% 30%" },
  { src: "assets/images/gallery-plates.jpg",       caption: "Culture plates in the laboratory",      alt: "A table of labelled culture plates", size: "tall" },
  { src: "assets/images/gallery-plates-wide.jpg",  caption: "Culture plates, overhead view",         alt: "Labelled culture plates laid out on a white table", size: "big", position: "50% 45%" },
  { src: "assets/images/gallery-bench-2.jpg",      caption: "Working at the laboratory bench",       alt: "A researcher pipetting at a laboratory bench", size: "big", position: "50% 35%" }
];
