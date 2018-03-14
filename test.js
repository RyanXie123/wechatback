'use strict'
var Koa = require('koa');
var sha1 = require('sha1');
var wechat = require('./wechat/g');
var path = require('path');
var util = require('./libs/util')

var wechat_file = path.join(__dirname,'/wechat/config/wechat.txt')
var config = {
    wechat:{
        appID: "wxe5170cac100b8e27",
        appSecret: "8e3b900c3a4ae2ec8eeb104341764fd1",
        token: 'ryantestasxxxxxtoke',
        getAccessToken:function(){
           return util.readFileAsync(wechat_file)
        },
        saveAccessToken:function(data){
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file)
        }
    }
};

var app = new Koa();

app.use(wechat(config.wechat));

app.listen(80);
console.log('listening : 80');
