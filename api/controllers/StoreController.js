/**
 * StoreController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  find: function (req, res) {
    return res.json(403, 'Single model lookup is denied.');
  }
};
