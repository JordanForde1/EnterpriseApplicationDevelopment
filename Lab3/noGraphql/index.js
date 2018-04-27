const pgPromise = require('pg-promise');
const connStr = 'postgres://postgres:password@localhost:5432/dellstore2';
const pgp = pgPromise({});
const psql = pgp(connStr);
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

const query = "SELECT firstname || ',' || lastname || ',' || age || ',' || gender AS profile from postgraphile.customers;";

const typeDefs = buildSchema( `
  type Query {  
    AllCustomers: [Customers]!
  }
  
  type Customers {
    customerid: Int!
    firstname: String
    lastname: String
    address1: String
    address2: String
    city: String
    state: String
    zip: Int
    country: String
    region: String
    email: String
    phone: String
    creditcardtype: String
    creditcard: String
    creditcardexpiration: String
    username: String
    password: String
    age: Int
    income: Int
    gender: String
    profile: String
  }
`);

const root = {
  AllCustomers: () => {
    return psql.manyOrNone(query);
  }
};

app.use('/graphql', graphqlHTTP({
  schema: typeDefs,
  rootValue: root,
  graphiql: true,
}));
  
app.listen(3000, () => {
  console.log('GraphQL Server listening on port 3000');
});


/*const pgPromise = require('pg-promise');
const connStr = 'postgres://postgres:password@localhost:5432/dellstore2';
const pgp = pgPromise({});
const psql = pgp(connStr);
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

const query = "SELECT firstname || ',' || lastname || ',' || age || ',' || gender AS profile from postgraphile.customers;";

const typeDefs = buildSchema( `
  type Query {
    AllCustomers: [Customers]!
  }
  
  type Customers {
  	customerid: Int!
    firstname: String
    lastname: String
    address1: String
    address2: String
    city: String
    state: String
    zip: Int
    country: String
    region: String
    email: String
    phone: String
    creditcardtype: String
    creditcard: String
    creditcardexpiration: String
    username: String
    password: String
    age: Int
    income: Int
    gender: String
    profile: String
  }
`);

const root = {
	AllCustomers: () => {zz
		return psql.manyOrNone(query);
	}
};

app.use('/graphql', graphqlHTTP({
	schema: typeDefs,
	rootValue: root,
	graphiql: true,
}));
	
app.listen(3000, () => {
  console.log('GraphQL Server listening on port 3000');
});*/