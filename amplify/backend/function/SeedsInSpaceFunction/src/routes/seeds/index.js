const router = require("express").Router();
const controller = require("../../controllers/seeds");

router.route("/").get(controller.getAllSeeds).post(controller.addSeed);
router.route("/:Pk").get(controller.getUsersSeeds);
router.route("/:Pk/filter").get(controller.getSeedsByFilter);
router
  .route("/:Pk/:Sk")
  .get(controller.getSeed)
  .put(controller.updateSeed)
  .delete(controller.deleteSeed);
router
  .route("/type/:Type/filter")
  .get(controller.getSeedsByTypeAndSortKey);

module.exports = router;
