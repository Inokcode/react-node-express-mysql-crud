const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(3006, () => {
  console.log('Runnig on port 3006');
});
