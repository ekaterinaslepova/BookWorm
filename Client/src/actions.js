/**
 * Created by nebel on 13.05.2016.
 */

export function init(data) {
    return {
        type: INIT,
        data
    }
}

export function nextBook(book) {
    return {
        type: NEXT_BOOK,
        book
    }
}

export function nextBookRequest(category) {
    return {
        type: NEXT_BOOK_REQUEST,
        category
    }
}

export function prevBook() {
    return {
        type: PREV_BOOK
    }
}

export function changeCategory(category) {
    return {
        type: CHANGE_CATEGORY,
        category
    }
}

export const INIT = 'INIT';
export const NEXT_BOOK = 'NEXT_BOOK';
export const NEXT_BOOK_REQUEST = 'NEXT_BOOK_REQUEST';
export const PREV_BOOK = 'PREV_BOOK';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
