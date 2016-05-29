/**
 * Created by nebel on 15.05.2016.
 */

import Server from 'socket.io';
import {init, nextBook} from './core';

export default function startServer() {
    const io = new Server().attach(8090);

    io.on('connection', (socket) => {
        const cb_start = socket.emit.bind(socket, 'start');
        const cb_next  = socket.emit.bind(socket, 'next');
        const cb_error = socket.emit.bind(socket, 'stop');
        init(cb_start, cb_error);
        socket.on('next', (data) => {
            nextBook(cb_next, cb_error, data.category);
        });
    });
}
