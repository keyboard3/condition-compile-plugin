if (process.env.RUN_ENV == "development") {
  require("./a.js");
} else {
  require("./b.js");
}