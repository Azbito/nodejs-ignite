import { Readable, Writable, Transform } from 'node:stream'

const ONE_SECOND = 1000

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++
        
        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, ONE_SECOND)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = (Number(chunk.toString()) * -1)
        this.push(Buffer.from(String(transformed)))
        callback()
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        const wrote = Number(chunk.toString()) * 10
        console.log(wrote)
        callback()
    }
}

new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream())
