/**
 * StoreController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const _ = require('lodash');

module.exports = {
  find: function (req, res) {
    Store.count().exec((err, numberOfStores) => {
      if (err) { return res.negotiate(err); }
      if (!numberOfStores) { return res.notFound(); }

      Store.find({
        limit: 10,
        skip: req.param('skip'),
      })
      .populate('cars')
      .populate('owners')
      .exec((err, foundStores) => {
        if (err) { return res.serverError(err); }

        return res.json({
          total: numberOfStores,
          data: foundStores,
        });
      });
    });
  },

  createStore: (req, res) => {
    // Validate parameters
    if (!_.isString(req.param('name'))) {
      return res.badRequest();
    }

    const userId = req.session.userId;

    sails.log.debug('userId', userId);

    User.findOne({
      id: userId,
    }).exec((err, user) => {
      if (err) {
        sails.log.error(err);
        return res.badRequest();
      }

      if (!user) {
        return res.notFound();
      }

      if (user.store) {
        return res.badRequest('User own a store can\'t create another one');
      }

      sails.log.debug('store name:', req.param('name'));

      Store.create({
        name: req.param('name'),
      })
      .meta({fetch: true})
      .exec((err, createdStore) => {
        if (err) {
          return res.badRequest('Error creating the store');
        }
        sails.log.debug('created store:', createdStore);
        // add store to user
        User.update({
          id: userId,
        }, {
          store: createdStore.id,
        })
        .meta({fetch: true})
        .exec((err, updatedUser) => {
          if (err) {
            return res.badRequest('Can\'t update user');
          }

          if (!updatedUser) {
            return res.notFound();
          }

          return res.json({id: createdStore.id});
        });
      });
    });
  },
};
