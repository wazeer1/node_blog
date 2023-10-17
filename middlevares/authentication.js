const jwt = require('jsonwebtoken'); 

const verifyToken = (req, res, next) => {
    console.log("hello world");
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
  
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      jwt.verify(bearerToken, 'your_secret_key', (err, authData) => {
        if (err) {
          res.sendStatus(403); 
        } else {
          req.user = authData; 
          next();
        }
      });
    } else {
      res.sendStatus(401);
    }
  };

module.exports = verifyToken