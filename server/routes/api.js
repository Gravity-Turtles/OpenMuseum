var router = require("express").Router();

var ctrlArt = require('../controllers/artController.js');

router.post("/art", ctrlArt.insertArt)

module.exports = router;