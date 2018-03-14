'use strict'



exports.reply = function*(next) {
    var message = this.weixin;

    if(message.MsgType === 'event'){
        if(message.Event === 'subscripe'){
            if(message.EventKey){
                console.log('扫码进来：' + message.EventKey + '' + message.ticket)
            }
            this.body = '哈哈，你订阅了这个号\r\n' + ' 消息ID: '+ message.MsgId;

        }else if(message.Event === 'unsubscripe'){
            console.log('取消订阅');
            this.body = ''
        }
    }

    yield next;
}