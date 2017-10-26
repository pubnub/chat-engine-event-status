/**
* Blocks all events from a {@link User} from being emitted.
* @module chat-engine-mute-user
* @requires {@link ChatEngine}
*/

/**
* Bind the plugin to a chat
* ```js
* chat = new CE.Chat('bad-chat');
* chat.plugin(muter());
* ```
*
* Mute a specific user
* ```js
* let user = new ChatEngine.user('bad-guy');
* chat.muteUser.mute(user);
* ```
*
* Chat will no longer receive any messages from "bad-guy"
*
* @function
*/
module.exports = (config = {}) => {

    class extension {

        read(payload) {
            payload.chat.emit('$.eventStatus.read', payload);
        }

    };

    let published = (payload, next) => {

        if(payload.message && payload.message.eventStatus && payload.message.eventStatus.id) {
            payload.chat.trigger('$.eventStatus.sent', payload.message);
        }

        next(null, payload);

    }

    let created = (payload, next) => {

        if(typeof payload == "object") {

            // create a crude ID for this message
            let id = new Date().getTime() + Math.floor(Math.random() * 10000);

            payload.eventStatus = id;
            payload.chat.trigger('$.eventStatus.created', payload);

        } else {
            console.error('Plugin requires message to be object');
        }

        next(null, payload);

    };

    let delivered = (payload, next) => {

        if(payload.event !== '$.eventStatus.delivered' && payload.message.eventStatus && payload.message.eventStatus.id) {
            payload.chat.emit('$.eventStatus.delivered', payload);
        }

        next(null, payload);

    };

    return {
        namespace: 'eventStatus',
        extends: {
            Chat: extension
        },
        middleware: {
            emit: {
                '*': created
            },
            on: {
                '$.publish.success', published
                '*': delivered
            }
        }
    }

}
