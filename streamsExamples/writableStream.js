const { Writable } = require('node:stream');
const fs = require('node:fs');
const { pipeline } = require('node:stream/promises');
const { Readable } = require('node:stream');

const file = fs.createWriteStream('./captureStdIn.txt');

const readableStream = new Readable({
    read() {}
})

const writableStream = new Writable({
    write(chunk, encoding, callback) {
        if (chunk.toString() === 'exit\n') {
            file.end();
            this.end();
        } else {
            file.write(chunk.toString());
        }
        callback();
    }
})

writableStream.on('pipe', () => {
    console.log('piping to the writable stream')
})

readableStream.on('end', () => {
    console.log('input captured successfuly')
})

process.stdin.on('data', function(chunk) {
    if (chunk.toString() == 'exit\n') {
        process.stdin.destroy();
        readableStream.push(null);
    } else {
        readableStream.push(chunk.toString());
    }
})

pipeline(
    readableStream,
    writableStream
)