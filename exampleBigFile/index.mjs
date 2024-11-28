import http from 'http';
import { readFileSync, createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

http.createServer(async (request, response) => {
    const route = request.url.split('/')[1]
    router[route](request, response)
}).listen(3000)
.on('listening', () => console.log('server is listening on 3000'))

const router = {
    'getFile': async(request, response) => {
        // curl localhost:3000/getFile  
        console.time('time');
        const file = readFileSync('bigfile.txt').toString();
        await response.write(file);
        response.end(() => {
            console.timeEnd('time');
        });
    },
    'getStreamFile': async(request, response) => {
        // curl localhost:3000/getStreamFile
        console.time('time');
        await pipeline(
            createReadStream('bigfile.txt'),
            response
        );
        console.timeEnd('time');
    },
    'getStreamFileWithRateLimit': async(request, response) => {
        // curl localhost:3000/getStreamFileWithRateLimit/100
        console.time('time')
        const highWaterMark = Number(request.url.split('/')[2]);
        await pipeline(
            createReadStream('bigfile.txt', {highWaterMark}),
            response
        );
        console.timeEnd('time');
    },
}