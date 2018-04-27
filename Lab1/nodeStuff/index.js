const express = require('express');
const http = require('http');
const massive = require('massive');

const app = express();

massive(
{
	  host: '127.0.0.1',
  	port: 5432,
  	database: 'pgguide',
  	user: 'postgres',
  	password: 'password'
}).then(instance => 
{
  	app.set('db', instance);

    //Get users
    //http://localhost:3000/users
  	app.get("/users", (req, res) => {
  		instance.query("SELECT email, details->'sex' as sex FROM users ORDER BY created_at DESC").then(query => {
			res.json(query);
		})
	});

    //Get users by ID
    //http://localhost:3000/users/1
    app.get("/users/:id", (req, res) => {
      instance.query("select email, details->'sex' as sex from users where id = ${id} order by created_at desc",
      {id: req.params.id}).then(query => {
      res.json(query);
    })
  });

   
   /* //Get products
    //http://localhost:3000/products
    app.get('/products', (req, res) => {
    instance.query( "Select title, price from products order by price asc").then(items => {
    res.json(items);
    });
  });

    //Filter products and allow for possible SQL Injection
    //The above link will show all users in the user table
    //Deleteing from the products table with sql injection

    //http://localhost:3000/products?name=p
    //http://localhost:3000/products?name=p%27%3B%20SELECT%20*%20FROM%20users%3B%20--
    //http://localhost:3000/products?name=p'; DELETE FROM purchase_items WHERE product_id = 1000; DELETE FROM products WHERE id = 1000 --
    app.get('/products', (req, res) => {
      search = (req.query.name == undefined) ? '' : req.query.name;
      instance.query("SELECT * FROM products WHERE LOWER(title) LIKE '" + search + "%' " + 
      "ORDER BY price ASC").then(items => {
      res.json(items);
         });
      });

    //Using a parameterised query to eliminate the SQL Injection
    //http://localhost:3000/products?name=p
    //http://localhost:3000/products?name=p%27%3B%20SELECT%20*%20FROM%20users%3B%20--
    //http://localhost:3000/products?name=p'; DELETE FROM purchase_items WHERE product_id = 2; DELETE FROM products WHERE id = 2 --
      app.get('/products', (req, res) => {
      search = (req.query.name == undefined) ? '' : req.query.name;
      instance.query("SELECT * FROM products WHERE LOWER(title) LIKE $1 " + 
      "ORDER BY price ASC", [ search + "%" ]).then(items => {
      res.json(items);
         });
      });*/

   //Using a stored procedure to eliminate the SQL Injection
    //http://localhost:3000/products?name=p
    //http://localhost:3000/products?name=p%27%3B%20SELECT%20*%20FROM%20users%3B%20--
    //http://localhost:3000/products?name=p'; DELETE FROM purchase_items WHERE product_id = 2; DELETE FROM products WHERE id = 2 --
  	app.get("/products", (req, res) => {
    instance.query('select * from productFunction(${title})', {title: req.query.name}).then(query => {
      res.json(query);
    });
  });

  //Get products by ID
  //http://localhost:3000/products/1
    app.get("/products/:id", (req, res) => {
      instance.query("select * from products where id = ${id}",
      {id: req.params.id}).then(query => {
      res.json(query);
    })
  });


  //Get purchases
  //http://localhost:3000/purchases
    app.get("/purchases", (req, res) => {
      instance.query("select purchases.name, purchases.address, users.email, purchase_items.price, purchase_items.quantity," 
      + " purchase_items.state from purchases join users on purchases.user_id = users.id "
      + "join purchase_items on purchases.id = purchase_items.purchase_id order by purchase_items.price desc").then(query => {
      res.json(query);
    })
  });
  
  http.createServer(app).listen(3000);
});