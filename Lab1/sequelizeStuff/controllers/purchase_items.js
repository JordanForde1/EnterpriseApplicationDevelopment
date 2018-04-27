const purchase_items = require('../models').purchase_items;

module.exports = {
  create(req, res) {
    return purchase_items
      .create({
        id: req.query.id,
        purchase_id: req.query.purchase_id,
        product_id: req.query.product_id,
        price: req.query.price,
        quantity: req.query.quantity,
        state: req.query.state,
      })
      .then(purchase_items => res.status(201).send(purchase_items))
      .catch(error => res.status(400).send(error));
  },

    list(req, res) {
    return purchase_items
    .all()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
  },
};