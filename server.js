'use strict';

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const SmoochCore = require('smooch-core');

// Config
const PORT = 8000;
const KEY_ID = 'app_5cec23058178ff001085d4ad';
const SECRET = 'na8W6k9PoutBoS1nNph_WIP4rb2eRGS7OnKYoAbL8tavqZGMLFHsQkCWAdhYQ9SMyr4oh1TVVzlZu4VVTmjiRw';

/*const smooch = new Smooch({
    keyId: KEY_ID,
    secret: SECRET,
    scope: 'app'
});*/

const smooch = new SmoochCore({
    keyId: 'act_5d2376c637058f001051cd51',
    secret: '2ndFndazHJqQdnTidBTTNoU7oCqh-M-DTgZaNiu72epPs5klltnrQs8E2pKGr-TucSmO4idHg-Y_uxuR0PCZKQ',
    scope: 'account'
  });

  //console.log(smooch);
  
/*  smooch.apps.create({
    name: 'Smooch Demo'
  }).then((response) => {
    console.log('App ID: ' + response.app._id);
  }); */

  smooch.integrations.create('5d23779289e3cb000f6bfc61', {
    type: 'web',
    businessName: 'Smooch Interactive Walkthrough',
    brandColor: '00ff00'
    }).then((response) => {
    console.log("integration ID: " + response.integration._id)
  });

  smooch.webhooks.create('5d23779289e3cb000f6bfc61', {
    target: 'http://e5d73672.ngrok.io/webhook',
    triggers: ['message:appUser']
  }).then((response) => {
    console.log('Created a webhook with ID: ' + response.webhook._id);
  });

// Server https://expressjs.com/en/guide/routing.html
const app = express();

app.use(bodyParser.json());
console.log('Port: ', PORT);
// Expose /messages endpoint to capture webhooks https://docs.smooch.io/rest/#webhooks-payload
app.post('/webhook', function(req, res) {
  console.log('Webhook PAYLOAD:\n', JSON.stringify(req.body, null, 4));
  res.send({ express: JSON.stringify(req.body, null, 4) });

  const appUserId = req.body.appUser._id;
  // Call REST API to send message https://docs.smooch.io/rest/#post-message
  if (req.body.trigger === 'message:appUser') {
      smooch.appUsers.sendMessage(appUserId, {
          type: 'text',
          text: 'Live long and prosper',
          role: 'appMaker'
      })
          .then((response) => {
              console.log('API RESPONSE:\n', response);
              res.end();
          })
          .catch((err) => {
              console.log('API ERROR:\n', err);
              res.end();
          });
  }
});

// Listen on port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});