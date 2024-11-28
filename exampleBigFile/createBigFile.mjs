import fs from 'node:fs';

const file = fs.createWriteStream('bigfile.txt')
for (let i= 0; i <= 2000000; i++) {
    file.write(`playing with streams in Globant -> ${i}\n`);
}
file.end()