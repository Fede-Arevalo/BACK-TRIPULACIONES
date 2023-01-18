const User = require("../models/User");
const Event = require("../models/Event.js");

const EventController = {
  async createEvent(req, res, next) {
    try {
      const event = await Event.create({
        ...req.body,
        userId: req.user._id,
        imageEvent: req.file?.filename,
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { eventIds: event._id },
      });
      res.status(201).send(event);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  async deleteEventById(req, res) {
    try {
      const event = await Event.findByIdAndDelete(req.params._id);
      res.send({ msg: "Evento eliminado", event });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema al eliminar el evento" });
    }
  },
  async getAllEvents(req, res) {
    try {
      const events = await Event.find();
      res.send(events);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema al traer los eventos", error });
    }
  },
  async updateEventById(req, res) {
    try {
      const event = await Event.findByIdAndUpdate(
        req.params._id,
        { ...req.body },
        {
          new: true,
        }
      ).populate("userId");
      res.send({ message: "Evento actualizado con exito", event });
    } catch (error) {
      console.error(error);
    }
  },
};
module.exports = EventController;
