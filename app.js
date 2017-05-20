'use strict';

// ===== MODULES ===============================================================
import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import path from 'path';

// ===== ROUTES ================================================================
import index from './routes/index';
import webhook from './routes/webhook';

const app = express();

/* =============================================
   =           Basic Configuration             =
   ============================================= */

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* =============================================
   =                   Routes                  =
   ============================================= */

app.use('/', index);
app.use('/webhook', webhook);

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

export default app;
