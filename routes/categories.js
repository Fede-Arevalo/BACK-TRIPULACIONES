const express = require("express");
const router = express.Router();
const CategoryIncidentController = require("../controllers/CategoryIncidentController");
const { authentication } = require("../middlewares/authentication");

router.post("/createCategory",authentication, CategoryIncidentController.createCategory);
router.get("/getAllCategory", CategoryIncidentController.getAllCategory);

module.exports = router;
