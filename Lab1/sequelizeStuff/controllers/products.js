const products = require('../models').products;

module.exports = {
  create(req, res) {
    return products
      .create({
      	id: req.query.id,
        title: req.query.title,
        price: req.query.price,
        created_at: req.query.created_at,
        deleted_at: req.query.deleted_at,
        tags: req.query.tags,
      })
      .then(products => res.status(201).send(products))
      .catch(error => res.status(400).send(error));
  },

  list(req, res){
  	return products
  	.findAll({
  		where:{ title:{ $like: '%' + req.query.name + '%'}
  		}
  	})
  	.then(products => res.status(201).send(products))
    .catch(error => res.status(400).send(error));
  },

  retrieve(req,res){
  	return products
	.findById(req.params.id)
	.then(products => {
		if(!products) {
			return res.status(404).send({ message: 'Product not found.',});
			}
		return res.status(200).send(products);
	})
	.catch(error => res.status(400).send(error));
  },

  update(req, res){
	return products
	.findById(req.params.id)
	.then(products => {
		if(!products) {
			return res.status(404).send({message: 'Product not found.',
			});
		}
		return products
		.update({title: req.query.title || products.title,})
		.then(() => res.status(200).send(products))
		.catch((error) => res.status(400).send(error));
	})
	.catch(error => res.status(400).send(error));  
	},

	destroy(req, res) {
		return products
		.findById(req.params.id)
		.then(products => {
			if(!products) {
				return res.status(404).send({message: 'Products not found.',});
			}
			return products
			.destroy()
			.then(() => res.status(200).send({message: 'Deleted.'}))
			.catch((error) => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error));
	},

};