
const assert = require('chai').assert;
const status = require('./src/plugin.js');

const ChatEngine = require('../chat-engine/src/index.js');

let pluginchat;
let CE;
let CE2;

describe('config', function() {

    it('should be configured', function() {

        CE = ChatEngine.create({
            publishKey: 'pub-c-c6303bb2-8bf8-4417-aac7-e83b52237ea6',
            subscribeKey: 'sub-c-67db0e7a-50be-11e7-bf50-02ee2ddab7fe',
        }, {
            endpoint: 'http://localhost:3000/insecure',
            globalChannel: 'test-channel'
        });

        CE2 = ChatEngine.create({
            publishKey: 'pub-c-c6303bb2-8bf8-4417-aac7-e83b52237ea6',
            subscribeKey: 'sub-c-67db0e7a-50be-11e7-bf50-02ee2ddab7fe',
        }, {
            endpoint: 'http://localhost:3000/insecure',
            globalChannel: 'test-channel'
        });

        assert.isOk(CE);

    });

});

let channel = 'pluginchat-filter';

describe('connect', function() {

    it('connect first client', function(done) {

        CE.connect('robot-tester', {works: true}, 'auth-key');

        CE.on('$.ready', (data) => {

            assert.isObject(data.me);
            done();

        });

    });

    it('connect second client', function(done) {

        CE2.connect('robot-tester-2', {works: true}, 'auth-key');

        CE2.on('$.ready', (data) => {

            assert.isObject(data.me);
            done();

        });

    });

    it('should be created', function(done) {

        this.timeout(5000)

        pluginchat = new CE.Chat(channel);
        pluginchat2 = new CE2.Chat(channel);

        pluginchat.plugin(status({}));
        pluginchat2.plugin(status({}));

        pluginchat.onAny((a,b) => {
            console.log('1', a);
        })
        pluginchat2.onAny((a,b) => {
            console.log('2', a);
        })

        pluginchat.on('$.eventStatus.created', (a) => {
            console.log('created', a.id)
        });

        pluginchat.on('$.eventStatus.sent', (a) => {
            console.log('sent', a.id)
        });

        pluginchat.on('$.eventStatus.delivered', (a) => {
            console.log('delivered', a.data.id)
            done();
        });

        setTimeout(function() {

            pluginchat.emit('test-message', {
                message: 'test-message'
            });

        }, 1000)

    });

});
