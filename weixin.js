'use strict'

var config = require('./config');
var Wechat = require('./wechat/wechat');
var wechatApi = new Wechat(config.wechat);

exports.reply = function*(next) {
    var message = this.weixin;

    if(message.MsgType === 'event'){
        if(message.Event === 'subscribe'){
            if(message.EventKey){
                console.log('扫码进来：' + message.EventKey + '' + message.ticket)
            }
            this.body = '哈哈，你订阅了这个号\r\n' + ' 消息ID: '+ message.MsgId;

        }else if(message.Event === 'unsubscribe'){
            console.log('取消订阅');
            this.body = ''
        }else if(message.Event === 'LOCATION'){
            this.body = '位置为:  ' +  message.Latitude + '/' + message.Longtitude + '-' + message.Precision;
        }else if(message.Event === 'CLICK'){
            this.body = "您点击了菜单："+ message.EventKey;
        }else if(message.Event === 'VIEW'){
            this.body = "您点击了菜单中的链接："+ message.EventKey;
        }
        
    
    }else if(message.MsgType === 'text'){
        var content = message.Content;
        var reply = '额，你说的 ' + message.Content + '太复杂了';
        if(content === '1'){
            reply = [{
                title:'谁是个大傻妞',
                description:'大傻妞大傻妞大傻妞大傻妞',
                picUrl:'https://www.baidu.com/img/bd_logo1.png',
                url:'https://github.com'
            },{
                title:'你是个大傻妞',
                description:'大傻妞大傻妞大傻妞大傻妞',
                picUrl:'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/whfpf%3D180%2C140%2C50/sign=73392ef5ecfe9925cb593a1052956fe7/023b5bb5c9ea15ce7fc3d639ba003af33a87b2d4.jpg',
                url:'https://github.com'
            }]
        }else if(content === '2'){
            var data = yield wechatApi.uploadMaterial('image',__dirname+'/2.jpg');
            reply = {
                type:'image',
                mediaId:data.media_id
            }
        }else if(content === '222'){
            var data = yield wechatApi.uploadMaterial('image',__dirname+'/IMG_1354.JPG');
            reply = {
                type:'image',
                mediaId:data.media_id
            }
        }else if(content === '打呼噜'){
            var data = yield wechatApi.uploadMaterial('video',__dirname+'/IMG_1407.TRIM.mp4');
            reply = {
                type:'video',
                title:'大傻妞打呼噜',
                description:'我在打呼zzzzz,do not disturb me',
                mediaId:data.media_id
            }
        }else if(content === '今日读经'){
            var data = yield wechatApi.uploadMaterial('image',__dirname+'/2.jpg');
            reply = {
                type:'music',
                title:'读经',
                description:'每日读经',
                musicUrl:'http://mp3.jdjys.net:81/mp3/4英文赞美诗歌/06/Track05.mp3',
                thumbMediaId:data.media_id
            }
        }



        this.body = reply;
    }

    yield next;
}