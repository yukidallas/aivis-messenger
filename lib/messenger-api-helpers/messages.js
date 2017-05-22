// ===== MODULES ===============================================================
import config from 'config';


const SERVER_URL = (process.env.SERVER_URL) ?
  (process.env.SERVER_URL) :
  config.get('serverURL');

const welcomeMessage = {
  text: 'Hi! My name is Aivis\nI am a Facebook Messenger Bot.'
}

const welcomeSecondMessage = {
  attachment: {
    type: "template",
    payload: {
      template_type: "button",
      text: "I like to connect with your Facebook to make your profile faster.",
      buttons: [{
        type: "account_link",
        url: `${SERVER_URL}/authorize`
      }]
    }
  }
}

const welcomeAuthMessage = {
  attachment: {
    type: "template",
    payload: {
      template_type: "button",
      text: "Login with Facebook (Required)",
      buttons: [{
        type: "account_link",
        url: `${SERVER_URL}/authorize`
      }]
    }
  }
};

const tutorialMessages = {
  "authorized": {
    text: "Successfully connect with your Facebook profile!\nPlease tell me about yourself."
  },
  "first_name": {
    text: "What's your first name?"
  },
  "last_name": {
    text: "What's your last name?"
  }
};

export default {
  welcomeMessage,
  welcomeSecondMessage,
  welcomeAuthMessage,
  tutorialMessages
};
