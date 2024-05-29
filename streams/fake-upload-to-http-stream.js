import { Readable } from 'node:stream';
import fetch from 'node-fetch';

const ONE_SECOND = 1000;

class OneToHundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;
        
        setTimeout(() => {
            if (i > 5) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i));
                this.push(buf);
            }
        }, ONE_SECOND);
    }
}

const stream = new OneToHundredStream();

const controller = new AbortController();
const { signal } = controller;

fetch('http://localhost:3334', {
    method: 'POST',
    body: stream,
    signal: signal,
}).then(response => {
    return response.text();
}).then(data => {
    console.log(data);
}).catch(error => {
    console.error('Error:', error);
});

setTimeout(() => controller.abort(), 10000);
