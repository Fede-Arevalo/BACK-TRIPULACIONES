const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication, isAdmin } = require("../middlewares/authentication");
const upload = require("../middlewares/upload");

router.post("/register", upload.single("imageUser"), UserController.register);
router.post("/login", UserController.login);
router.get("/getUserById/:_id", UserController.getUserById);
router.get("/getUserByName/:name", UserController.getUserByName);
router.get("/getAllUsers", UserController.getAllUsers);
router.get('/confirm/:emailToken',UserController.confirm)
router.put(
  "/updateUserById/:_id",
  authentication,
  upload.single("imageUser"),
  UserController.updateUserById
);

router.delete("/deleteUserById/:_id", authentication, UserController.deleteUserById);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
