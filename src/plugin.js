/**
*
* @module chat-engine-event-status
* @requires {@link ChatEngine}
*/

/**
*
* @function
*/
module.exports = (config = {}) => {

    let isNotPluginEvent = (payload) => {
        return true;
    }

    class extension {

        read(payload) {
            payload.chat.emit('$.eventStatus.read', payload);
        }

        getMessage(packet, callback) {

            let eventMatch = (event) => {

                let middleware = {};
                middleware[packet.event] = (payload, next) => {

                    let matches = payload && payload.eventStatus && payload.eventStatus.id === packet.id;
                    next(!matches, payload);

                }

                return middleware;

            };

            payload.chat.search({
                event: payload.event,
                limit: 1
            }).on(payload.event, (event) => {
                console.log('!!!!!!!!!!!!!!!!!!!!!!!')
                console.log(event);
            });
        }

    };

    let published = (payload, next) => {

        console.log(payload.eventStatus)

        if(payload.eventStatus) {
            payload.chat.trigger('$.eventStatus.sent', payload.eventStatus);
        }

        next(null, payload);

    }

    let created = (payload, next) => {

        if(typeof payload == "object" && isNotPluginEvent(payload)) {

            // create a crude ID for this message
            let id = new Date().getTime() + Math.floor(Math.random() * 10000);

            payload.eventStatus = {id};

            payload.chat.trigger('$.eventStatus.created', {id});

        }

        next(null, payload);

    };

    let delivered = (payload, next) => {

        console.log(payload.eventStatus)

        if(isNotPluginEvent(payload)
            && payload
            && payload.eventStatus
            && payload.eventStatus.id) {

            payload.chat.emit('$.eventStatus.delivered', {id: payload.eventStatus.id});

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
                'test-message': created
            },
            on: {
                '$.publish.success': published,
                'test-message': delivered
            }
        }
    }

}
