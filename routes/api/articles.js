const router = require("express").Router();
const controller = require("../../controllers/controller");

router
  .route("/")
  .get(controller.findSaved)
  .post(controller.save)
  .delete(controller.remove);

  router
  .route("/:id")
  .delete(controller.remove);

  router
  .route("*")
  .get(controller.navigate);

module.exports = router;
