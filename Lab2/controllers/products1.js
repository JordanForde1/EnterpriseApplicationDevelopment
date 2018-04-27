const products1 = require('../models').products;
const jwt = require('jsonwebtoken')


module.exports ={
	retrieve(req,res){
		var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImpvcmRhbiIsImlhdCI6MTUxOTYzODI4MiwiZXhwIjoxNTE5NzI0NjgyfQ.39sv-4D2RwjeWpi6N_-bzl-huDRcmuVgtsbENVxWXVI';
		jwt.verify(token, 'allow', function(err, decoded) {
		if (decoded){
			return products1
					.all()
					.then(products => res.status(200).send(products))
					.catch(error => res.status(400).send(error));
				}
		else{
			return res.status(404).send({message:'Token is not valid.'});
	       }
		}).catch(err => {
				console.log("Incorrect details!")
		})
  	},
};
