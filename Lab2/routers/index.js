const productsController = require('../controllers').products;
const products1Controller = require('../controllers').products1;
const usersController = require('../controllers').users;


module.exports = (app) => {
	
	app.get('/products',productsController.retrieve);
	app.get('/products1',products1Controller.retrieve);

	app.post('/userlogin',usersController.userlogin);
};
