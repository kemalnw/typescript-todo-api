import * as dontenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';


interface DBConfig {
    default: string,
    connections: {
        [name:string]: object
    }
}

dontenv.config();
const databaseConfig: DBConfig = {
    default: process.env.DB_CONNECTION || 'mysql',
    connections: {
        mysql: {
            host: process.env.DB_HOST || '',
            dialect: 'mysql',
            port: process.env.DB_PORT || '',
            database: process.env.DB_DATABASE || '',
            username: process.env.DB_USERNAME || '',
            password: process.env.DB_PASSWORD || ''
        }
    }
}

const driver = databaseConfig.connections[databaseConfig.default];

Object.assign(driver, {
    repositoryMode: true,
    models: [__dirname + './../models/*.model.ts']
});

export default new Sequelize(driver);
