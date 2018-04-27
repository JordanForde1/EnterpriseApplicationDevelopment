const express = require('express');
const app = express();

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./routers')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'default index file.',
}));

module.exports = app;