'use strict'
var Koa = require('koa');
var sha1 = require('sha1');
var wechat = require('./wechat/g');
var config = {
    wechat:{
        appID: "wxe5170cac100b8e27",
        appSecret: "8e3b900c3a4ae2ec8eeb104341764fd1",
        token: 'ryantestasxxxxxtoke'
    }
};

var app = new Koa();

app.use(wechat(config.wechat));

app.listen(80);
console.log('listening : 80');
