const express = require('express');
const router = express.Router();
/////
const passport=require('passport');

const authController = require('./controllers/auth-controller');
const activationController = require('./controllers/activation-controller');
const jobController = require('./controllers/job-controller')
const {isLoggedIn, isStudent, isAlumni} = require('./middlewares/auth-middleware');



router.route('/register')
    .get(authController.renderAuth)
    .post(authController.register);


router.route('/login')
    .get(authController.renderAuth)
    .post(authController.login)


router.route('/activate/:code')
    .get(activationController.renderSetPassword)
    .post(activationController.setPassword)


router.route('/job')
    .get(jobController.listJobs)
    .post(jobController.createJob)


router.route('/job/:id')
    .get(jobController.readJob)
    .patch(jobController.updateJob)
    .delete(jobController.deleteJob)

// test link
router.get('/student', isLoggedIn, isStudent, authController.student)



module.exports = router;