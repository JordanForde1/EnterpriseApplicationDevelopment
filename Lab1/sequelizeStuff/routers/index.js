const productsController = require('../controllers').products;
const purchase_itemsController = require('../controllers').purchase_items;
const purchasesController = require('../controllers').purchases;
const usersController = require('../controllers').users;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the pgguide API',
  }));

	// http://localhost:8000/api/products?id=1000&title=Laptop&price=100.99&created_at=2011-01-01&tags={Technology}
	app.post('/api/products', productsController.create);
	// http://localhost:8000/api/users?id=1001&email=test@email.com&password=password&created_at=2011-01-01
	app.post('/api/purchase_items', purchase_itemsController.create);
	// http://localhost:8000/api/purchases?id=1002&created_at=2011-01-01&name=John smith&address=29 Ardmore Grove&state=FL&zipcode=12345&user_id=1001
	app.post('/api/purchases', purchasesController.create);
	// http://localhost:8000/api/purchase_items?id=1003&purchase_id=1002&product_id=1000&price=100.99&quantity=1&state=Delivered
	app.post('/api/users', usersController.create);

	// http://localhost:8000/api/products?name
	// http://localhost:8000/api/products?name=TV
	app.get('/api/products', productsController.list);
	
	// http://localhost:8000/api/products/4
	app.get('/api/products/:id', productsController.retrieve);

	// http://localhost:8000/api/purchase_items
	app.get('/api/purchase_items', purchase_itemsController.list);

	// http://localhost:8000/api/purchases
	app.get('/api/purchases', purchasesController.list);

	// http://localhost:8000/api/users/4
	app.get('/api/users/', usersController.list);

	// http://localhost:8000/api/users
	app.get('/api/users/:id', usersController.retrieve);

	// http://localhost:8000/api/products/15?title=Rap CD
	app.put('/api/products/:id', productsController.update);

	// http://localhost:8000/api/products/25
	app.delete('/api/products/:id', productsController.destroy);
};
