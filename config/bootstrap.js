/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = function(done) {
  const Passwords = require('machinepack-passwords');

  User.findOne({
    email: 'admin@botcommander.io',
  }).exec((err, user) => {
    if (err) {
      return done(err);
    }

    if (user) {
      return done();
    }

    Passwords.encryptPassword({
      password: '12345',
    }).exec({
      error: (err) => {
        return done(err);
      },

      success: (result) => {
        let options = {};
        options.email = 'admin@botcommander.io';
        options.encryptedPassword = result;
        options.deleted = false;
        User.create(options).exec((err, user) => {
          if (err) {
            return done(err);
          }
          return done();
        });
      },
    });
  });
};
