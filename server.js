'use strict';

var express = require('express');
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
var routes = require('./app/routes/index.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var identicon = require('identicon-github');
var fmt = require('util').format;
mongo.connect('mongodb://localhost:27017/clementinejs', function (err, db) {

   if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB on port 27017.');
   }

   app.use(bodyParser.urlencoded({extended:false}));
   app.use(bodyParser.json());
   app.use('/public', express.static(process.cwd() + '/public'));
   app.use('/js', express.static(process.cwd() + '/app/js'));
   routes(app, db, bcrypt, jwt,request,identicon,fmt);
   app.all('/*',function(req,res){
     console.log('redirecting something')
     res.sendFile(process.cwd()+'/public/index.html');
   })
   app.listen(process.env.PORT || 3000, function () {
      console.log('Node.js listening on port 3000...');
   });

});
