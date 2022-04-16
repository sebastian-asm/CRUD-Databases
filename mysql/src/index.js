import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import * as dotenv from '@tinyhttp/dotenv';

import { json } from 'milliparsec';

import { appConfig } from './config/index.js';
import createInitTable from './db/createInitTable.js';
import router from './router/index.js';

const app = new App(appConfig);

dotenv.config();
app.use(logger());
app.use(json());

createInitTable();
router(app);

app.listen(process.env.PORT, () =>
  console.log('Server on port:', process.env.PORT)
);
