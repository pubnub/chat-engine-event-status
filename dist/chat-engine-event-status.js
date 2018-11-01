(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-event-status",
  "version": "0.0.3",
  "main": "src/plugin.js",
  "dependencies": {
    "chat-engine": "^0.5.2"
  },
  "devDependencies": {
    "chai": "^4.1.2",
    "mocha": "^4.0.1"
  }
}

},{}],3:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni4xMS4wL2xpYi9ub2RlX21vZHVsZXMvY2hhdC1lbmdpbmUtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBwYWNrYWdlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG4gICAgd2luZG93LkNoYXRFbmdpbmVDb3JlLnBsdWdpbltwYWNrYWdlLm5hbWVdID0gcmVxdWlyZSgnLi4vc3JjL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcImF1dGhvclwiOiBcIklhbiBKZW5uaW5nc1wiLFxuICBcIm5hbWVcIjogXCJjaGF0LWVuZ2luZS1ldmVudC1zdGF0dXNcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjNcIixcbiAgXCJtYWluXCI6IFwic3JjL3BsdWdpbi5qc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjaGF0LWVuZ2luZVwiOiBcIl4wLjUuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCJeNC4xLjJcIixcbiAgICBcIm1vY2hhXCI6IFwiXjQuMC4xXCJcbiAgfVxufVxuIiwiLyoqXG4gKlxuICogQG1vZHVsZSBjaGF0LWVuZ2luZS1ldmVudC1zdGF0dXNcbiAqIEByZXF1aXJlcyB7QGxpbmsgQ2hhdEVuZ2luZX1cbiAqL1xuXG4vKipcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnID0ge30pID0+IHtcblxuICBsZXQgbGlzdCA9IHt9O1xuXG4gIGNsYXNzIGV4dGVuc2lvbiB7XG5cbiAgICBlbmFibGUoZXZlbnQpIHtcbiAgICAgIHRoaXMuZXZlbnRzLnB1c2goZXZlbnQpO1xuICAgIH1cblxuICAgIHJlYWQocGF5bG9hZCkge1xuICAgICAgaWYgKHBheWxvYWQuc2VuZGVyLm5hbWUgIT09ICdNZScpIHtcbiAgICAgICAgcGF5bG9hZC5jaGF0LmVtaXQoJyQuZXZlbnRTdGF0dXMucmVhZCcsIHsgaWQ6IHBheWxvYWQuZXZlbnRTdGF0dXMuaWQgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0KHBheWxvYWQpIHtcbiAgICAgIHJldHVybiBsaXN0W3BheWxvYWQuZGF0YS5pZF0gfHwgZmFsc2U7XG4gICAgfVxuXG4gIH07XG5cbiAgbGV0IHB1Ymxpc2hlZCA9IChwYXlsb2FkLCBuZXh0KSA9PiB7XG4gICAgaWYocGF5bG9hZC5ldmVudFN0YXR1cyAmJiBwYXlsb2FkLmV2ZW50ID09PSBjb25maWcuZXZlbnQpIHtcbiAgICAgIHBheWxvYWQuY2hhdC50cmlnZ2VyKCckLmV2ZW50U3RhdHVzLnNlbnQnLCB7IGRhdGE6IHBheWxvYWQuZXZlbnRTdGF0dXMgfSk7XG4gICAgfVxuXG4gICAgbmV4dChudWxsLCBwYXlsb2FkKTtcblxuICB9XG5cbiAgbGV0IGNyZWF0ZWQgPSAocGF5bG9hZCwgbmV4dCkgPT4ge1xuICAgIGlmKHR5cGVvZiBwYXlsb2FkID09PSBcIm9iamVjdFwiICYmICFwYXlsb2FkLmV2ZW50U3RhdHVzICYmIHBheWxvYWQuZXZlbnQgPT09IGNvbmZpZy5ldmVudCkge1xuICAgICAgLy8gY3JlYXRlIGEgY3J1ZGUgSUQgZm9yIHRoaXMgbWVzc2FnZVxuICAgICAgbGV0IGlkID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCk7XG5cbiAgICAgIGxpc3RbaWRdID0gcGF5bG9hZDtcblxuICAgICAgcGF5bG9hZC5ldmVudFN0YXR1cyA9IHsgaWQgfTtcblxuICAgICAgcGF5bG9hZC5jaGF0LnRyaWdnZXIoJyQuZXZlbnRTdGF0dXMuY3JlYXRlZCcsIHsgZGF0YTogeyBpZCB9IH0pO1xuICAgIH1cblxuICAgIG5leHQobnVsbCwgcGF5bG9hZCk7XG4gIH07XG5cbiAgbGV0IGRlbGl2ZXJlZCA9IChwYXlsb2FkLCBuZXh0KSA9PiB7XG4gICAgaWYocGF5bG9hZCAmJiBwYXlsb2FkLmV2ZW50U3RhdHVzICYmIHBheWxvYWQuZXZlbnRTdGF0dXMuaWQgJiYgcGF5bG9hZC5zZW5kZXIubmFtZSAhPT0gJ01lJykge1xuICAgICAgcGF5bG9hZC5jaGF0LmVtaXQoJyQuZXZlbnRTdGF0dXMuZGVsaXZlcmVkJywgeyBpZDogcGF5bG9hZC5ldmVudFN0YXR1cy5pZCB9KTtcbiAgICB9XG5cbiAgICBuZXh0KG51bGwsIHBheWxvYWQpO1xuICB9O1xuXG4gIGxldCBwbHVnID0ge1xuICAgIG5hbWVzcGFjZTogJ2V2ZW50U3RhdHVzJyxcbiAgICBleHRlbmRzOiB7XG4gICAgICBDaGF0OiBleHRlbnNpb25cbiAgICB9LFxuICAgIG1pZGRsZXdhcmU6IHtcbiAgICAgIGVtaXQ6IHtcbiAgICAgICAgJyonOiBjcmVhdGVkXG4gICAgICB9LFxuICAgICAgb246IHtcbiAgICAgICAgJyQuZW1pdHRlZCc6IHB1Ymxpc2hlZCxcbiAgICAgICAgW2NvbmZpZy5ldmVudF06IGRlbGl2ZXJlZFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsdWcubWlkZGxld2FyZS5lbWl0W2NvbmZpZy5ldmVudF0gPSBjcmVhdGVkO1xuXG4gIHJldHVybiBwbHVnO1xufVxuIl19
