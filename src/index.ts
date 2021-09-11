import { app } from './server';
import * as dontenv from 'dotenv';
import * as database from './config/database';


dontenv.config();
const port = process.env.SERVER_PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

database.default.sync({
    alter: !isProduction,
});

app.listen(port);
