const express = require("express");
const router = express.Router();
const IncidentController = require("../controllers/IncidentController");
const { authentication, isAdmin } = require("../middlewares/authentication");
const upload = require("../middlewares/upload");

router.post("/createIncident",upload.single("imageIncident"),authentication, IncidentController.createIncident);
router.delete("/deleteIncidentById/:_id",authentication, isAdmin, IncidentController.deleteIncidentById );
router.get("/getAllIncidents",authentication, IncidentController.getAllIncidents);
router.put("/updateIncidentById/:_id",authentication, isAdmin, IncidentController.updateIncidentById);
router.put("/sendIncidents/:_id", authentication, IncidentController.sendIncidents);
router.put("/pendingIncidents/:_id", authentication, IncidentController.pendingIncidents);
router.get("/getIncidentsXCategory",authentication, IncidentController.getIncidentsXCategory);

module.exports = router;
