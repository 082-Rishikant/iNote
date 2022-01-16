const jwt = require('jsonwebtoken');
const JWT_secret = "Rishiisa@boy";

const fetchuser = (req, res, next) => {
  // Get the user from jwt token and add user id to req object
  const token = req.header('auth_token');
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }

}

module.exports = fetchuser;






// var jwt = require('jsonwebtoken');
// const JWT_SECRET = "Rishii@saboy";

// const fetchuser = (req, res, next) => {
//     // Get the user from the jwt token and add id to req object
//     const token = req.header('auth_token');
//     if (!token) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }
//     try {
//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = data.user;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }

// }


// module.exports = fetchuser;