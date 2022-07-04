require('dotenv').config(); // this is important!

module.exports = {
    secret: process.env.AUTH_SECRET
  };