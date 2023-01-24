const express = require("express");
const router = express.Router();
const IncidentController = require("../controllers/IncidentController");
const { authentication, isAdmin } = require("../middlewares/authentication");
const upload = require("../middlewares/upload");

router.post("/createIncident",upload.single("imageIncident"),authentication, IncidentController.createIncident);
router.delete("/deleteIncidentById/:_id",authentication, isAdmin, IncidentController.deleteIncidentById );
router.get("/getAllIncidents",authentication, IncidentController.getAllIncidents);
router.get("/getIncidentById/:_id",authentication, IncidentController.getIncidentById);
router.get("/getIncidentsXCategory",authentication, IncidentController.getIncidentsXCategory);
router.put("/updateIncidentById/:_id",authentication, isAdmin, IncidentController.updateIncidentById);
router.put("/sendIncidents/:_id", authentication, IncidentController.sendIncidents);
router.put("/pendingIncidents/:_id", authentication, IncidentController.pendingIncidents);
router.get("/getIncidentsXCategory/:category", IncidentController.getIncidentsXCategory);
router.get("/getAllIncidentsSent", IncidentController.getAllIncidentsSent);
router.get("/getAllIncidentsPending", IncidentController.getAllIncidentsPending);
router.get("/getIncidents7Days", IncidentController.getIncidents7Days);
router.get("/getIncidents14Days", IncidentController.getIncidents14Days);
router.get("/getIncidents24Days", IncidentController.getIncidents24Days);
router.get("/getIncidents60Days", IncidentController.getIncidents60Days);



module.exports = router;
