const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const uniqueValidator = require('mongoose-unique-validator');
const UnauthorizedError = require("../errors/unauthorized-err");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
    required:true
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Исследователь",
    required:true
  },
  avatar: {
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator: (value) => /^https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/.test(value),
      message: "Ошибка URL"

    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Введён некорректный email',
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new UnauthorizedError('Неправильные email или пароль');
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new UnauthorizedError('Неправильные email или пароль');
      }

      return user; // теперь user доступен
    });
  });
};
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
