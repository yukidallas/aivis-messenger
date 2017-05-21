// ===== MODULES ===============================================================
import {Router} from 'express';


const router = Router();

// GET /
router.get('/', (req, res) => {
  res.render('index');
});

export default router;
