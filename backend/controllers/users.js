const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const DubbleError = require("../errors/dubble-err");

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        res.send({ message: "Пользователи не найдены" });
        return;
      }
      res.send(users);
    })
    .catch(next);
};

const getMyInfo = (req, res, next) => {

  return User.findById(req.user._id)
    .then((user) => {
      console.log(user)
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
        res.send(user);


    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Невалидный id");
      }
    })
    .catch(next);
};

const getUserById = (req, res, next) =>
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Id пользователя не валидный");
      } else next(err);
    })
    .catch(next);

const createNewUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then(hash => User.create({ name, about, avatar, email, password: hash })).then(newUser => res.send(newUser)).catch((err) => {
      if (err.name === "MongoError" || err.code === 11000) {
        throw new DubbleError("Пользователь с таким email уже зарегистрирован");
      } else if (err.name === "ValidationError" || err.name === "CastError") {
        throw new BadRequestError("Переданы некорректные данные");
      }
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError("Переданы некорректные данные");
      } else next(err);
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((newAvatar) => res.send(newAvatar))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError("Переданы некорректные данные");
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });
      res
        .cookie("jwt", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send(token);
    })
    .catch(next);
};

module.exports = {
  getAllUsers,
  getUserById,
  getMyInfo,
  createNewUser,
  updateUser,
  updateAvatar,
  login,
};
