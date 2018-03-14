'use strict'
var path = require('path');
var util = require('./libs/util')

var wechat_file = path.join(__dirname,'wechat/config/wechat.txt')
var config = {
    wechat:{
        appID: "wxe5170cac100b8e27",
        appSecret: "8e3b900c3a4ae2ec8eeb104341764fd1",
        token: 'ryantestasxxxxxtoke',
        getAccessToken:function(){
           return util.readFileAsync(wechat_file,'utf8');
        },
        saveAccessToken:function(data){
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file,data);
        }
    }
};



module.exports = config;