# Lamb the Reminder
(linebot留檔 & 未來也許擴充)

小羊提醒：一個 linebot 鬧鐘的 idea

<br/>

## 起因
需要有人每天中午傳 line 提醒我和我媽吃藥，所以寫了一個 Linebot。

<br/>

## 和鬧鐘的差別
* 鬧鐘響了就要關掉，line 訊息通知可以留著
* 可以一次設定傳給多人，不用每個人手機都設鬧鐘
* 更貼近原本的使用流程


<br/>

## 目前內容
每天下午 1:10 會傳一次訊息給所有加入的好友，提醒吃藥。

<br/>

## 使用技術
* google app script(GAS) 跑 webhook 給 linebot 使用
* 同樣是 GAS 的排程，在每天下午 1:10 打 line 的 broadcast api 發送訊息。


<br/>

## TODO
* 從 line 聊天室設定時間 & 訊息
* 查看目前所有提醒的按鈕
* GAS 有時候當掉排程會沒跑到，需要做自動回復


