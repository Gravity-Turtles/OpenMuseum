const router = require("express").Router();

const ctrlArt = require('../controllers/artController.js');

const ctrlAuth = require('../controllers/authenticationController.js');
const ctrlTestauth = require('../controllers/testauthController.js');
const passportService = require('../services/passport');
const passport = require('passport');

// middleware helper to process authentication requests thru passport
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});

// router.get('/', requireAuth, function(req, res) {
//   res.send({hi: 'there'});
// });
router.post("/art", ctrlArt.insertArt);
router.post("/findArt", ctrlArt.findArt);
router.post("/signin", requireSignin, ctrlAuth.signin);
router.post("/signup", ctrlAuth.signup);

console.log("in dat router")
router.put("/art", ctrlArt.editArt)


module.exports = router;