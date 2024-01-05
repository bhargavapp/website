import {handler} from './build/handler.js';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import 'dotenv/config'

const privateKey = fs.readFileSync(process.env.KEY_LOCATION, 'utf8');
const certificate = fs.readFileSync(process.env.CERT_LOCATION, 'utf8');
const credentials = {key: privateKey, cert: certificate};

const app = express();

//const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const IP = process.env.IP;
//const PORT = 80;
const SSLPORT = 443;

/*
httpServer.listen(PORT, IP, function () {
    console.log('HTTP Server is running on: http://%s:%s', IP, PORT);
});
*/

httpsServer.listen(SSLPORT, IP, function () {
    console.log('HTTPS Server is running on: https://%s:%s', IP, SSLPORT);
});

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
    res.end('ok');
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);