const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema(
  {
    comment: String,
    image: { type: String },
    postId: { type: ObjectId, ref: "Post" },    
    userId: { type: ObjectId, ref: "User" },
    likes_comment: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

CommentSchema.methods.toJSON = function () {
  const comment = this._doc;
  delete comment.createdAt;
  delete comment.updatedAt;
  delete comment.__v;
  return comment;
};

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
