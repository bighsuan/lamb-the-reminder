var channelToken = '******';



// 對全體好友發送訊息
// doc: https://developers.line.biz/en/reference/messaging-api/#send-broadcast-message
function broadcast(channelToken, message) {
  var url = 'https://api.line.me/v2/bot/message/broadcast';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'messages': [{'type': 'text', 'text': message}]
    })
  };
  UrlFetchApp.fetch(url, opt);
}

// 發送訊息
function pushMessage(channelToken, message, usrId) {
  var url = 'https://api.line.me/v2/bot/message/push';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'to': usrId,
      'messages': [{'type': 'text', 'text': message}]
    })
  };
  UrlFetchApp.fetch(url, opt);
}

// 回覆訊息
function replyMessage(replyToken, message, channelToken) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{'type': 'text', 'text': message}]
    })
  };
  UrlFetchApp.fetch(url, opt);
}


// 單獨排程執行
// 中午1:10提醒吃藥
function sendMedicineNotification() {

  //判斷現在時間
  let now = Utilities.formatDate(new Date(), "GMT+8", "HH:mm");

  if(now === "13:10")
  {
    notificationList = [
      'B群',
      '吃B群',
      'B群的說',
      '今天吃B群了嗎'
    ]

    randomMessage = notificationList[(Math.random() * notificationList.length) | 0];

    broadcast(channelToken, randomMessage);
  }
}

// 加入好友時打招呼
function greet(event){
  //這裡只處理回覆個人
  let userId = event.source.userId;
  pushMessage(channelToken, '你好！這裡是中午提醒吃B群小助手!', userId);
}

// 使用者輸入"測試", 回復測試訊息
function testMessage(event){
  let messageText = event.message.text; // 使用者Message字串
  let replyToken = event.replyToken;    // 要回復訊息 replyToken
  let userId = event.source.userId;

  if(messageText == '測試')
    replyMessage(replyToken, `你好${userId}, 這是測試訊息喔`, channelToken);
}


// doPost是google app script的function
function doPost(e){
  var value = JSON.parse(e.postData.contents);
  try {
    var events = value.events;
    if (events != null) {
      for (var i in events) {
        let event = events[i];
        let type = event.type;

        switch (type) {
          // 加入好友回復
          case 'follow':
            greet(event);
            break;

          // 收到訊息回復
          case 'message':
            testMessage(event);
            break;

          default:
            break;
        }
      }
    }
  } catch(e) {
    console.log(e);
  }
}