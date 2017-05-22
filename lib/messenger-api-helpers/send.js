// ===== MODULES ===============================================================
import castArray from 'lodash/castArray';

import api from './api';
import messages from './messages';


const messageToJSON = (recipientId, messagePayload) => {
  return {
    recipient: {
      id: recipientId
    },
    message: messagePayload
  }
};

const sendMessage = (recipientId, messagePayloads) => {
  const messagePayloadArray = castArray(messagePayloads)
    .map((messagePayload) => messageToJSON(recipientId, messagePayload));

    api.callMessagesAPI(messagePayloadArray);
};

const sendTextMessage = (recipientId, messageText) => {
  const messagePayload = {
    text: messageText
  }

  sendMessage(recipientId, messagePayload);
};

const sendWelcomeMessage = (recipientId) => {
  sendMessage(
    recipientId,
    [
      messages.welcomeMessage,
      messages.welcomeSecondMessage
    ]
  );
};

const sendWelcomeAuthMessage = (recipientId) => {
  sendMessage(recipientId, messages.sendWelcomeAuthMessage)
};

export default {
  sendMessage,
  sendTextMessage,
  sendWelcomeMessage,
  sendWelcomeAuthMessage
};
