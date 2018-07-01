const router = require("express").Router();
const routes = require("./articles");

router.use("/articles", routes);

module.exports = router;
