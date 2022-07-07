var express = require("express");
var router = express.Router();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user");
/* GET users listing. */

router.post(
  "/course",
  authJwt.verifyToken,
  authJwt.verifyRole,
  authJwt.verifyField,
  controller.saveUser
);
router.get(
  "/course",
  authJwt.verifyToken,
  authJwt.verifyRole,
  controller.fecthUser
);

module.exports = router;
