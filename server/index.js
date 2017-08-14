/**
 * Created by Сергей on 13.08.2017.
 */
const express = require('express');
const bodyParser = require ('body-parser');
const morgan = require('morgan');
const http = require('http');
const app = express();
const router = require('./router');


//App Setup
app.use(morgan('combine'));
app.use(bodyParser.json({type:'*/*'}));
router(app);


//Server Setup
const  port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listenint on port: ', port)