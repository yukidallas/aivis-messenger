// ===== MODULES ===============================================================
import config from 'config';
import request from 'request';

import models from '../../models';
import sendApi from '../messenger-api-helpers/send';


const User = models.User;

const showProfileThread = (recipientId) => {
  User.findOne({where: {messenger_id: recipientId} }).then((user) => {
    if (user && user.first_name && user.last_name) {
      sendApi.sendTextMessage(recipientId, `${user.first_name} ${user.last_name}.`);
    }
  });
};

export default {
  showProfileThread
};
