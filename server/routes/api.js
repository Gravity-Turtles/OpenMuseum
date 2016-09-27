var router = require("express").Router();

var ctrlArt = require('../controllers/artController.js');


router.post("/art", ctrlArt.insertArt);
router.post("/findArt", ctrlArt.findArt);

module.exports = router;