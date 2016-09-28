var router = require("express").Router();

var ctrlArt = require('../controllers/artController.js');
console.log("in dat router")
router.post("/art", ctrlArt.insertArt);
router.post("/findArt", ctrlArt.findArt);
router.put("/art", ctrlArt.editArt)

module.exports = router;