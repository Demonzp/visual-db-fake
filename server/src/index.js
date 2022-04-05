require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5050;

app.use('/api/', routes.dbRouter, routes.tableRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});