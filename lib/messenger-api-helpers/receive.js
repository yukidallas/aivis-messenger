import sendApi from './send';


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
}


export default {
  handleReceiveMessage
};
