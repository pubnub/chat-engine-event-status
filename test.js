
const assert = require('chai').assert;
const status = require('./src/plugin.js');

const ChatEngine = require('../chat-engine/src/index.js');

let pluginchat;
let CE;
let CE2;

describe('config', function() {

    it('should be configured', function(done) {

        CE = ChatEngine.create({
            publishKey: 'pub-c-01491c54-379f-4d4a-b20b-9a03c24447c7',
            subscribeKey: 'sub-c-eaf4a984-4356-11e8-91e7-8ad1b2d46395',
        }, {
            globalChannel: 'test-channel'
        });

        assert.isOk(CE);

        done();

    });

});

let channel = 'pluginchat-filter';

describe('connect', function() {

    it('connect first client', function(done) {

        this.timeout(60000);

        CE.connect('robot-tester', {works: true}, 'auth-key');

        CE.on('$.ready', (data) => {

            pluginchat = new CE.Chat(channel);
            pluginchat.plugin(status({
                event: 'test-message'
            }))
            pluginchat.on('$.connected', () => {

                done();

            })

            assert.isObject(data.me);

        });

    });

    it('should trigger receipts', function(done) {

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
