(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-event-status",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni4xMS4wL2xpYi9ub2RlX21vZHVsZXMvY2hhdC1lbmdpbmUtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHBhY2thZ2UgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcbiAgICB3aW5kb3cuQ2hhdEVuZ2luZUNvcmUucGx1Z2luW3BhY2thZ2UubmFtZV0gPSByZXF1aXJlKCcuLi9zcmMvcGx1Z2luLmpzJyk7XG5cbn0pKCk7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiYXV0aG9yXCI6IFwiSWFuIEplbm5pbmdzXCIsXG4gIFwibmFtZVwiOiBcImNoYXQtZW5naW5lLWV2ZW50LXN0YXR1c1wiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMVwiLFxuICBcIm1haW5cIjogXCJzcmMvcGx1Z2luLmpzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYXQtZW5naW5lXCI6IFwiXjAuNS4yXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2hhaVwiOiBcIl40LjEuMlwiLFxuICAgIFwibW9jaGFcIjogXCJeNC4wLjFcIlxuICB9XG59XG4iLCIvKipcbipcbiogQG1vZHVsZSBjaGF0LWVuZ2luZS1ldmVudC1zdGF0dXNcbiogQHJlcXVpcmVzIHtAbGluayBDaGF0RW5naW5lfVxuKi9cblxuLyoqXG4qXG4qIEBmdW5jdGlvblxuKi9cbm1vZHVsZS5leHBvcnRzID0gKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBsZXQgbGlzdCA9IHt9O1xuXG4gICAgY2xhc3MgZXh0ZW5zaW9uIHtcblxuICAgICAgICBlbmFibGUoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnB1c2goZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVhZChwYXlsb2FkKSB7XG4gICAgICAgICAgICBwYXlsb2FkLmNoYXQuZW1pdCgnJC5ldmVudFN0YXR1cy5yZWFkJywgcGF5bG9hZC5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldChwYXlsb2FkKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdFtwYXlsb2FkLmRhdGEuaWRdIHx8IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbGV0IHB1Ymxpc2hlZCA9IChwYXlsb2FkLCBuZXh0KSA9PiB7XG5cbiAgICAgICAgaWYocGF5bG9hZC5ldmVudFN0YXR1cyAmJiBwYXlsb2FkLmV2ZW50ID09IGNvbmZpZy5ldmVudCkge1xuICAgICAgICAgICAgcGF5bG9hZC5jaGF0LnRyaWdnZXIoJyQuZXZlbnRTdGF0dXMuc2VudCcsIHtkYXRhOiBwYXlsb2FkLmV2ZW50U3RhdHVzfSk7XG4gICAgICAgIH1cblxuICAgICAgICBuZXh0KG51bGwsIHBheWxvYWQpO1xuXG4gICAgfVxuXG4gICAgbGV0IGNyZWF0ZWQgPSAocGF5bG9hZCwgbmV4dCkgPT4ge1xuXG4gICAgICAgIGlmKHR5cGVvZiBwYXlsb2FkID09IFwib2JqZWN0XCIpIHtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgY3J1ZGUgSUQgZm9yIHRoaXMgbWVzc2FnZVxuICAgICAgICAgICAgbGV0IGlkID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCk7XG5cbiAgICAgICAgICAgIGxpc3RbaWRdID0gcGF5bG9hZDtcblxuICAgICAgICAgICAgcGF5bG9hZC5ldmVudFN0YXR1cyA9IHtpZH07XG5cbiAgICAgICAgICAgIHBheWxvYWQuY2hhdC50cmlnZ2VyKCckLmV2ZW50U3RhdHVzLmNyZWF0ZWQnLCB7ZGF0YToge2lkfX0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBuZXh0KG51bGwsIHBheWxvYWQpO1xuXG4gICAgfTtcblxuICAgIGxldCBkZWxpdmVyZWQgPSAocGF5bG9hZCwgbmV4dCkgPT4ge1xuXG4gICAgICAgIGlmKHBheWxvYWRcbiAgICAgICAgICAgICYmIHBheWxvYWQuZXZlbnRTdGF0dXNcbiAgICAgICAgICAgICYmIHBheWxvYWQuZXZlbnRTdGF0dXMuaWQpIHtcblxuICAgICAgICAgICAgcGF5bG9hZC5jaGF0LmVtaXQoJyQuZXZlbnRTdGF0dXMuZGVsaXZlcmVkJywge2lkOiBwYXlsb2FkLmV2ZW50U3RhdHVzLmlkfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIG5leHQobnVsbCwgcGF5bG9hZCk7XG5cbiAgICB9O1xuXG4gICAgbGV0IHBsdWcgPSB7XG4gICAgICAgIG5hbWVzcGFjZTogJ2V2ZW50U3RhdHVzJyxcbiAgICAgICAgZXh0ZW5kczoge1xuICAgICAgICAgICAgQ2hhdDogZXh0ZW5zaW9uXG4gICAgICAgIH0sXG4gICAgICAgIG1pZGRsZXdhcmU6IHtcbiAgICAgICAgICAgIGVtaXQ6IHtcbiAgICAgICAgICAgICAgICAnKic6IGNyZWF0ZWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICckLnB1Ymxpc2guc3VjY2Vzcyc6IHB1Ymxpc2hlZCxcbiAgICAgICAgICAgICAgICAnKic6IGRlbGl2ZXJlZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGx1Zy5taWRkbGV3YXJlLmVtaXRbY29uZmlnLmV2ZW50XSA9IGNyZWF0ZWQ7XG4gICAgcGx1Zy5taWRkbGV3YXJlLm9uW2NvbmZpZy5ldmVudF0gPSBkZWxpdmVyZWQ7XG5cbiAgICByZXR1cm4gcGx1Zztcbn1cbiJdfQ==
