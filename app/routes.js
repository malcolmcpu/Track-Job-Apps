//SETTING UP ACCESS TO THE 'PLANTS' COLLECTION WITHIN OUR DATABASE
const { application } = require('express');
const Applications = require('./models/applications');

module.exports = function (app, passport, db, ObjectId) {
  // normal routes ===============================================================

  // SERVING UP THE LANDING PAGE
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, async (req, res) => {
    //DISPLAY LIST OF APPLICATIONS ASSOCIATED WITH THE USER
    try {
      const applications = await Applications.find({
        userId: req.user._id,
      }).sort({ dateApplied: -1 });
      res.render('profile.ejs', { applications });
    } catch (err) {
      console.error(err);
      res.status(500).send('Could not load applications.');
    }
  });

  //SERVING UP THE ADD NEW APPLICATION PAGE
  app.get('/applications/new', isLoggedIn, function (req, res) {
    res.render('addApplication.ejs', {
      application: {},
      statuses: Applications.schema.path('status').enumValues,
    });
  });

  //CREATING A NEW APPLICATION DATABASE RECORD
  app.post('/applications', isLoggedIn, async (req, res) => {
    try {
      await Applications.create({
        userId: req.user._id,
        company: req.body.company,
        role: req.body.role,
        status: req.body.status,
        // the bottom set up will ensure that date property value is US "YYYY-MM-DD" format
        dateApplied:
          req.body.dateApplied || new Date().toLocaleDateString('en-US'),
        notes: req.body.notes,
      });
      console.log('New application added to the database!');
      res.redirect('/profile');
    } catch (err) {
      console.error(err);
      res.redirect('/profile');
    }
  });

  //GRABBING SELECTED APPLICATION FOR EDIT
  app.get('/applications/:id/edit', async (req, res) => {
    try {
      const application = await Applications.findOne({
        _id: req.params.id,
        userId: req.user._id,
      });
      if (!application) {
        return res.redirect('/applications');
      }
      res.render('editApplication', {
        application,
        statuses: Applications.schema.path('status').enumValues,
      });
    } catch (err) {
      console.error(err);
      res.redirect('/profile');
    }
  });

  ///////    SERVING UP APPLICATION EDITS/UPDATES
  app.post('/applications/:id', async (req, res) => {
    try {
      await Applications.findByIdAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        {
          company: req.body.company,
          role: req.body.role,
          status: req.body.status,
          dateApplied:
            req.body.dateApplied || new Date().toLocaleDateString('en-US'),
          notes: req.body.notes,
        },
        { runValidators: true },
      );
      res.redirect('/profile');
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  });

  // DELETING AN APPLICATION RECORD FROM THE DATABASE
  app.delete('/applications/delete/:id', async (req, res) => {
    try {
      await Application.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id,
      });
    } catch (err) {
      console.error(err);
    }
    res.redirect('/applications');
  });

  // LOGOUT ==============================
  app.get('/logout', (req, res) => {
    req.logout(() => {
      console.log('User has logged out!');
    });
    res.redirect('/');
  });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // SERVING UP THE LOGIN PAGE
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // WE'RE USING APP.POST FOR AUTHENTICATION ON LOGIN, BECAUSE APP.GET IS ALREADY BEING USED TO SIMPLY SERVE UP LOGIN PAGE; AND B/C WE ARE USING A FORM THE .POST METHOD IS THE DEFAULT METHOD WHEN USING A FORM

  // process the login form
  app.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/profile', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    }),
  );

  // SIGNUP =================================
  // SERVING UP THE PROFILE SIGN UP PAGE
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/profile', // redirect to the secure profile section
      failureRedirect: '/signup', // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    }),
  );

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/profile');
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}
