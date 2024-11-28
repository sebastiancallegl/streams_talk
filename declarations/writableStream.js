const { Writable } = require('node:stream');

const writableStream = new Writable({
    write(chunk, encoding, callback) {
        callback();
    }
})

writableStream.write('chunk')