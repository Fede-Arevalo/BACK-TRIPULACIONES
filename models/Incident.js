const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const IncidentSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    incidentDate: {
      type: Date,
      required: [true, "Por favor ingrese la fecha del evento"],
    },
    timeIncident: {
      type: String,
      required: [true, "Por favor ingrese la hora del evento"],
    },
    category: {
      type: String,
      required: [true, "Por favor danos detalles del evento"],
    },
    title: {
      type: String,
      required: [true, "Por favor rellena el título del post"],
    },
    description: {
      type: String,
      required: [true, "Por favor danos detalles del evento"],
    },
    imageIncident: {
      type: String,
    },
    locationIncident: {
      type: String,
      required: [true, "Por favor ingrese la ubicación del evento"],
    },
    state: {
      type: Boolean,
      required: [true, "Por favor ingrese la ubicación del evento"],
    },
    // commentIds: [{ type: ObjectId, ref: "Comment" }],
    // likes_incident: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

IncidentSchema.index({
  title: "text",
});

IncidentSchema.methods.toJSON = function () {
  const post = this._doc;
  delete post.createdAt;
  delete post.updatedAt;
  delete post.__v;
  return post;
};

const Incident = mongoose.model("Incident", IncidentSchema);

module.exports = Incident;
