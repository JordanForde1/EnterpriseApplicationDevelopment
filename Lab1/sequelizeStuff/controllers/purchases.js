const purchases = require('../models').purchases;

module.exports = {
  create(req, res) {
    return purchases
      .create({
        id: req.query.id,
        created_at: req.query.created_at,
        name: req.query.name,
        address: req.query.address,
        state: req.query.state,
        zipcode: req.query.zipcode,
        user_id: req.query.user_id,
      })
      .then(purchases => res.status(201).send(purchases))
      .catch(error => res.status(400).send(error));
  },

    list(req, res) {
    return purchases
    .all()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
  },
};