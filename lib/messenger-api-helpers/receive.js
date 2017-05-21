// ===== MODULES ===============================================================
import config from 'config';
import request from 'request';

import sendApi from './send';


const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
  (process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
  config.get('pageAccessToken');

const handleReceiveAccountLink = (event) => {
  const senderId = event.sender.id;

  const status = event.account_linking.status;
  const authCode = event.account_linking.authorization_code;

  console.log('Received account link event with for user %d with status %s ' +
    'and auth code %s ', senderId, status, authCode);
};

const handleReceiveMessage = (event) => {
  const senderId = event.sender.id;
  const recipientId = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderId, recipientId, timeOfMessage);
  console.log(JSON.stringify(message));

  const isEcho = message.is_echo;

  const messageText = message.text;

  if (isEcho) {
    return;
  }

  if (messageText === 'ping') {
    sendApi.sendTextMessage(senderId, "pong!");
  }
};

const handleReceivePostback = (event) => {
  const senderId = event.sender.id;
  const recipientId = event.recipient.id;
  const timeOfPostback = event.timestamp;
  const payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " +
    "at %d", senderId, recipientId, payload, timeOfPostback);

  switch (payload) {
  case 'GET_STARTED':
    sendApi.sendWelcomeMessage(senderId);
    break;
  default:
    console.error(`Unknown Postback called: ${payload}`);
    break;
  }
};

export default {
  handleReceiveAccountLink,
  handleReceiveMessage,
  handleReceivePostback
};
