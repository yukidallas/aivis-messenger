// ===== MODULES ===============================================================
import {Router} from 'express';

import receiveApi from '../lib/messenger-api-helpers/receive';


const router = Router();

const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN) ?
  (process.env.MESSENGER_VALIDATION_TOKEN) :
  config.get('validationToken');

// GET /webhook
router.get('/', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

// POST /webhook
router.post('/', (req, res) => {
  const data = req.body;

  if (data.object == 'page') {
    data.entry.forEach((pageEntry) => {
      const pageId = pageEntry.id;

      pageEntry.messaging.forEach((messagingEvent) => {
        if (messagingEvent.message) {
          receiveApi.handleReceiveMessage(messagingEvent);
        } else if (messagingEvent.postback) {
          receiveApi.handleReceivePostback(messagingEvent);
        } else if (messagingEvent.account_linking) {
          receiveApi.handleReceiveAccountLink(messagingEvent);
        }
      });
    });

    res.sendStatus(200);
  }
});

export default router;
