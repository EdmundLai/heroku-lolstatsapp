const express = require("express");
const ControllerModule = require("../controllers/lolAPIcontroller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello from API!");
});

function setGetRoutes() {
  if (this.controller === undefined) {
    this.controller = new ControllerModule();
  }

  router.get("/stats", (req, res) => {
    return this.controller.getStats(req, res);
  });

  router.get("/getSummData", (req, res) => {
    return this.controller.getSummonerData(req, res);
  });
}

setGetRoutes();

module.exports = router;
