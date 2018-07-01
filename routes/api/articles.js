const router = require("express").Router();
const controller = require("../../controllers/controller");

router
  .route("/api/articles")
  .get(controller.findSaved)
  .post(controller.save)
  .delete(controller.remove);

  router
  .route("/*")
  .get(controller.navigate);

module.exports = router;
