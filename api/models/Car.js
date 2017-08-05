/**
 * Car.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
    },

    year: {
      type: 'integer',
      required: true,
    },

    price: {
      type: 'integer',
      required: true,
    },

    store: {
      model: 'store',
    },
  },

};
