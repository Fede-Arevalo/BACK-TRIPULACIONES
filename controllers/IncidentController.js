const User = require("../models/User");
const Incident = require("../models/Incident.js");

const IncidentController = {
  async createIncident(req, res, next) {
    try {
      const incident = await Incident.create({
        ...req.body,
        userId: req.user._id,
        imageIncident: req.file?.filename,
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { incidentIds: incident._id },
      });
      res.status(201).send(incident);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  async deleteIncidentById(req, res) {
    try {
      const incident = await Incident.findByIdAndDelete(req.params._id);
      res.send({ msg: "Evento eliminado", incident });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema al eliminar el evento" });
    }
  },
  async getAllIncidents(req, res) {
    try {
      const incidents = await Incident.find();
      res.send(incidents);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema al traer los eventos", error });
    }
  },
  async updateIncidentById(req, res) {
    try {
      const incident = await Incident.findByIdAndUpdate(
        req.params._id,
        { ...req.body },
        {
          new: true,
        }
      ).populate("userId");
      res.send({ message: "Evento actualizado con exito", incident });
    } catch (error) {
      console.error(error);
    }
  },
};
module.exports = IncidentController;
