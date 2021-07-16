require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

const { PORT = 3000 } = process.env;

const { login, createNewUser } = require("./controllers/users.js");
const { auth } = require("./middlewares/auth");
const usersRoutes = require("./routes/users.js");
const cardsRoutes = require("./routes/cards.js");

const NotFoundError = require("./errors/not-found-err");
const { errors } = require("celebrate");

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => console.log("Mongodb connected"));
mongoose.connection.on("error", (err) => console.log(`Ошибка ${err}`));

// Массив доменов, с которых разрешены кросс-доменные запросы
// const allowedCors = [
//   "https://mesto.yandex.students.nomoredomains.club",
//   "http://mesto.yandex.students.nomoredomains.club",

// ];

app.use(cors());

// app.use((req, res, next) => {
//   const { origin } = req.headers;

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);

//   }

//   next();
// });

// app.options('*', cors());


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
//   );
//   if (req.method === "OPTIONS") {
//    return  res.sendStatus(200);
//   }
//   next();
// });



app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use(cookieParser());

app.use(requestLogger); // подключаем логгер запросов

// Чтобы на ревью мы смогли наверняка это протестировать, перед обработчиками роутов /signin и /signup добавьте такой код:
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.post("/signin", login);
app.post("/signup", createNewUser);

app.use("/", auth, usersRoutes);
app.use("/", auth, cardsRoutes);

app.use(errorLogger);

app.use(errors());

app.use("*", () => {
  throw new NotFoundError("Не найден данный ресурс");
});

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log("Сервер запущен");
});
