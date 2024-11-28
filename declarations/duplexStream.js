const { Duplex } = require('node:stream');

const duplexStream = new Duplex({
    write(chunk, encoding, callback) {
        callback();
    },
    read() {}
})