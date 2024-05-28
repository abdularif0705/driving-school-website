module.exports = {
  content: [
    "index.html",
    "about.html",
    "contact.html",
    "driving-test-routes.html",
    "contact.html",
    "faq.html",
    "404.html",
  ], // Add all your HTML files here
  css: ["css/styles.css", "css/bootstrap.min.css"], // Add all your CSS files here
  output: "css/purged/", // Output directory for purged CSS files
  safelist: {
    standard: ["html", "body", "btn"],
    deep: [/^col/, /^navbar/, /^nav/, /^modal/, /^dropdown-menu/],
  }, // Add classes that you want to be excluded from purging
};
