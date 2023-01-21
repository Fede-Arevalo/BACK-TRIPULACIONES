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
      required: [true, "Por favor ingrese la fecha del incident"],
    },
    timeIncident: {
      type: String,
      required: [true, "Por favor ingrese la hora del incident"],
    },
    category: {
      type: String,
      required: [true, "Por favor danos detalles del incident"],
    },
    title: {
      type: String,
      required: [true, "Por favor rellena el título del incident"],
    },
    description: {
      type: String,
      required: [true, "Por favor danos detalles del incident"],
    },
    imageIncident: {
      type: String,
    },
    locationIncident: {
      type: String,
      required: [true, "Por favor ingrese la ubicación del incident"],
    },
    send_incident: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

IncidentSchema.index({
  title: "text",
  category: "text"
});

IncidentSchema.methods.toJSON = function () {
  const incident = this._doc;
  delete incident.createdAt;
  delete incident.updatedAt;
  delete incident.__v;
  return incident;
};

const incident = mongoose.model("Incident", IncidentSchema);

module.exports = incident;
