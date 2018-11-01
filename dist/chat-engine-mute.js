(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-mute",
  "version": "0.0.1",
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
            payload.chat.emit('$.eventStatus.read', payload.data);
        }

        get(payload) {
            return list[payload.data.id] || false;
        }

    };

    let published = (payload, next) => {

        if(payload.eventStatus && payload.event == config.event) {
            payload.chat.trigger('$.eventStatus.sent', {data: payload.eventStatus});
        }

        next(null, payload);

    }

    let created = (payload, next) => {

        if(typeof payload == "object") {

            // create a crude ID for this message
            let id = new Date().getTime() + Math.floor(Math.random() * 10000);

            list[id] = payload;

            payload.eventStatus = {id};

            payload.chat.trigger('$.eventStatus.created', {data: {id}});

        }

        next(null, payload);

    };

    let delivered = (payload, next) => {

        if(payload
            && payload.eventStatus
            && payload.eventStatus.id) {

            payload.chat.emit('$.eventStatus.delivered', {id: payload.eventStatus.id});

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
                '$.publish.success': published,
                '*': delivered
            }
        }
    }

    plug.middleware.emit[config.event] = created;
    plug.middleware.on[config.event] = delivered;

    return plug;
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni4xMS4wL2xpYi9ub2RlX21vZHVsZXMvY2hhdC1lbmdpbmUtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHBhY2thZ2UgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcbiAgICB3aW5kb3cuQ2hhdEVuZ2luZUNvcmUucGx1Z2luW3BhY2thZ2UubmFtZV0gPSByZXF1aXJlKCcuLi9zcmMvcGx1Z2luLmpzJyk7XG5cbn0pKCk7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiYXV0aG9yXCI6IFwiSWFuIEplbm5pbmdzXCIsXG4gIFwibmFtZVwiOiBcImNoYXQtZW5naW5lLW11dGVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJtYWluXCI6IFwic3JjL3BsdWdpbi5qc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjaGF0LWVuZ2luZVwiOiBcIl4wLjUuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCJeNC4xLjJcIixcbiAgICBcIm1vY2hhXCI6IFwiXjQuMC4xXCJcbiAgfVxufVxuIiwiLyoqXG4qXG4qIEBtb2R1bGUgY2hhdC1lbmdpbmUtZXZlbnQtc3RhdHVzXG4qIEByZXF1aXJlcyB7QGxpbmsgQ2hhdEVuZ2luZX1cbiovXG5cbi8qKlxuKlxuKiBAZnVuY3Rpb25cbiovXG5tb2R1bGUuZXhwb3J0cyA9IChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgbGV0IGxpc3QgPSB7fTtcblxuICAgIGNsYXNzIGV4dGVuc2lvbiB7XG5cbiAgICAgICAgZW5hYmxlKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlYWQocGF5bG9hZCkge1xuICAgICAgICAgICAgcGF5bG9hZC5jaGF0LmVtaXQoJyQuZXZlbnRTdGF0dXMucmVhZCcsIHBheWxvYWQuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQocGF5bG9hZCkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RbcGF5bG9hZC5kYXRhLmlkXSB8fCBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGxldCBwdWJsaXNoZWQgPSAocGF5bG9hZCwgbmV4dCkgPT4ge1xuXG4gICAgICAgIGlmKHBheWxvYWQuZXZlbnRTdGF0dXMgJiYgcGF5bG9hZC5ldmVudCA9PSBjb25maWcuZXZlbnQpIHtcbiAgICAgICAgICAgIHBheWxvYWQuY2hhdC50cmlnZ2VyKCckLmV2ZW50U3RhdHVzLnNlbnQnLCB7ZGF0YTogcGF5bG9hZC5ldmVudFN0YXR1c30pO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV4dChudWxsLCBwYXlsb2FkKTtcblxuICAgIH1cblxuICAgIGxldCBjcmVhdGVkID0gKHBheWxvYWQsIG5leHQpID0+IHtcblxuICAgICAgICBpZih0eXBlb2YgcGF5bG9hZCA9PSBcIm9iamVjdFwiKSB7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIGNydWRlIElEIGZvciB0aGlzIG1lc3NhZ2VcbiAgICAgICAgICAgIGxldCBpZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApO1xuXG4gICAgICAgICAgICBsaXN0W2lkXSA9IHBheWxvYWQ7XG5cbiAgICAgICAgICAgIHBheWxvYWQuZXZlbnRTdGF0dXMgPSB7aWR9O1xuXG4gICAgICAgICAgICBwYXlsb2FkLmNoYXQudHJpZ2dlcignJC5ldmVudFN0YXR1cy5jcmVhdGVkJywge2RhdGE6IHtpZH19KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgbmV4dChudWxsLCBwYXlsb2FkKTtcblxuICAgIH07XG5cbiAgICBsZXQgZGVsaXZlcmVkID0gKHBheWxvYWQsIG5leHQpID0+IHtcblxuICAgICAgICBpZihwYXlsb2FkXG4gICAgICAgICAgICAmJiBwYXlsb2FkLmV2ZW50U3RhdHVzXG4gICAgICAgICAgICAmJiBwYXlsb2FkLmV2ZW50U3RhdHVzLmlkKSB7XG5cbiAgICAgICAgICAgIHBheWxvYWQuY2hhdC5lbWl0KCckLmV2ZW50U3RhdHVzLmRlbGl2ZXJlZCcsIHtpZDogcGF5bG9hZC5ldmVudFN0YXR1cy5pZH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBuZXh0KG51bGwsIHBheWxvYWQpO1xuXG4gICAgfTtcblxuICAgIGxldCBwbHVnID0ge1xuICAgICAgICBuYW1lc3BhY2U6ICdldmVudFN0YXR1cycsXG4gICAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICAgIENoYXQ6IGV4dGVuc2lvblxuICAgICAgICB9LFxuICAgICAgICBtaWRkbGV3YXJlOiB7XG4gICAgICAgICAgICBlbWl0OiB7XG4gICAgICAgICAgICAgICAgJyonOiBjcmVhdGVkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAnJC5wdWJsaXNoLnN1Y2Nlc3MnOiBwdWJsaXNoZWQsXG4gICAgICAgICAgICAgICAgJyonOiBkZWxpdmVyZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBsdWcubWlkZGxld2FyZS5lbWl0W2NvbmZpZy5ldmVudF0gPSBjcmVhdGVkO1xuICAgIHBsdWcubWlkZGxld2FyZS5vbltjb25maWcuZXZlbnRdID0gZGVsaXZlcmVkO1xuXG4gICAgcmV0dXJuIHBsdWc7XG59XG4iXX0=
