const { Transform } = require('node:stream');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        callback();
    }
});

