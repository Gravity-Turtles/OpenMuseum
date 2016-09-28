var router = require("express").Router();

var ctrlArt = require('../controllers/artController.js');

var ctrlAuth = require('../controllers/authenticationController.js');
var ctrlTestauth = require('../controllers/testauthController.js');
var passportService = require('../../client/services/passport');
var passport = require('../../node_modules/passport');

// middleware helper to process authentication requests thru passport
var requireAuth = passport.authenticate('jwt', { session: false });

router.post("/art", ctrlArt.insertArt);
router.post("/findArt", ctrlArt.findArt);
router.post("/signup", ctrlAuth.signup);
router.post("/testauth", requireAuth, ctrlTestauth.testauth);

console.log("in dat router")
router.put("/art", ctrlArt.editArt)


module.exports = router;