const products = require('../models').products;
const users = require ('../models').users;
const crypto = require ('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


module.exports ={
	retrieve(req,res){
		var token = req.header('Authorization');
		var extract = req.header('Signature');
		var Store_access = req.header('key');
		var key;

		users.find({
			where:{accesskey: {$like: Store_access
					}
				}
			}).then(users => {
				key = users.get('secretkey');
				var signature = crypto.createHmac("sha256", key).update(Store_access).digest('hex');
				jwt.verify(token, 'allow', function(err, decoded) {
					if (decoded){
						if(extract == signature){
							return products
							.all()
							.then(products => res.status(200).send(products))
							.catch(error => res.status(400).send(error));
						}
					}
					else{
						return res.status(404).send({message:'Token is not valid.'});
	        		}
				})
			}).catch(err => {
				console.log("Incorrect details!")
			})
  	},
};
