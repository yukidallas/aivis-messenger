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

export default {
  welcomeMessage,
  welcomeSecondMessage
};
