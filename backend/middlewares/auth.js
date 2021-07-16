const UnauthorizedError = require("../errors/unauthorized-err");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, NODE_ENV } = process.env;

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};
module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;


  if (!authorization || !authorization.startsWith("Bearer ")) {

    throw new UnauthorizedError("Необходима авторизация");
  }

  const token = extractBearerToken(authorization);
  console.log(`token in auth: ${token}`);

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');

  } catch (err) {
    console.log("Если с токеном что-то не так - вернётся ошибка")
    throw new UnauthorizedError(`Что-то с токеном`);
  }

  req.user = payload; // записываем пейлоуд в объект запроса


  next(); // пропускаем запрос дальше
  return true;
};
