'use strict'
var Koa = require('koa');
var sha1 = require('sha1');
var config = {
    wechat:{
        appID: "wxe5170cac100b8e27",
        appSecret: "8e3b900c3a4ae2ec8eeb104341764fd1",
        token: 'ryantestasxxxxxtoke'
    }
};

var app = new Koa();

app.use(function *(next){
    console.log(this.query);

    var token = config.wechat.token;
    var signature = this.query.signature;
    var nonce = this.query.nonce;
    var timestamp = this.query.timestamp;
    var echostr = this.query.echostr;
    var str = [token,timestamp,nonce].sort().join('');
    var sha = sha1(str);

    if(sha === signature) {
        this.body = echostr + '';
    }else {
        this.body = 'wrong'
    }

})

app.listen(80);
console.log('listening : 80');
