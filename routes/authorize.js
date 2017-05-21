// ===== MODULES ===============================================================
import {Router} from 'express';
import uuid from 'uuid';


const router = Router();

// GET /authorize
router.get('/', (req, res) => {
  const accountLinkingToken = req.query.account_linking_token;
  const redirectURI = req.query.redirect_uri;

  const authCode = uuid();

  const redirectURISuccess = redirectURI + "&authorization_code=" + authCode;
  res.redirect(302, `${redirectURISuccess}`);
});

export default router;
