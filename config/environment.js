require('dotenv').config();
// Logging setting
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname , '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('access.log' , {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: "./assets",
    session_cookie_key: "blahsomething",
    db: 'mongodb://bhavyatiwari917:RZLuXvck0tTu1BgF@ac-w5rl1nr-shard-00-00.3eymiaz.mongodb.net:27017,ac-w5rl1nr-shard-00-01.3eymiaz.mongodb.net:27017,ac-w5rl1nr-shard-00-02.3eymiaz.mongodb.net:27017/codeial-node-app?ssl=true&replicaSet=atlas-wxt3nr-shard-0&authSource=admin&retryWrites=true&w=majority',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'bhavyatiwari917@gmail.com',
            pass: 'voernafvxjchqiwy'
        }
    },
    google_client_id: "401895186341-4o74e39rqteel8otn8nch7n3dna4q2mt.apps.googleusercontent.com",
    google_client_Secret: "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",
    google_call_back_URL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }

}



const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: process.env.CODEIAL_SERVICE    ,
        host: process.env.CODEIAL_HOST  ,
        port: process.env.CODEIAL_PORT,
        secure: process.env.CODEIAL_SECURE,
        auth: {
            user: process.env.CODEIAL_USER,
            pass: process.env.CODEIAL_PASS
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_URL: process.env.CODEIAL_CALL_BACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports =eval(process.env.CODEIAL_ENVIRONMENT == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT));