/**
 * Created by nebel on 13.05.2016.
 */

import {INIT, NEXT_BOOK, PREV_BOOK, CHANGE_CATEGORY} from './actions';
import {init, next, prev, changeCategory} from './core';

export default function reducer(state, action) {
    switch (action.type) {
        case INIT:
            return init(undefined, action.data);
        case NEXT_BOOK:
            return next(state, action.book);
        case PREV_BOOK:
            return prev(state);
        case CHANGE_CATEGORY:
            return changeCategory(state, action.category);
        default:
            return state;
    }
}
