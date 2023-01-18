const express = require("express");
const router = express.Router();
const IncidentController = require("../controllers/IncidentController");
const { authentication } = require("../middlewares/authentication");
const upload = require("../middlewares/upload");

router.post("/createIncident",upload.single("imageIncident"),authentication, IncidentController.createIncident);
router.delete("/deleteIncidentById/:_id",authentication, IncidentController.deleteIncidentById );
router.get("/getAllIncidents",authentication, IncidentController.getAllIncidents);
router.put("/updateIncidentById/:_id",authentication,IncidentController.updateIncidentById);

module.exports = router;
