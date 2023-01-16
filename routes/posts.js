const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { authentication, isPostAuthor, isAdmin } = require("../middlewares/authentication");
const upload = require("../middlewares/upload");

router.post(
  "/createPost",
  authentication,
  upload.single("image"),
  PostController.createPost
);
router.get("/getAllPosts", PostController.getAllPosts);
router.get("/getPostById/:_id", PostController.getPostById);
router.get("/getPostByName/:title", PostController.getPostByName);
router.put(
  "/updatePostById/:_id",
  authentication,
  isPostAuthor,
  upload.single("image"),
  PostController.updatePostById
);
router.delete(
  "/deletePostById/:_id",
  authentication,
  isPostAuthor,
  PostController.deletePostById
);

router.delete(
  "/deletePostAdmin/:_id",
  authentication,
  isAdmin,
  PostController.deletePostById
);

router.put("/like/:_id", authentication, PostController.like);
router.put("/disLike/:_id", authentication, PostController.disLike);

module.exports = router;
