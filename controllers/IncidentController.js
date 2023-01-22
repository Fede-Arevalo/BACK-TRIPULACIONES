const User = require("../models/User");
const Incident = require("../models/Incident.js");
const Category = require("../models/Category");


const IncidentController = {
  async createIncident(req, res, next) {
    try {
      const incident = await Incident.create({
        ...req.body,
        userId: req.user._id,
        imageIncident: req.file?.filename,
        categoryId: req.body.categoryId,
      });
      await Category.findByIdAndUpdate(req.body.categoryId, {
        $push: { incidentIds: incident._id },
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { incidentsIds: incident._id },
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
        .send({ msg: "Ha habido un problema al eliminar la incidencia" });
    }
  },
  async getAllIncidents(req, res) {
    try {
      const incidents = await Incident.find().populate("userId");
      res.send(incidents);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema al traer las incidencias", error });
    }
  },
  async getIncidentById(req, res) {
    try {
      const incident = await Incident.findById(req.params._id).populate(
        "userId"
      );
      res.send(incident);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          msg: "Ha habido un problema al traernos la incidencia",
          error,
        });
    }
  },
  async getIncidentsXCategory(req, res) {
    try {
        if(!req.body.category) {
            return res.status(400).send({ msg: "La categoría es requerida" });
        }
        const incidents = await Incident.find({
            category: req.body.category
        });
        if(!incidents) {
            return res.status(404).send({ msg: "No se encontraron incidentes con esa categoría" });
        }
        res.send({ msg: "Incidentes por categoría", incidents });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema al traer los incidentes", error });
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
      res.send({ message: "Incidencia actualizada con exito", incident });
    } catch (error) {
      console.error(error);
    }
  },
  async sendIncidents(req, res) {
        try {
          const incident = await Incident.findByIdAndUpdate(
            req.params._id,
            { $push: { send_incident: req.user._id } },
            { new: true }
          ).populate("userId");
          res.send(incident);
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .send({ msg: "Ha habido un problema al enviar el incidente" });
        }
      },
    
      async pendingIncidents(req, res) {
        try {
          const incident = await Incident.findByIdAndUpdate(
            req.params._id,
            { $pull: { send_incident: req.user._id } },
            { new: true }
          ).populate("userId");
          res.send(incident);
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .send({ msg: "Ha habido un problema" });
        }
      },
};
module.exports = IncidentController;
