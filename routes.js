module.exports = {

  loginUser (req, res, next, passport) {
    passport.authenticate('local-login', function (err, user, info) {

        if (err) {
          return next(err); // will generate a 500 error
        }

        // Generate a JSON response reflecting authentication status
        if (!user) {
          return res.send({isAuthenticationSuccess: false, authenticationMessage: 'authentication failed'});
        }

        req.login(user, loginErr => {
          if (loginErr) {
            return next(loginErr);
          }

          return res.send({
            userRole: user.userRole,
            isAuthenticationSuccess: true,
            authenticationMessage: 'authentication successful'
          });
        });
      })(req, res, next);
  },

  logoutUser (req, res) {
    req.logout();
    res.redirect('/');
  },

  getData (req, res, db) {
    db.collection('stocks').find().toArray(function (err, results) {
      res.status(200).json(results);
    });
  },

  submitData (req, res, db) {
    req.body.createdOn = new Date();
    db.collection('customers').insert(req.body, function (err, results) {
      if (results.result.ok === 1) {
        res.status(200).json(results);
      } else {
        res.status(500).json({
          message: "Request Failed"
        });
      }
    });
  }
};
