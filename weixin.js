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
                title:'放松一下',
                description:'放松一下',
                musicUrl:'http://mp3.downs.cnfuyin.com/cdn/yuan-mp3/07%E5%85%B6%E4%BB%96/%E8%8D%92%E6%BC%A0%E7%94%98%E6%B3%89%EF%BC%88%E8%80%83%E9%97%A8%E5%A4%AB%E4%BA%BA%EF%BC%89%E6%AF%8F%E6%97%A5%E7%81%B5%E4%BF%AE%EF%BC%811%E6%9C%88-12%E6%9C%88%E5%85%A8/0116.mp3',
                hqMusicUrl:'http://mp3.downs.cnfuyin.com/cdn/yuan-mp3/07%E5%85%B6%E4%BB%96/%E8%8D%92%E6%BC%A0%E7%94%98%E6%B3%89%EF%BC%88%E8%80%83%E9%97%A8%E5%A4%AB%E4%BA%BA%EF%BC%89%E6%AF%8F%E6%97%A5%E7%81%B5%E4%BF%AE%EF%BC%811%E6%9C%88-12%E6%9C%88%E5%85%A8/0116.mp3',
                thumbMediaId:data.media_id
            }
        }



        this.body = reply;
    }

    yield next;
}