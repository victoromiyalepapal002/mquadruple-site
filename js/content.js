/* =====================================================================
   M-QUADRUPLE BIOTEK: SITE CONTENT
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit for text, images, links,
   software, team, publications and gallery.

   Quick rules
   - To CHANGE something: edit the text between the quotes.
   - To ADD something: copy one { ... }, block inside a list, paste it
     right after, and edit it. Keep the comma between blocks.
   - To REMOVE something: delete its whole { ... }, block.
   - To REORDER something: move its block up or down.
   - Italic gold accent words: wrap them in <em>like this</em>.
   - Images live in assets/images/. Use the file path as shown.
   ===================================================================== */

window.SITE = {

  /* ---------- Brand: logo, favicon, name ---------- */
  brand: {
    name: "M-Quadruple",
    suffix: "Biotek Ltd",
    logo: "assets/logo.svg",          // replace the file, or point to another one (svg/png)
    favicon: "assets/favicon.svg",    // browser-tab icon (also see favicon.png in assets/)
    tagline: "Advancing diagnostics with accessible biosensor technology."
  },

  /* ---------- Page order: reorder or delete names to move or hide a section ----------
     available: software, about, team, research, journey, publications, work, gallery, contact */
  sections: ["software", "about", "team", "research", "journey", "publications", "work", "gallery", "contact"],

  /* ---------- Top menu (href must match a section name above, e.g. #software) ---------- */
  nav: [
    { label: "Software",     href: "#software" },
    { label: "About",        href: "#about" },
    { label: "Our team",     href: "#team" },
    { label: "Research",     href: "#research" },
    { label: "Publications", href: "#publications" },
    { label: "Gallery",      href: "#gallery" }
  ],
  navButton: { label: "Book a consultation", href: "#contact" },

  /* ---------- Hero (top of the page) ---------- */
  hero: {
    eyebrow: "Biosensors · Diagnostics · Software",
    title: "Accessible biosensors for <em>infectious disease.</em>",
    text: "The research partnership of Dr A.M. Ogunmolasuyi and Dr Mary A. Adewoyin, building paper-based microfluidic and aptamer biosensors, and the software that reads them, to bring accurate testing closer to patients.",
    buttons: [
      { label: "Try our anaemia software", href: "#software", style: "primary" },
      { label: "Explore our research",     href: "#research", style: "outline" }
    ],
    facts: ["USAID–ARNTD funded", "University of Glasgow & Rhodes University collaboration", "Akure, Nigeria"],
    floatingTags: ["Anaemia simulation", "Colorimetric analysis", "Aptamer biosensors"],
    showFeaturedSoftware: true,   // true = small "Now live" card showing the FIRST software below
    motion: true                  // false = turn off the 3D DNA animation completely
  },

  /* ---------- Scrolling strip under the hero ---------- */
  strip: ["Anaemia simulation", "Colorimetric analysis", "Paper microfluidics", "Aptamer biosensors", "Electrochemical sensing", "Point-of-care diagnostics", "PCR · LAMP · RPA", "Genomic surveillance", "Malaria", "Schistosomiasis"],

  /* ---------- SOFTWARE (first item appears first and is the featured one) ----------
     image  : screenshot of the app. The two .svg files are illustrations; replace them with real
              screenshots (JPG/PNG/WebP, about 16:10) and change the path here.
     repo   : your GitHub link. Leave "" to hide the "View code" button.
     To add software: copy a whole { ... }, block, paste it after the last one and edit.         */
  software: {
    eyebrow: "Our software",
    title: "Tools that turn a photo into <em>a measurement.</em>",
    lead: "Free-to-try web apps from our lab. Open them in any browser, no installation needed.",
    items: [
      {
        name: "μFluidic Lab Analyser Pro",
        kicker: "Anaemia simulation & blood analysis",
        badge: "Featured · Live",
        tagline: "Blood analysis and anaemia recovery simulation from a photo of your test strip.",
        description: "A browser-based lab tool that turns photographs of microfluidic paper devices and blood-separation strips into quantitative results, and simulates how haemoglobin recovers with diet and supplementation.",
        features: [
          "Blood analysis of red cell, plasma and buffy-coat layers, with haematocrit and haemoglobin estimates graded from severe to normal",
          "Haemoglobin recovery simulation by patient group, dietary iron, vitamin C and inhibitors, with WHO and NIH reference values",
          "Colorimetric assays for iron, glucose and Bradford protein, with calibration curves",
          "Export CSV, JSON, PDF reports and PNG charts. Works offline after first load"
        ],
        audience: "Laboratory researchers, field health workers screening for anaemia, and nutrition planners.",
        tags: ["Anaemia", "Haematocrit", "Haemoglobin", "µPAD", "Works offline"],
        url: "https://anaemia-simulation.vercel.app/",
        repo: "",                                   // e.g. "https://github.com/your-name/anaemia-simulation"
        buttonLabel: "Launch the app",
        image: "assets/images/software/anaemia.svg",
        imageAlt: "Preview of the μFluidic Lab Analyser Pro simulation screen"
      },
      {
        name: "ColoriSense Pro",
        kicker: "Colorimetric analysis platform",
        badge: "Live",
        tagline: "Image-based biosensor quantification using advanced regression models.",
        description: "Measures colour in biosensor and µPAD photographs and converts the readings into concentration estimates using calibration curves.",
        features: [
          "Draw rectangular or circular regions of interest and label them Sample, Blank or Standard",
          "Four analysis modes: sample vs sample, vs blank (Beer–Lambert absorbance), full quantitative, and vs standard",
          "Linear, logistic and Michaelis–Menten calibration models",
          "RGB, HSV and CIELAB charts, pixel histograms, and PNG and CSV export"
        ],
        audience: "Researchers and students in biotechnology, biosensing and diagnostics labs.",
        note: "Free trial of 10 analyses. Unlock the full version with a licence key.",
        tags: ["Colorimetry", "Calibration", "Regression", "µPAD"],
        url: "https://colorisense.vercel.app/",
        repo: "",
        buttonLabel: "Launch the app",
        image: "assets/images/software/colorisense.svg",
        imageAlt: "Preview of the ColoriSense Pro analysis screen"
      }
    ]
  },

  /* ---------- ABOUT ---------- */
  about: {
    eyebrow: "About M-Quadruple Biotek Ltd",
    title: "Research that turns into <em>tests people can use.</em>",
    paragraphs: [
      "M-Quadruple Biotek Ltd is a biotechnology company in Akure, Nigeria, focused on biosensor technology, diagnostic software and genomic surveillance for infectious diseases.",
      "Our work grew out of doctoral and postdoctoral research in medical diagnostics: from a paper-based malaria test developed at Rhodes University to an international consortium with the University of Glasgow and collaborators across Nigeria."
    ],
    mission: "Advance global healthcare through groundbreaking research in biosensing technology and diagnostic solutions.",
    missionLabel: "Our mission",
    stats: [
      { value: "$29,689",         label: "USAID grant through the African Research Network for Neglected Tropical Diseases, 2020" },
      { value: "Glasgow · Rhodes", label: "International consortium with collaborators in Nigeria" },
      { value: "5 papers",        label: "Peer-reviewed sensor and infectious-disease research, 2022–2026" }
    ],
    // icons: flask, dna, chip, nodes, plus, drop, chart, tool, users, book
    services: [
      { icon: "chip",  title: "Design & Manufacture", text: "Design and manufacture of point-of-care diagnostic devices, built around low-cost, low-power paper-based platforms." },
      { icon: "nodes", title: "Aptamer Research",     text: "Aptamer research services, including SELEX-based work for therapeutic and diagnostic applications." },
      { icon: "users", title: "Training",             text: "Workshops and professional training in fabricating colorimetric, electrochemical and molecular biosensors." },
      { icon: "tool",  title: "Laboratory Equipment", text: "Research merchandise and lab equipment: thermocyclers, spectrophotometers and complete laboratory set-ups." }
    ]
  },

  /* ---------- TEAM ---------- */
  team: {
    eyebrow: "Our team",
    title: "The scientists <em>behind the work.</em>",
    people: [
      {
        name: "Dr A.M. Ogunmolasuyi",
        role: "Founder & CEO · PhD",
        photo: "assets/images/profile-ogunmolasuyi.jpg",
        photoAlt: "Portrait of Dr A.M. Ogunmolasuyi speaking at a meeting",
        photoPosition: "58% 30%",       // which part of the photo stays in view: "left% top%"
        bio: "An emerging African researcher with global ambitions in medical diagnostics, specialising in microfluidics and biosensing. During his PhD at the Biotechnology Innovation Centre, Rhodes University, he built a microfluidic paper analytical device (µPAD) to detect <em>Plasmodium falciparum</em> lactate dehydrogenase, using electrochemical methods including impedance spectroscopy, cyclic voltammetry and chronoamperometry. He received a USAID grant through ARNTD for low-cost schistosomiasis diagnostics.",
        tags: ["Microfluidics", "Electrochemical biosensors", "Aptamers", "Malaria & schistosomiasis"],
        links: [
          { label: "LinkedIn",       href: "https://www.linkedin.com/in/adewoyin-ogunmolasuyi-phd-7495b8127" },
          { label: "Google Scholar", href: "https://scholar.google.com/citations?user=0CtIxzgAAAAJ&hl=en" }
        ]
      },
      {
        name: "Dr Mary A. Adewoyin",
        role: "Researcher",
        photo: "assets/images/profile-adewoyin.jpg",
        photoAlt: "Portrait of Dr Mary A. Adewoyin",
        photoPosition: "50% 20%",
        bio: "Dr Mary Ayobami Adewoyin works across molecular microbiology and diagnostics. She is first author of the molecular characterisation of clinically relevant <em>Acinetobacter</em> species from freshwater sources in South Africa's Eastern Cape, and co-authored the multiplexed, aptamer-based microfluidic detection of malaria biomarkers.",
        tags: ["Pathogen analysis", "Molecular characterisation", "Malaria diagnostics"],
        links: [
          { label: "Her publications", href: "#publications" },
          { label: "Get in touch",     href: "#contact" }
        ]
      }
    ]
  },

  /* ---------- RESEARCH AREAS ---------- */
  research: {
    eyebrow: "Research areas",
    title: "From the bench to <em>the bedside.</em>",
    lead: "Five connected areas, one goal: reliable diagnostics that are low-cost, low-power and simple enough to use where they are needed most.",
    items: [
      { icon: "flask", title: "Biosensor Training",      text: "Hands-on fabrication of colorimetric, electrochemical and molecular biosensors." },
      { icon: "dna",   title: "Pathogen Analysis",       text: "Molecular and microbiology analysis of pathogens using PCR, LAMP and RPA." },
      { icon: "chip",  title: "Microfluidic Diagnostics", text: "Point-of-care microfluidic devices for infectious diseases, including paper analytical devices (µPADs)." },
      { icon: "nodes", title: "Aptamer Research",        text: "SELEX-based discovery of aptamers for therapeutic and diagnostic uses." },
      { icon: "plus",  title: "Diagnostic Solutions",    text: "Technical assistance and technology for diagnostics companies." }
    ]
  },

  /* ---------- JOURNEY / TIMELINE ---------- */
  journey: {
    eyebrow: "Journey",
    title: "Nearly a decade of <em>steady progress.</em>",
    items: [
      { year: "2017–2020", title: "Doctoral research at Rhodes University", text: "PhD at the Biotechnology Innovation Centre in the BioSens Research Group, funded by a TETFund scholarship and UNICEF. The work produced a paper-based aptasensor for malaria." },
      { year: "2020", title: "USAID grant for schistosomiasis diagnostics", text: "$29,689 through ARNTD to develop low-cost, low-power paper-based point-of-care tests." },
      { year: "2022", title: "Capture-aptamer µPAD published", text: "A paper device detecting <em>Pf</em>LDH in blood matrices, published in <em>Malaria Journal</em>." },
      { year: "2024", title: "Multiplexing and pathogen surveillance", text: "A microfluidic platform for multiplexed aptamer-based detection of malaria biomarkers, and a molecular study of <em>Acinetobacter</em> in freshwater." },
      { year: "2026", title: "Smartphone readout and bacterial detection", text: "Laser-printed µPADs for blood separation with hematocrit estimation, and gold-nanoparticle detection of pathogenic bacteria." }
    ]
  },

  /* ---------- PUBLICATIONS ----------
     tags: the filter buttons are made automatically from the tags you use (lowercase words). */
  publications: {
    eyebrow: "Publications",
    title: "Selected work on <em>sensors and infectious disease.</em>",
    scholarLabel: "Full list on Google Scholar",
    scholarUrl: "https://scholar.google.com/citations?user=0CtIxzgAAAAJ&hl=en",
    items: [
      { year: "2026", title: "Rapid colorimetric detection of pathogenic bacteria by antibiotic-conjugated gold nanoparticles in a laser-printed µPAD",
        authors: "<b>Adewoyin M. Ogunmolasuyi</b>, Kehinde J. Irhodia, Ayomide J. Olajide, Boluwatife E. Omoniyi, Victoria A. Ogunjobi, Olajide A. Ologunwa",
        journal: "Analytical Methods, 18(26), 5503–5512", tags: ["sensors", "bacteria"], url: "https://doi.org/10.1039/d6ay00167j", linkLabel: "View paper" },
      { year: "2026", title: "Laser-printed microfluidic paper analytical device for rapid separation of whole blood and hematocrit estimation by smartphone readout",
        authors: "<b>Adewoyin M. Ogunmolasuyi</b>, Christabel-Glory D. Oloyede, Esther U. Archibong, Jonathan K. Irhodia, Paul I. Ige",
        journal: "Bioanalysis, 18(8–9), 701–709", tags: ["sensors"], url: "https://doi.org/10.1080/17576180.2026.2692463", linkLabel: "View paper" },
      { year: "2024", title: "Microfluidic device: a versatile biosensor platform to multiplex aptamer-based detection of malaria biomarkers",
        authors: "<b>Adewoyin M. Ogunmolasuyi</b>, <b>Mary A. Adewoyin</b>",
        journal: "Cell Biochemistry and Function, 42(6)", tags: ["sensors", "malaria"], url: "https://doi.org/10.1002/cbf.4104", linkLabel: "View paper" },
      { year: "2024", title: "Distribution and molecular characterization of clinically relevant <em>Acinetobacter</em> species from selected freshwater sources in the Eastern Cape Province, South Africa",
        authors: "<b>Mary Ayobami Adewoyin</b>, <b>Adewoyin Martin Ogunmolasuyi</b>, Anthony Ifeanyi Okoh",
        journal: "Bacteria, 3(3), 160–170", tags: ["bacteria"], url: "https://doi.org/10.3390/bacteria3030011", linkLabel: "View paper" },
      { year: "2022", title: "A microfluidic paper analytical device using capture aptamers for the detection of <em>Pf</em>LDH in blood matrices",
        authors: "<b>Adewoyin Martin Ogunmolasuyi</b>, Ronen Fogel, Heinrich Hoppe, Dean Goldring, Janice Limson",
        journal: "Malaria Journal, 21, 174", tags: ["sensors", "malaria"], url: "https://doi.org/10.1186/s12936-022-04187-6", linkLabel: "View paper" },
      { year: "PhD", title: "Development of paper-based aptasensors for detection of <em>Plasmodium falciparum</em> lactate dehydrogenase in malaria",
        authors: "<b>Adewoyin Martin Ogunmolasuyi</b>",
        journal: "Doctoral thesis, Rhodes University", tags: ["sensors", "malaria"], url: "https://doi.org/10.21504/10962/164601", linkLabel: "View thesis" }
    ]
  },

  /* ---------- CURRENT WORK ---------- */
  work: {
    eyebrow: "Current work",
    title: "What we are <em>building now.</em>",
    image: "assets/images/research-presentation.jpg",
    imageAlt: "Presenting a talk on microfluidic separation of chlorophyll and detection of iron in vegetables",
    caption: "Presenting ongoing work on microfluidic separation and colorimetric detection.",
    items: [
      { status: "Ongoing", title: "Multiplexed malaria and schistosomiasis detection", text: "One paper-based system that detects both infections at once, for patients with co-infection." },
      { status: "Ongoing", title: "Advanced Biosensor Platform", text: "Rapid disease detection and monitoring with real-time detection, mobile-device integration and AI-powered analysis." },
      { status: "Ongoing", title: "Chlorophyll separation and iron detection in vegetables", text: "Microfluidic separation of chlorophyll to enable colorimetric detection of iron in selected vegetables." }
    ]
  },

  /* ---------- GALLERY ----------
     size: "wide" (2 across), "tall" (2 down) or "" (normal). Keep a mix for a tidy grid.
     More photos waiting in assets/images/spare/ if you want them. */
  gallery: {
    eyebrow: "Gallery",
    title: "Inside the <em>laboratory.</em>",
    items: [
      { src: "assets/images/gallery-training.jpg",     caption: "Hands-on biosensor training",          alt: "Researchers practising pipetting in a training session", size: "wide" },
      { src: "assets/images/gallery-sample-prep.jpg",  caption: "Sample preparation",                   alt: "Grinding a sample with a mortar and pestle", size: "tall" },
      { src: "assets/images/gallery-strips.jpg",       caption: "Five-channel µPAD test strips",        alt: "Numbered paper microfluidic test strips in a foam-lined box", size: "tall" },
      { src: "assets/images/gallery-prototypes.jpg",   caption: "µPAD prototypes under test",           alt: "Paper microfluidic prototypes taped to a foam block", size: "" },
      { src: "assets/images/gallery-reader.jpg",       caption: "Sample loading on a portable analyser", alt: "Loading a sample onto a portable analyser", size: "" },
      { src: "assets/images/gallery-assay-tubes.jpg",  caption: "Colorimetric assay tubes",             alt: "Four labelled tubes with pink colorimetric assay results", size: "wide", position: "50% 18%" },
      { src: "assets/images/gallery-blood-strips.jpg", caption: "Whole-blood samples on paper strips",  alt: "Three paper microfluidic strips carrying blood samples", size: "" },
      { src: "assets/images/gallery-pipette.jpg",      caption: "Loading a sample",                     alt: "A researcher loading a sample with a pipette", size: "", position: "50% 30%" }
    ]
  },

  /* ---------- CONTACT ---------- */
  contact: {
    eyebrow: "Contact",
    title: "Let's build accessible <em>diagnostics together.</em>",
    lead: "Book a consultation, ask about training, equipment or our software, or discuss a research collaboration.",
    email: "mquadruplebiotek@gmail.com",
    phone: "",                                   // add one number when confirmed, e.g. "+234 803 000 0000"
    address: "Academic Building, Ipinsa, Akure,<br>Ondo State, Nigeria",
    links: [
      { label: "LinkedIn",       href: "https://www.linkedin.com/in/adewoyin-ogunmolasuyi-phd-7495b8127" },
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=0CtIxzgAAAAJ&hl=en" }
    ],
    topics: ["Book a consultation", "Software question", "Training enquiry", "Research collaboration", "Laboratory equipment", "Other"],
    formEndpoint: ""      // optional: paste a Formspree address (https://formspree.io/f/xxxx) to send without the visitor's email app
  },

  /* ---------- Footer ---------- */
  footer: {
    links: [
      { label: "Software", href: "#software" }, { label: "About", href: "#about" }, { label: "Our team", href: "#team" },
      { label: "Research", href: "#research" }, { label: "Publications", href: "#publications" }, { label: "Contact", href: "#contact" }
    ]
  }
};
