const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserController = {
  async register(req, res, next) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password,
        imageUser: req.file?.filename,
        role: "user",
      });
      res.status(201).send({ msg: "Usuario registrado con éxito", user });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params._id);
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        msg: "Ha habido un problema al consultar el usuario",
        error,
      });
    }
  },

  async getUserByName(req, res) {
    try {
      const user = await User.find({
        $text: {
          $search: req.params.name,
        },
      });
      res.send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema al consultar el usuario", error });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        msg: "Ha habido un problema al traer todos los usuarios",
        error,
      });
    }
  },

  async updateUserById(req, res) {
    try {
      let hashedPassword;
      const { password } = req.body;
      if (password !== undefined) {
        hashedPassword = await bcrypt.hashSync(password, 10);
      }
      const updatedUser = {
        name: req.body.name,
        imageUser: req.file?.filename,
        email: req.body.email,
        password: hashedPassword,
        age: req.body.age,
      };
      const user = await User.findByIdAndUpdate(req.params._id, updatedUser, {
        new: true,
      });
      res.status(201).send({ msg: "Usuario actualizado con éxito!", user });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .send({
          msg: "Hubo un problema al intentar actualizar el usuario",
          error,
        });
    }
  },

  async deleteUserById(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params._id);
      res.send({ msg: "Usuario eliminado", user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema al eliminar el usuario" });
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res.status(400).send({ msg: "Correo o contraseña incorrectos" });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Correo o contraseña incorrectos" });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      if (user.tokens.length > 4) user.tokens.shift;
      user.tokens.push(token);
      await user.save();
      res.send({ msg: "Bienvenid@ " + user.name, token, user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Ha habido un error al logearte", error });
    }
  },

  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ msg: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Hubo un problema al intentar desconectar el usuario" });
    }
  },

  async loggedIn(req, res) {
    try {
      const user = await User.findById(req.user._id).populate({
        path: "postIds",
        path: "commentIds",
        path: "followingIds",
        path: "followerIds",
      });
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        msg: "Ha habido un problema al consultar el usuario logeado",
        error,
      });
    }
  },
};

module.exports = UserController;
