const UnauthorizedError = require("../errors/unauthorized-err");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, NODE_ENV } = process.env;


module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;


  if (!authorization || !authorization.startsWith("Bearer ")) {

    throw new UnauthorizedError("Необходима авторизация authoriz");
  }

  const token = authorization.replace('Bearer ', '');
  // console.log(`token in auth: ${token}`);

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError(`Необходима авторизация что-то с токеном ${JWT_SECRET}`);
  }

  req.user = payload; // записываем пейлоуд в объект запроса


  next(); // пропускаем запрос дальше
};
