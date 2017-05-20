import castArray from 'lodash/castArray';

import api from './api';


const messageToJSON = (recipientId, messagePayload) => {
  return {
    recipient: {
      id: recipientId
    },
    message: messagePayload
  }
}

const sendMessage = (recipientId, messagePayloads) => {
  const messagePayloadArray = castArray(messagePayloads)
    .map((messagePayload) => messageToJSON(recipientId, messagePayload));

    api.callMessagesAPI(messagePayloadArray);
}

const sendTextMessage = (recipientId, messageText) => {
  const messagePayload = {
    text: messageText
  }

  sendMessage(recipientId, messagePayload);
}

export default {
  sendMessage,
  sendTextMessage
};
