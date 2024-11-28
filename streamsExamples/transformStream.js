const { Transform } = require('node:stream');
const { pipeline } = require('node:stream/promises');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const data = chunk.toString();
        const r = 0.0821;
        const volume = 5;
        let [temperature, mass] = data.split(','); // atm, mol
        // Presion * Volumen = R * masa * Temperatura (PV = rTN)
        temperature = Number(temperature) + 273.15
        const pressure = (r*temperature*Number(mass)) / (volume);
        this.push(`Pressure: ${pressure.toFixed(2)}atm\n`);
        callback();
    }
});

pipeline(
    process.stdin, //[10, 1]
    transformStream,
    process.stdout
);