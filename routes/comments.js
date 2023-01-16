const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const { authentication, isCommentAuthor } = require("../middlewares/authentication");
const upload = require("../middlewares/upload");

router.post(
  "/createComment/:_id",
  authentication,
  upload.single("image"),
  CommentController.createComment
);
router.get("/getAllComments", CommentController.getAllComments);
router.get("/getCommentById/:_id", CommentController.getCommentById);
router.put(
  "/updateCommentById/:_id",
  authentication,
  isCommentAuthor,
  upload.single("image"),
  CommentController.updateCommentById
);
router.delete(
  "/deleteCommentById/:_id",
  authentication,
  isCommentAuthor,
  CommentController.deleteCommentById
);
router.put("/like/:_id", authentication, CommentController.like);
router.put("/disLike/:_id", authentication, CommentController.disLike);

module.exports = router;
