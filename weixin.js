'use strict'



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
        }

        this.body = reply;
    }

    yield next;
}