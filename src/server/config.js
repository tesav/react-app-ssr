import fs from 'fs'
import path from 'path'

export default {
    host: 'localhost', // 'test.local'
    port: 3001,
    backlog: 511, // Optional. Specifies the max length of the queue of pending connections. Default 511
    secure: false,
}

export const secureOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '../src/server/cert_files/server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../src/server/cert_files/server.crt')),
    //
    //  pfx: fs.readFileSync(path.resolve(__dirname, '../src/server/cert_files/x.pfx')),
    //  passphrase: 'sample'
}
