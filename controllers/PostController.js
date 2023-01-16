const Post = require("../models/Post");
const User = require("../models/User");

const PostController = {
  async createPost(req, res, next) {
    try {
      const post = await Post.create({
        ...req.body,
        userId: req.user._id,
        image: req.file?.filename,
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { postIds: post._id },
      });
      res.status(201).send(post);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  async getAllPosts(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const posts = await Post.find()
        .populate("commentIds")
        .populate("userId")
        .limit(limit)
        .skip((page - 1) * limit);
      res.send(posts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema al traer los posts", error });
    }
  },

  async getPostById(req, res) {
    try {
      const post = await Post.findById(req.params._id)
        .populate("userId")
        .populate({
          path: "commentIds",
          populate: {
            path: "userId",
          },
        });

      res.send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema al traernos el post", error });
    }
  },

  async getPostByName(req, res) {
    try {
      const post = await Post.find({
        $text: {
          $search: req.params.title,
        },
      });
      res.send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema al traernos el post", error });
    }
  },

  async updatePostById(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { ...req.body, userId: req.user._id, image: req.file?.filename },
        {
          new: true,
        }
      ).populate("userId");
      res.send({ msg: "Post actualizado con éxito!", post });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema al actualizar el post", error });
    }
  },

  async deletePostById(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);
      res.send({ msg: "Post eliminado", post });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema al eliminar el post" });
    }
  },

  async like(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { $push: { likes_post: req.user._id } },
        { new: true }
      ).populate("userId");
      res.send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema con tu like en el post" });
    }
  },

  async disLike(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { $pull: { likes_post: req.user._id } },
        { new: true }
      ).populate("userId");
      res.send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema con tu disLike en el post" });
    }
  },
};
module.exports = PostController;
