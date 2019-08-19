const express = require('express');
const bodyParser = require('body-parser');
const Smooch = require('smooch-core');
const smooch = new Smooch({
    keyId: 'app_5d237f90c15d720011fc7ca6',
    secret: 'Xty06UbJcK4xeWAPIWodItG4njn6lOdDI7NQdr-KU4rji7h9j5hS1vP0ws1qYeES32-q_C8_jkEW8aX5Ih7MDg',
    scope: 'app'
});

const app = express();
app.use(bodyParser.json());

app.post('/webhook', function(req, res) {
  // WEBHOOK HANDLER
  console.log('Webhook PAYLOAD:\n', JSON.stringify(req.body, null, 3));

  const appUserId = req.body.appUser._id;
  console.log('AppUser ID: ' + appUserId);

  res.send(200);
});

app.listen(8000, () => {
  console.log(`App listening on port 8000`);
});