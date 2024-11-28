const { Duplex } = require('node:stream');
const { pipeline } = require('node:stream/promises')


const duplexStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log('Chunk received in duplex stream: ', chunk.toString())
        callback();
    },
    read() {
        console.log('Something is being read from duplex stream.');
    }
})

duplexStream.on('data', (chunk) => {
    console.log('Chunk of data is being consumed from duplex stream: ', chunk.toString())
})

duplexStream.on('pipe', () => {
    console.log('Duplex stream is connected to a readable stream.')
})

duplexStream.on('end', () => {
    console.log('Duplex stream is not being consumed anymore.')
})

pipeline(
    process.stdin,
    duplexStream,
    process.stdout
)

process.stdin.on('data', (chunk) => {
    duplexStream.push('another thing\n');
    process.stdin.push(null);
    duplexStream.push(null);
})