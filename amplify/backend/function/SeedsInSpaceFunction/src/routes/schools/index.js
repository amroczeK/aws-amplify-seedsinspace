const router = require("express").Router();
const controller = require("../../controllers/schools");

router.route("/").get(controller.getAllSchools).post(controller.addSchool);
router.route("/:Sk").put(controller.updateSchool);

module.exports = router;
