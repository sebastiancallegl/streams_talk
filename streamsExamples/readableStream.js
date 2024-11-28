const { Readable } = require('node:stream');

const readableStream = new Readable({
    read() {}
})

readableStream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data: ${chunk}`);
});

readableStream.push('Hola mundo');
readableStream.push('Hello World');
