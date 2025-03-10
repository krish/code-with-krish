const express = require('express');
const {getMinNumber} = require('./util.js');

const app = new express();
const port = 3000;

app.get('/number/max', (req, res) => {});
app.get('/number/avg', (req, res) => {}); ///number/avg?numbers=1,4,7,44,676,......n
app.get('/number/sort', (req, res) => {}); ///number/sort?numbers=1,4,7,44,676,......n&type (asc |dec)
app.get('/number/count', (req, res) => {}); ///number/count?numbers=1,A,saman,Kamal,676,......n&search=saman //need to return how many occurances

app.get('/number/min', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  const result = getMinNumber(num1, num2);

  res.status(result.status).json(result.data);
});
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
