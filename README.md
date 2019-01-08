# Chat Engine Event Status Plugin

Adds the ability of tracking each message into different stages: (sent, delivery and read)

### Quick Start

0. Have ChatEngine instantiated and connected, and have a channel you want to count unread messages on
```js
const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-key-here',
    subscribeKey: 'sub-key-here',
}, {
    endpoint: 'http://chatengine:server/',
    globalChannel: 'global-channel-name'
});

ChatEngine.connect('Username');
ChatEngine.on('$.ready', () => { ... });
```

1. Attach this plugin to the chat you want to
```js
const status = require('chat-engine-event-status');

chat.plugin(status({ event: 'message' }));
```

2. How to mark the messages as sent
```js
let sent = [];

//gets the tracking id of the new message sent

chat.on('$.eventStatus.sent', (payload) => {
    const { data } = payload;
    sent.push(data.id);
});
```

```js
//synchronizes the message received into the stream with the tracking id got from event $.eventStatus.sent

let messages = [];

chat.on('message', (payload) => {
    const index = this.sent.indexOf(payload.eventStatus.id);

    if (index >= 0) {
        payload.eventStatus.sent = true;
        sent.splice(index, 1);
    }

    messages.push(payload);
});
```

In this way you can display into the screen that the message was sent using a check mark or whatever UI strategy.

3. How to identify and mark a message as delivery
```js
chat.on('$.eventStatus.delivered', (payload) => {
    let message = messages.find(w => w.eventStatus.id === payload.data.id);

    if (message) {
        message.eventStatus.delivery = true;
    }
});
```

4. How to mark a message as read

**chat.eventStatus.read** function receives as payload the message which has been read from the other side,
in this point you can use different strategies to mark the message as read e.g. using the scroll down or when the list is
focused.

```js
chat.on('message', (payload) => {
    chat.eventStatus.read(payload);
});
```

5. How to know which ones and who have read the messages

```js
chat.on('$.eventStatus.read', (payload) => {
    let message = this.messages.find(w => w.eventStatus.id === payload.data.id);

    if (message) {
        message.eventStatus.read = true;
    }
});
```

Every payload returns field sender with which you can retrieve who user has notified the delivery or reading.

## Support

- If you **need help**, have a **general question** a **feature request** or to file a **bug**, contact <support@pubnub.com>
