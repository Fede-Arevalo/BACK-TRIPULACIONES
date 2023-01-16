const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      type: String,
    },
    title: {
      type: String,
      required: [true, "Por favor rellena el título del post"],
    },
    body: {
      type: String,
      required: [true, "Por favor rellena el cuerpo del post"],
    },
    commentIds: [{ type: ObjectId, ref: "Comment" }],
    likes_post: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

PostSchema.index({
  title: "text",
});

PostSchema.methods.toJSON = function () {
  const post = this._doc;
  delete post.createdAt;
  delete post.updatedAt;
  delete post.__v;
  return post;
};

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
