/* =====================================================================
   SITE SETTINGS: menu, phone, WhatsApp, email, social links, footer.
   Change a value here and it updates on EVERY page.
   ===================================================================== */
window.SITE = {
  brand: {
    name: "M-Quadruple",
    suffix: "Biotek Ltd",
    logo: "assets/logo.png",           // replace the file, or point to another image
    tagline: "Advancing diagnostics with accessible biosensor technology."
  },

  contact: {
    email: "mquadruplebiotek@gmail.com",
    phone: "+234 803 927 2785",        // shown on the site
    whatsapp: "2348039272785",         // digits only, with country code, no + sign
    whatsappText: "Hello M-Quadruple Biotek, I would like to make an enquiry.",
    address: "Academic Building, Ipinsa, Akure,<br>Ondo State, Nigeria",
    // Optional: paste a Formspree address (https://formspree.io/f/xxxx) so the form sends without an email app
    formEndpoint: ""
  },

  /* Social icons. icon can be: wa, in, x, sch (Google Scholar), mail, tel, gh (GitHub)
     Leave out "href" for wa / mail / tel: they are built from the contact details above.
     To remove an icon, delete its line. To add GitHub, add:  { icon: "gh", label: "GitHub", href: "https://github.com/yourname" }  */
  social: [
    { icon: "wa",   label: "WhatsApp" },
    { icon: "in",   label: "LinkedIn",       href: "https://www.linkedin.com/in/adewoyin-ogunmolasuyi-phd-7495b8127" },
    { icon: "x",    label: "X (Twitter)",    href: "https://twitter.com/mquadruple" },
    { icon: "sch",  label: "Google Scholar", href: "https://scholar.google.com/citations?user=0CtIxzgAAAAJ&hl=en" },
    { icon: "mail", label: "Email" },
    { icon: "tel",  label: "Call" }
  ],

  /* Top menu. Each item opens its own page. */
  nav: [
    { label: "About",        href: "about.html" },
    { label: "Software",     href: "software.html" },
    { label: "Team",         href: "team.html" },
    { label: "Publications", href: "publications.html" },
    { label: "Gallery",      href: "gallery.html" }
  ],
  navButton: { label: "Book a consultation", href: "index.html#contact" },

  /* Footer links */
  footerLinks: [
    { label: "Home", href: "index.html" }, { label: "About", href: "about.html" }, { label: "Software", href: "software.html" },
    { label: "Team", href: "team.html" }, { label: "Publications", href: "publications.html" },
    { label: "Gallery", href: "gallery.html" }, { label: "Contact", href: "index.html#contact" }
  ]
};
