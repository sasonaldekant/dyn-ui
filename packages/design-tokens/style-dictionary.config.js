module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [{ destination: "tokens.css", format: "css/variables" }]
    },
    scss: {
      transformGroup: "scss",
      buildPath: "build/scss/",
      files: [{ destination: "_tokens.scss", format: "scss/variables" }]
    },
    js: {
      transformGroup: "js",
      buildPath: "build/js/",
      files: [{ destination: "tokens.js", format: "javascript/es6" }]
    }
  }
};