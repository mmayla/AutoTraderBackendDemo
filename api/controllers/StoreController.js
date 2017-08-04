/**
 * StoreController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  find: function (req, res) {
    Store.count().exec((err, numberOfStores) => {
      if (err) { return res.negotiate(err); }
      if (!numberOfStores) { return res.notFound(); }

      Store.find({
        limit: 10,
        skip: req.param('skip'),
      })
      .exec((err, foundStores) => {
        if (err) { return res.serverError(err); }

        return res.json({
          total: numberOfStores,
          data: foundStores,
        });
      });
    });
  }
};
