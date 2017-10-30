
const assert = require('chai').assert;
const status = require('./src/plugin.js');

const ChatEngine = require('../chat-engine/src/index.js');

let pluginchat;
let CE;

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

describe('connect', function() {

    it('should be identified as new user', function(done) {

        CE.connect('robot-tester', {works: true}, 'auth-key');
        CE2.connect('robot-tester-2', {works: true}, 'auth-key');

        CE.on('$.ready', (data) => {

            assert.isObject(data.me);
            done();

        });

    });

});

let channel = 'pluginchat-filter';

describe('plugins', function() {

    it('should be created', function() {

        pluginchat = new CE.Chat(channel);
        pluginchat2 = new CE2.Chat(channel);

        pluginchat.plugin(status({}));
        pluginchat2.plugin(status({}));

        pluginchat.on('$.eventStatus.created', (a) => {
            console.log('created')
        });

        pluginchat.on('$.eventStatus.sent', (a) => {
            console.log('sent')
        });

        pluginchat.on('$.eventStatus.delivered', (a) => {
            console.log('delivered')
        });

        pluginchat2.on('$.connected', () => {
            console.log('connected called')
            pluginchat.emit('test-message');
        });

    });

    it('should get sent callback', function(done) {

        this.timeout(20000)

    });

});
