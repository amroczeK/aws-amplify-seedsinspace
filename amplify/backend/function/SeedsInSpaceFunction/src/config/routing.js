const SeedsRoutes = require("../routes/seeds");
const SchoolsRoutes = require("../routes/schools");

const setupRouting = app => {
  app.use("/seeds", SeedsRoutes);
  app.use("/schools", SchoolsRoutes);
};

module.exports = setupRouting;