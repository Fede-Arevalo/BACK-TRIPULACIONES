const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Por favor rellena tu nombre"],
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
