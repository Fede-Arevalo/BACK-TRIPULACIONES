const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    imageUser: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Por favor rellena tu nombre"],
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Este correo no es válido"],
      unique: true,
      required: [true, "Por favor rellena tu correo"],
    },
    password: {
      type: String,
      required: [true, "Por favor rellena tu contraseña"],
    },

    role: String,
    tokens: [],
    postIds: [{ type: ObjectId, ref: "Post" }],
    commentIds: [{ type: ObjectId, ref: "Comment" }],
    followingIds: [{ type: ObjectId, ref: "User" }],
    followerIds: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

UserSchema.index({
  name: "text",
});

UserSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.tokens;
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
