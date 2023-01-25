const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const transporter = require("../config/nodemailer");

const UserController = {
  async register(req, res, next) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password,
        imageUser: req.file?.filename,
        confirmed: false,
        role: "user",
      });
      const emailToken = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET,
        { expiresIn: "48h" }
      );
      const url = "http://localhost:8080/users/confirm/" + emailToken;
      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirme su registro",
        html: `<img src="../img/logo.jpg" alt="logo image">
        <br>
        <h2>Estás a un paso de registrarte 🚶​ </h2>
        <h2><a href="${url}">👉 ​​Click aqui para confirmar tu registro 👈</a></h2>
        `,
      });
      res.status(201).send({ msg: "Usuario registrado con éxito", user });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      await User.updateOne(
        { email: payload.email },

        {
          confirmed: true,
        }
      );

      res.status(201).send("Usuario confirmado con éxito");
    } catch (error) {
      console.error(error);
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
      res.status(400).send({
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
        return res.status(400).send({ msg: "Datos incorrectos" });
      }
      if (!user.confirmed) {
        return res.status(400).send({ message: "Debes confirmar tu correo" });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Datos incorrectos" });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      const tokenShift = () => {
        user.tokens.shift;
      };
      if (user.tokens.length > 4) tokenShift();
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
  async recoverPassword(req, res) {
    try {
      const recoverToken = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      const url = "http://localhost:8080/users/resetPassword/" + recoverToken;
      await transporter.sendMail({
        to: req.body.email,
        subject: "Recuperar contraseña",
        html: `<h3> Recuperar contraseña </h3>
  <a href="${url}">Recuperar contraseña</a>
  El enlace expirará en 24 horas
  `,
      });
      res.send({
        message: "Un correo de recuperación se envio a tu dirección de correo",
      });
    } catch (error) {
      console.error(error);
    }
  },
  async resetPassword(req, res) {
    try {
      const recoverToken = req.params.recoverToken;
      const payload = jwt.verify(recoverToken, process.env.JWT_SECRET);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await User.findOneAndUpdate(
        { email: payload.email },
        { password: hashedPassword }
      );
      res.send({ message: "contraseña cambiada con éxito" });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = UserController;
