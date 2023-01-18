const express = require("express");
const router = express.Router();
const EventController = require("../controllers/EventController");
const { authentication } = require("../middlewares/authentication");
const upload = require("../middlewares/upload");

router.post("/createEvent",upload.single("imageEvent"),authentication, EventController.createEvent);
router.delete("/deleteEventById/:_id",authentication, EventController.deleteEventById );
router.get("/getAllEvents",authentication, EventController.getAllEvents);
router.put("/updateEventById/:_id",authentication,EventController.updateEventById);


module.exports = router;
