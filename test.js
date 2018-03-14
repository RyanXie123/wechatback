'use strict'
var Koa = require('koa');

var path = require('path');
var wechat = require('./wechat/g');
var config = require('./config');
var weixin = require('./weixin');
var util = require('./libs/util');

var app = new Koa();

app.use(wechat(config.wechat,weixin.reply));

app.listen(80);
console.log('listening : 80');
