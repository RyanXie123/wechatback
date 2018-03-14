'use strict'
var Koa = require('koa');
var sha1 = require('sha1');
var config = {
    wechat:{

    }
};

var app = new Koa();

app.use(function *(next){
    console.log(this.query);
})

app.listen(80);
console.log('listening : 80');
