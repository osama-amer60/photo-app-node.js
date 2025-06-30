const { signup } = require("../services/user.service");
const router = require("express").Router();

router.post('/signup', signup)
module.exports = router;
