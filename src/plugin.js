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

    let events = {};

    let isNotPluginEvent = (payload) => {
        return true;
    }

    class extension {

        read(payload) {
            payload.chat.emit('$.eventStatus.read', payload.data);
        }

        get(payload) {
            return events[payload.data.id] || false;
        }

    };

    let published = (payload, next) => {

        if(payload.eventStatus) {
            payload.chat.trigger('$.eventStatus.sent', {data: payload.eventStatus});
        }

        next(null, payload);

    }

    let created = (payload, next) => {

        if(typeof payload == "object" && isNotPluginEvent(payload)) {

            // create a crude ID for this message
            let id = new Date().getTime() + Math.floor(Math.random() * 10000);

            events[id] = payload;

            payload.eventStatus = {id};

            payload.chat.trigger('$.eventStatus.created', {data: {id}});

        }

        next(null, payload);

    };

    let delivered = (payload, next) => {

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
