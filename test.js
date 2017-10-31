
const assert = require('chai').assert;
const status = require('./src/plugin.js');

const ChatEngine = require('../chat-engine/src/index.js');

let pluginchat;
let CE;
let CE2;

describe('config', function() {

    it('should be configured', function(done) {

        CE = ChatEngine.create({
            publishKey: 'pub-c-c6303bb2-8bf8-4417-aac7-e83b52237ea6',
            subscribeKey: 'sub-c-67db0e7a-50be-11e7-bf50-02ee2ddab7fe',
        }, {
            endpoint: 'http://localhost:3000/insecure',
            globalChannel: 'test-channel'
        });

        assert.isOk(CE);

        done();

    });

});

let channel = 'pluginchat-filter';

describe('connect', function() {

    it('connect first client', function(done) {

        CE.connect('robot-tester', {works: true}, 'auth-key');

        CE.on('$.ready', (data) => {

            pluginchat = new CE.Chat(channel);
            pluginchat.plugin(status())
            pluginchat.on('$.connected', () => {

                done();

            })

            assert.isObject(data.me);

        });

    });

    it('should be created', function(done) {

        this.timeout(5000)

        let created = false;
        let sent = false;
        let delievered = false;

        pluginchat.on('$.eventStatus.created', (a) => {
            created = true;
        });

        pluginchat.on('$.eventStatus.sent', (a) => {
            sent = true;
        });

        pluginchat.on('$.eventStatus.delivered', (a) => {
            delivered = true;
            pluginchat.eventStatus.read(a);
        });

        pluginchat.on('$.eventStatus.read', (a) => {

            let e = pluginchat.eventStatus.get(a);

            assert.isObject(e);
            assert.equal(e.eventStatus.id, a.data.id);
            assert.isTrue(created);
            assert.isTrue(sent);
            assert.isTrue(delivered);

            done();
        })

        pluginchat.emit('test-message', {
            message: 'test-message'
        });

    });

});
