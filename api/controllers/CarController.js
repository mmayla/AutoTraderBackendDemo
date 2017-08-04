/**
 * CarController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  find: function (req, res) {
    Car.count().exec((err, numberOfCars) => {
      if (err) { return res.negotiate(err); }
      if (!numberOfCars) { return res.notFound(); }

      Car.find({
        limit: 10,
        skip: req.param('skip'),
      })
      .exec((err, foundCars) => {
        if (err) { return res.serverError(err); }

        return res.json({
          total: numberOfCars,
          data: foundCars,
        });
      });
    });
  }

};
