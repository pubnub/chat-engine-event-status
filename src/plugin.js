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

  let list = {};

  class extension {

    enable(event) {
      this.events.push(event);
    }

    read(payload) {
      if (payload.sender.name !== 'Me') {
        payload.chat.emit('$.eventStatus.read', { id: payload.eventStatus.id });
      }
    }

    get(payload) {
      return list[payload.data.id] || false;
    }

  };

  let published = (payload, next) => {
    if(payload.eventStatus && payload.event === config.event) {
      payload.chat.trigger('$.eventStatus.sent', { data: payload.eventStatus });
    }

    next(null, payload);

  }

  let created = (payload, next) => {
    if(typeof payload === "object" && !payload.eventStatus && payload.event === config.event) {
      // create a crude ID for this message
      let id = new Date().getTime() + Math.floor(Math.random() * 10000);

      list[id] = payload;

      payload.eventStatus = { id };

      payload.chat.trigger('$.eventStatus.created', { data: { id } });
    }

    next(null, payload);
  };

  let delivered = (payload, next) => {
    if(payload && payload.eventStatus && payload.eventStatus.id && payload.sender.name !== 'Me') {
      payload.chat.emit('$.eventStatus.delivered', { id: payload.eventStatus.id });
    }

    next(null, payload);
  };

  let plug = {
    namespace: 'eventStatus',
    extends: {
      Chat: extension
    },
    middleware: {
      emit: {
        '*': created
      },
      on: {
        '$.emitted': published,
        [config.event]: delivered
      }
    }
  }

  plug.middleware.emit[config.event] = created;

  return plug;
}
