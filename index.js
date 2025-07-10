const express = require('express');
const { middleware, Client } = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new Client(config);
const app = express();

app.post('/webhook', middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') return Promise.resolve();

  if (event.message.text === '查點數') {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: '你目前有 120 點紅利（測試用）',
    });
  }
  return Promise.resolve();
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
