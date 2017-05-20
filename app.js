'use strict';

import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import path from 'path';

import receiveApi from './lib/messenger-api-helpers/receive';


const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN) ?
  (process.env.MESSENGER_VALIDATION_TOKEN) :
  config.get('validationToken');


app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  const data = req.body;

  if (data.object == 'page') {
    data.entry.forEach((pageEntry) => {
      const pageId = pageEntry.id;

      pageEntry.messaging.forEach((messagingEvent) => {
        if (messagingEvent.message) {
          receiveApi.handleReceiveMessage(messagingEvent);
        }
      });
    });

    res.sendStatus(200);
  }
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

export default app;

