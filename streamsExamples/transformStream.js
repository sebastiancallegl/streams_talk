const { Transform, Readable, Writable } = require('node:stream');
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');

const file = fs.createWriteStream('./transformStdIn.txt');

const readableStream = new Readable({
    read() {},
});

const writableStream = new Writable({
    write(chunk, encoding, callback) {
        if (chunk.toString() === 'exit\n') {
            file.end();
            this.end();
        } else {
            file.write(chunk.toString().toUpperCase());
        }
    },
});

writableStream.on('pipe', () => {
    console.log('piping to the writable stream')
});

readableStream.on('end', () => {
    console.log('input captured successfuly')
});

// process.stdin.on('data', function(chunk) {
//     if (chunk.toString() == 'exit\n') {
//         process.stdin.destroy();
//         readableStream.push(null);
//     } else {
//         readableStream.push(chunk.toString());
//     }
// });

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const data = chunk.toString();
        const r = 8.314;
        const volume = 0.005; // 1 m3
        const [pressure, mass] = data.split(','); // atm, mol
        // Presion * Volumen = R * masa * Temperatura (PV = rTN)
        const temperature = (pressure*101325*volume)/(mass*r);
        this.push(`Temperature: ${temperature - 273.15}°C\n`);
        callback();
    }
});

pipeline(
    process.stdin, //[10, 1]
    transformStream,
    process.stdout
);