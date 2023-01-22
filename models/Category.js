const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Por favor la categoría"],
      },
  },
  { timestamps: true }
);


CategorySchema.methods.toJSON = function () {
  const category = this._doc;
  delete category.createdAt;
  delete category.updatedAt;
  delete category.__v;
  return category;
};

const category = mongoose.model("category", CategorySchema);

module.exports = category;
