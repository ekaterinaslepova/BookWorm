/**
 * Created by nebel on 14.05.2016.
 */

import {NEXT_BOOK_REQUEST} from './actions';

export default (socket, store) => next => action => {
    if (action.type === NEXT_BOOK_REQUEST) {
        socket.emit('next', {category: action.category});
    }
    return next(action);
}
