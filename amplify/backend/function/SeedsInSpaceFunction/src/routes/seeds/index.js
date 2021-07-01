const router = require("express").Router();
const controller = require("../../controllers/seeds");

router.route("/").get(controller.getAllSeeds).post(controller.addSeed);
router.route("/:Pk").get(controller.getUsersSeeds).post(controller.getSeedsByFilter);
router
  .route("/:Pk/:Sk")
  .get(controller.getSeed)
  .put(controller.updateSeed)
  .delete(controller.deleteSeed);
router
  .route("/:Type")
  .get(controller.getAllSeedsByType)
  .post(controller.getAllSeedsByTypeAndSortKey);

module.exports = router;
