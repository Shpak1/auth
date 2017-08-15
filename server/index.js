/**
 * Created by Сергей on 13.08.2017.
 */
let express = require('express');
bodyParser = require ('body-parser');
morgan = require('morgan');
http = require('http');
app = express();
router = require('./router');
mongoose = require('mongoose');


//DB Setup

mongoose.connect('mongodb://localhost:auth/auth');

//App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
router(app);

//Server Setup
const  port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listenint on port: ', port);