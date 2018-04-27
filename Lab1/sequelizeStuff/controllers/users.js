const users = require('../models').users;

module.exports = {
  create(req, res) {
    return users
      .create({
        id: req.query.id,
        email: req.query.email,
        password: req.query.password,
        details: req.query.details,
        created_at: req.query.created_at,
        deleted_at: req.query.deleted_at,
      })
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return users
    .findAll({attributes: ['email', 'details'], order:[['created_at', 'DESC' ]]})
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
  },

  retrieve(req,res){
    return users
  .findById(req.params.id)
  .then(users => {
    if(!users) {
      return res.status(404).send({ message: 'Product not found.',});
      }
    return res.status(200).send(users);
  })
  .catch(error => res.status(400).send(error));
  },
};