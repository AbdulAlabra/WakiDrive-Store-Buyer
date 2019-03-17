const ENV = require('dotenv');
ENV.config();

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMIAN ,
    databaseURL: process.env.DB_URL ,
    projectId: process.env.PROJECT_ID ,
    storageBucket: process.env.STORAGE_BUCKET ,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
}

module.exports = config;