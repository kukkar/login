function setupAuth( app) {
  var passport = require('passport');
  var FacebookStrategy = require('passport-facebook').Strategy;

  // High level serialize/de-serialize configuration for passport
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    /*User.
      findOne({ _id : id }).
      exec(done);*/
  });

  // Facebook-specific
  passport.use(new FacebookStrategy(
    {
      clientID: '1094430367309064',
      clientSecret: '5f1d398663ff8c2b5bbfcdd2af3ec4bb',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['emails','name','gender','profileUrl']
    },
    function(accessToken, refreshToken, profile, done) {
    console.log(profile);      
//if (profile.emails) {
  //      return done('No emails associated with this account!');
    //  }
      console.log('values are here');
       
      /*User.findOneAndUpdate(
        { 'data.oauth': profile.id },
        {
          $set: {
            //'profile.username': profile.emails[0].value,
            'profile.picture': 'http://graph.facebook.com/' +
              profile.id.toString() + '/picture?type=large'
          }
        },
        { 'new': true, upsert: true, runValidators: true },
        function(error, user) {
          done(error, user);
        });*/
    }));


  app.use(passport.initialize());
  app.use(passport.session());

  // Express routes for auth
  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/fail' }),
    function(req, res) {
      res.send('Welcome, ' + '<a href = "'+ req.user.profile.picture + '"></a>');
    });
}

module.exports = setupAuth;
