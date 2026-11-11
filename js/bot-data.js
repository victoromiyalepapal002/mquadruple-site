/* =====================================================================
   ASSISTANT KNOWLEDGE. This is everything the chat assistant knows.
   It only answers from what is written here, so it never makes things up.

   To CHANGE an answer: edit the "a" text of that topic.
   To ADD a topic: copy one { ... }, block, give it a new id, then write
       k:   words people might use (lower case, a few per topic; phrases are fine)
       a:   the answer (you can use <b>bold</b> and <br>)
       go:  buttons shown under the answer. { t: "label", h: "page or link" }
       next: ids of topics offered as quick follow-up buttons
       q:   (optional) a short question; topics with q appear as the starting buttons
   To REMOVE a topic: delete its whole { ... }, block.
   Contact details (phone, email, WhatsApp) come from js/site.js automatically.
   ===================================================================== */
window.BOT = {
  name: "M-Quadruple Assistant",
  status: "Replies instantly",
  hello: "Hello, and welcome to M-Quadruple Biotek. Ask me anything about our software, training, research or how to reach us, or tap a question below.",
  teaser: "Questions about our software or training? Ask us here.",
  fallback: "I'm not sure I have the answer to that one, but our team will. Send your question on WhatsApp and we will reply, or try one of these:",
  placeholder: "Type your question...",
  topics: [
    { id: "greet", k: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "howdy", "greetings"],
      a: "Hello! How can I help you today?", next: ["software", "training", "contact", "about"] },

    { id: "thanks", k: ["thanks", "thank you", "thank", "great", "okay thanks", "cheers", "appreciate"],
      a: "You're welcome! If there is anything else, just ask. You can also reach the team directly on WhatsApp.", next: ["contact", "software"] },

    { id: "about", q: "What does M-Quadruple do?", k: ["about us", "who are you", "what do you do", "what does your company do", "company", "mquadruple", "m-quadruple", "biotek", "mission", "your work"],
      a: "<b>M-Quadruple Biotek Ltd</b> is a biotechnology company in Akure, Nigeria. We build accessible <b>biosensors</b>, diagnostic <b>software</b> and <b>genomic surveillance</b> for infectious diseases, with low-cost, low-power paper-based tests at the centre of our work.",
      go: [{ t: "About us", h: "about.html" }], next: ["services", "founders", "publications"] },

    { id: "services", q: "What services do you offer?", k: ["service", "offer", "provide", "products", "do you sell", "what can you", "design", "manufacture", "diagnostic devices", "solutions"],
      a: "We offer four main things:<br>• <b>Design and manufacture</b> of point-of-care diagnostic devices<br>• <b>Aptamer research</b> services, including SELEX-based work<br>• <b>Training</b> and workshops in building biosensors<br>• <b>Laboratory equipment</b> such as thermocyclers and spectrophotometers<br>We also build free-to-try <b>software</b>.",
      go: [{ t: "See our work", h: "about.html" }], next: ["training", "equipment", "software"] },

    { id: "software", q: "Tell me about your software", k: ["software", "app", "apps", "application", "tool", "tools", "program", "website tool", "analyser", "analyzer", "web app", "use online"],
      a: "We have two live web apps, free to try and nothing to install:<br>• <b>µFluidic Lab Analyser Pro</b> for anaemia and blood analysis<br>• <b>ColoriSense Pro</b> for colour-based biosensor measurement<br>Both turn a photo of your test strip into numbers.",
      go: [{ t: "Open software page", h: "software.html" }], next: ["anaemia", "colorisense", "price"] },

    { id: "anaemia", q: "How does the anaemia software work?", k: ["anaemia", "anemia", "haemoglobin", "hemoglobin", "haematocrit", "hematocrit", "blood", "iron", "red cell", "ufluidic", "µfluidic", "fluidic lab", "lab analyser", "recovery", "simulation"],
      a: "<b>µFluidic Lab Analyser Pro</b> reads a photo of a microfluidic paper device or blood-separation strip. It measures red cell, plasma and buffy-coat layers and estimates haematocrit and haemoglobin. It can also simulate how haemoglobin recovers with diet and supplements, and run colorimetric assays for iron, glucose and protein. Results export as CSV, JSON, PDF or PNG, and it <b>works offline</b> after the first load.",
      go: [{ t: "Launch the app", h: "https://anaemia-simulation.vercel.app/" }, { t: "Read more", h: "software.html#anaemia" }], next: ["price", "offline", "colorisense"] },

    { id: "colorisense", q: "What is ColoriSense Pro?", k: ["colorisense", "colori", "colour", "color", "colorimetric", "colorimetry", "calibration", "regression", "beer-lambert", "rgb", "image analysis", "concentration"],
      a: "<b>ColoriSense Pro</b> measures colour in biosensor and µPAD photographs and converts it to concentration estimates using calibration curves. You draw regions on your image, label them Sample, Blank or Standard, and choose from four analysis modes and three calibration models. It also gives RGB, HSV and CIELAB charts, with PNG and CSV export.",
      go: [{ t: "Launch the app", h: "https://colorisense.vercel.app/" }, { t: "Read more", h: "software.html#colorisense" }], next: ["price", "anaemia"] },

    { id: "price", q: "Is the software free?", k: ["free", "price", "cost", "how much", "licence", "license", "pay", "trial", "subscription", "charge", "fee", "buy software", "paid"],
      a: "Both apps are <b>free to try</b>. ColoriSense Pro gives you a free trial of <b>10 analyses</b>, and you can unlock the full version with a licence key. For licence details, message the team on WhatsApp.",
      next: ["contact", "software"] },

    { id: "offline", q: "Does it work offline?", k: ["offline", "no internet", "install", "download", "without internet", "browser", "phone", "mobile", "device", "work on"],
      a: "Nothing needs to be installed. Both apps open in any browser on a phone or computer. The anaemia app also <b>works offline</b> after you have opened it once.",
      next: ["software", "anaemia"] },

    { id: "training", q: "Do you offer training?", k: ["training", "train", "workshop", "learn", "course", "teach", "hands-on", "hands on", "fabricate", "fabrication", "class", "seminar"],
      a: "Yes. We run <b>workshops and professional training</b> in fabricating colorimetric, electrochemical and molecular biosensors, with hands-on practice. To ask about dates or to book a session, message us on WhatsApp.",
      go: [{ t: "See training photos", h: "gallery.html#training" }], next: ["consult", "contact"] },

    { id: "equipment", q: "Do you supply lab equipment?", k: ["equipment", "thermocycler", "thermal cycler", "spectrophotometer", "merchandise", "lab set", "laboratory set", "buy equipment", "supply", "instrument", "machine"],
      a: "Yes. We supply <b>research merchandise and laboratory equipment</b>, including thermocyclers, spectrophotometers and complete laboratory set-ups. Tell us what you need on WhatsApp and the team will respond.",
      next: ["contact", "services"] },

    { id: "consult", q: "How do I book a consultation?", k: ["book", "consultation", "appointment", "meeting", "schedule", "collaborate", "collaboration", "partnership", "partner", "work with", "hire", "request", "quote"],
      a: "You can book a consultation or discuss a collaboration by messaging us on WhatsApp, sending an email, or using the contact form on the home page. Tell us briefly what you need and the team will get back to you.",
      go: [{ t: "Contact form", h: "index.html#contact" }], next: ["contact", "services"] },

    { id: "contact", q: "How can I contact you?", k: ["contact", "get in touch", "touch", "phone", "call", "whatsapp", "email", "mail", "reach", "number", "message", "talk to", "speak", "human", "person", "support", "help"],
      a: "You can reach us here:<br>• <b>WhatsApp and phone:</b> {phone}<br>• <b>Email:</b> {email}<br>WhatsApp is the fastest way to get a reply.",
      go: [{ t: "Chat on WhatsApp", h: "{wa}" }, { t: "Send an email", h: "mailto:{email}" }], next: ["location", "consult"] },

    { id: "location", q: "Where are you located?", k: ["where are you", "where is", "location", "located", "address", "akure", "ondo", "nigeria", "visit", "office", "find you", "directions", "come to"],
      a: "We are in <b>Akure, Ondo State, Nigeria</b>. To arrange a visit, please message us on WhatsApp first so we can confirm a time.",
      go: [{ t: "Chat on WhatsApp", h: "{wa}" }], next: ["contact"] },

    { id: "hours", k: ["hours", "open", "opening", "when are you", "available", "closing", "time", "weekend"],
      a: "We don't publish fixed opening hours. The quickest way to get a reply is to message us on WhatsApp.",
      go: [{ t: "Chat on WhatsApp", h: "{wa}" }], next: ["contact"] },

    { id: "founders", q: "Who are the founders?", k: ["founder", "founders", "founded", "who made", "who runs", "who started", "co-founder", "cofounder", "ceo", "who started", "who owns", "who leads", "team", "people", "staff", "scientists", "management"],
      a: "M-Quadruple was co-founded by <b>Dr Adewoyin M. Ogunmolasuyi</b> (Co-founder and CEO) and <b>Dr Mary A. Adewoyin</b> (Co-founder). <b>Dr Kayode Omotayo Adeniyi</b> is our Manager, Microsystem Prototypes.",
      go: [{ t: "Meet the team", h: "team.html" }], next: ["ogun", "mary", "kayode"] },

    { id: "ogun", q: "About Dr Ogunmolasuyi", k: ["ogunmolasuyi", "adewoyin ogunmolasuyi", "martin", "dr a.m", "ceo", "chief executive"],
      a: "<b>Dr Adewoyin M. Ogunmolasuyi</b> is Co-founder and CEO. He did his PhD at Rhodes University, South Africa (2017 to 2020), building a paper-based device to detect the malaria marker <i>Pf</i>LDH, and received a USAID grant in 2020 for low-cost schistosomiasis tests. He leads our multiplexed malaria and schistosomiasis detection work.",
      go: [{ t: "Read his profile", h: "team.html#cofounder-1" }], next: ["publications", "malaria"] },

    { id: "mary", q: "About Dr Mary Adewoyin", k: ["mary", "adewoyin mary", "microbiologist", "dr mary", "anchor university", "fort hare"],
      a: "<b>Dr Mary A. Adewoyin</b> is Co-founder and a molecular microbiologist with expertise in antimicrobial resistance and microbial ecology. She earned her PhD in environmental microbiology at the University of Fort Hare, South Africa, and is a faculty member at Anchor University Lagos.",
      go: [{ t: "Read her profile", h: "team.html#cofounder-2" }], next: ["amr", "publications"] },

    { id: "kayode", q: "About Dr Adeniyi", k: ["kayode", "adeniyi", "omotayo", "manager", "prototype", "prototypes", "microsystem", "nanotechnologist", "electrochemist"],
      a: "<b>Dr Kayode Omotayo Adeniyi</b> is our Manager, Microsystem Prototypes. He is an inorganic chemist, electrochemist and nanotechnologist with a PhD from Rhodes University, and develops sensing platforms for cancer diagnostics, infectious disease detection and environmental monitoring.",
      go: [{ t: "Read his profile", h: "team.html#manager" }], next: ["founders"] },

    { id: "publications", q: "Where can I read your research?", k: ["publication", "publications", "research", "read your", "paper", "papers", "journal", "published", "scholar", "research papers", "citations", "article", "thesis"],
      a: "Our peer-reviewed papers are listed on the Publications page, with links to each one. They cover paper-based sensors, malaria biomarkers, bacterial detection and more.",
      go: [{ t: "View publications", h: "publications.html" }], next: ["malaria", "upad"] },

    { id: "malaria", q: "Malaria research", k: ["malaria", "plasmodium", "pfldh", "ldh", "falciparum"],
      a: "Malaria detection is a core part of our research. We have published a paper-based device using capture aptamers to detect the malaria marker <i>Pf</i>LDH in blood, and a platform for multiplexed aptamer-based detection of malaria biomarkers. Current work aims to detect malaria and schistosomiasis together on one paper-based system.",
      go: [{ t: "View publications", h: "publications.html" }], next: ["schisto", "upad"] },

    { id: "schisto", q: "Schistosomiasis work", k: ["schistosomiasis", "schisto", "bilharzia", "neglected", "ntd", "usaid", "arntd", "tropical"],
      a: "In 2020 we received a <b>$29,689 USAID grant</b> through the African Research Network for Neglected Tropical Diseases to develop low-cost, low-power paper-based point-of-care tests for schistosomiasis. We are now working on one system that detects both malaria and schistosomiasis.",
      next: ["malaria", "upad"] },

    { id: "amr", q: "Genomic surveillance", k: ["genomic", "surveillance", "resistant", "resistance", "antimicrobial", "amr", "bacteria", "pathogen", "pathogens", "acinetobacter", "pcr", "lamp", "rpa", "molecular", "drug resistant"],
      a: "We do <b>genomic surveillance of drug-resistant bacteria</b> and molecular and microbiology analysis of pathogens using PCR, LAMP and RPA. Our work includes studies of <i>Acinetobacter</i> and gold-nanoparticle detection of pathogenic bacteria on paper devices.",
      go: [{ t: "See molecular biology photos", h: "gallery.html#molecular" }], next: ["publications", "upad"] },

    { id: "upad", q: "What is a µPAD?", k: ["upad", "µpad", "mupad", "paper", "microfluidic", "microfluidics", "biosensor", "biosensors", "strip", "strips", "test strip", "point of care", "point-of-care", "how does it work", "sensor"],
      a: "A <b>µPAD</b> is a microfluidic paper analytical device: a small paper strip with printed channels that moves a drop of blood or other sample to test zones where colour changes show the result. It is low-cost, low-power and simple to use, which is why we build on paper-based platforms. You can read the result by eye or photograph it and analyse it in our apps.",
      go: [{ t: "Our research", h: "about.html#research" }], next: ["software", "malaria"] },

    { id: "aptamer", q: "What are aptamers?", k: ["aptamer", "aptamers", "selex", "aptasensor"],
      a: "Aptamers are short DNA or RNA molecules that bind a chosen target, like a malaria protein. We offer <b>aptamer research services</b>, including SELEX-based discovery for therapeutic and diagnostic uses, and use aptamers in our paper-based sensors.",
      next: ["services", "malaria"] },

    { id: "gallery", q: "Show me photos", k: ["photo", "photos", "picture", "pictures", "gallery", "video", "videos", "images", "see the lab"],
      a: "Our gallery has photos and a video from the laboratory, training sessions and conferences, grouped into Biosensor and diagnostics, Microbiology, Molecular biology, and Training and conferences.",
      go: [{ t: "Open the gallery", h: "gallery.html" }], next: ["training"] }
  ]
};
