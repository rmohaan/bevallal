var ObjectId = require('mongodb').ObjectID;

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
  },

  getAllUsers (req, res, db) {
    db.collection('users').find().toArray(function (err, results) {
      res.status(200).json(results);
    });
  },

  getAllSurplusFoodEntries (req, res, db) {
    db.collection('surplusfood').find().toArray(function (err, results) {
      res.status(200).json(results);
    });
  },

  verifyValidNumber (req, res, db) {
    console.log("verifyValidNumber called");
    console.log(req.query);
    db.collection('users').findOne({ "phone": req.query.phone }, function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log(results);
      res.status(200).json(results);
    });
  },

  getOrphanage (req, res, db) {
    console.log("getOrphanage called");
    console.log(req.query);
    db.collection('users').findOne({ "phone": req.query.phone, "type": "orphanage" }, function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log(results);
      res.status(200).json(results);
    });
  },

  getPartyHall (req, res, db) {
    console.log("getPartyHall called");
    db.collection('users').findOne({ "phone": req.query.phone, "type": "partyhall" }, function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log(results);
      res.status(200).json(results);
    });
  },

  getPreviousRequests (req, res, db) {
    console.log("getPreviousRequests called");
    console.log(req.query.phone);
    db.collection('surplusfood').find({ "receiver_phone": req.query.phone }).toArray(function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log(results);
      res.status(200).json(results);
    });
  },

  getAvailableSurplusFood (req, res, db) {
    console.log("getAvailableSurplusFood called");
    db.collection('surplusfood').find({ "receiver_phone": "" }).toArray(function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log(results);
      res.status(200).json(results);
    });
  },

  acceptAvailableSurplusFood (req, res, db) {
    console.log("acceptAvailableSurplusFood called", req.body);
    db.collection('surplusfood').find({ "offerer_phone": req.body.offerer_phone, "receiver_phone":""}).toArray(function (err, results) {
      if (err) {
        console.log("error" + err);
      }
      if (results.length > 0) {
        var success = false;
        db.collection('surplusfood').updateOne(
          {"_id": ObjectId(req.body.id)},
          {$set: {"receiver_phone": req.body.receiver_phone}},
          function (err, results) {
            if (results.result.ok === 1) {
              success = true;
              console.log("Update Successful");
              res.status(200).json({status: success});
            } else {
              res.status(500).json({
                message: "Request Failed"
              });
            }
          });
      }
    });
  },

  createSurplusFood (req, res, db) {
    console.log("createSurplusFood called");
    console.log(req);

    var reqBody = req.body;
    reqBody["receiver_phone"] = "";

    req.body.createdOn = new Date();
    db.collection('surplusfood').insert(reqBody, function (err, results) {
      if (results.result.ok === 1) {
        res.status(200).json(results);
      } else {
        res.status(500).json({
          message: "Request Failed"
        });
      }
    });
  },

  createOrphanage (req, res, db) {
    console.log("createOrphanage called");
    var reqBody = {
      "phone": "8939831979",
      "type": "orphanage",
      "name": "Orphanage 4",
      "owner_name": "Shakthi",
      "email": "rajam6@gmail.com",
      "address": "No.15, Vaigai Street, T.Nagar",
      "area": "T.Nagar",
      "headcount": 20
    };
    req.body.createdOn = new Date();
    db.collection('users').insert(req.body, function (err, results) {
      if (results.result.ok === 1) {
        res.status(200).json(results);
      } else {
        res.status(500).json({
          message: "Request Failed"
        });
      }
    });
  },

  createPartyHall (req, res, db) {
    console.log("createPartyHall called");
    console.log(req.body);
    req.body.createdOn = new Date();
    db.collection('users').insert(req.body, function (err, results) {
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
