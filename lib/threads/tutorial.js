// ===== MODULES ===============================================================
import messages from '../messenger-api-helpers/messages';
import models from '../../models';
import sendApi from '../messenger-api-helpers/send';


const User = models.User;


const accountLinkedThread = (recipientId) => {
  sendApi.sendMessage(
    recipientId,
    [
      messages.tutorialMessages["authorized"],
      messages.tutorialMessages["first_name"]
    ]
  );
};

const initialProfileConfirmationButton = (fullName) => {
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: `Your name is ${fullName}, right?`,
        buttons: [{
          type: "postback",
          title: "Yes",
          payload: "INITIAL_PROFILE_CONFIRMATION_YES"
        }, {
          type: "postback",
          title: "No",
          payload: "INITIAL_PROFILE_CONFIRMATION_NO"
        }]
      }
    }
  }
};

const initialProfileThread = (user, messageText) => {
  const regex = /^[a-zA-Z\-]{2,30}$/;
  if (!regex.test(messageText)) {
    const errorMessages = [];
    errorMessages.push({text: "Sorry, I can't understand."})
    if (user.current_thread === "authorized") {
      errorMessages.push(messages.tutorialMessages["first_name"]);
    } else if (user.current_thread === "first_name") {
      errorMessages.push(messages.tutorialMessages["last_name"]);
    }
    sendApi.sendMessage(user.messenger_id, errorMessages);

    return;
  }

  if (user.current_thread === "authorized") {
    user.current_thread = "first_name";
    user.first_name = messageText;
    user.save();
    sendApi.sendMessage(user.messenger_id, messages.tutorialMessages["last_name"]);
  } else if (user.current_thread === "first_name") {
    user.current_thread = "last_name";
    user.last_name = messageText;
    user.save();
    sendApi.sendMessage(
      user.messenger_id,
      initialProfileConfirmationButton(`${user.first_name} ${user.last_name}`)
    );
  } else if (user.current_thread === "last_name") {
    if (messageText && messageText === "Yes") {
      initialProfileConfirmedThread(user.messenger_id);
    } else if (messageText && messageText === "No") {
      initialProfileResetThread(user.messenger_id);
    } else {
      sendApi.sendMessage(
        user.messenger_id,
        [
          {text: "Sorry, I cant understand."},
          initialProfileConfirmationButton(`${user.first_name} ${user.last_name}`)
        ]
      )
    }
  }
};

const initialProfileConfirmedThread = (recipientId) => {
  User.findOne({where : {messenger_id: recipientId} }).then((user) => {
    user.current_thread = "activated";
    user.save();
    sendApi.sendTextMessage(recipientId, `Nice to meet you ${user.first_name}`);
  });
};

const initialProfileResetThread = (recipientId) => {
  User.findOne({where : {messenger_id: recipientId} }).then((user) => {
    user.current_thread = "authorized";
    user.first_name = null;
    user.last_name = null;
    user.save();
  });
  sendApi.sendMessage(recipientId, messages.tutorialMessages["first_name"]);
};

export default {
  accountLinkedThread,
  initialProfileThread,
  initialProfileConfirmedThread,
  initialProfileResetThread
};
