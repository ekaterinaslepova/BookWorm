/**
 * Created by nebel on 13.05.2016.
 */

import {expect} from 'chai';
import {init, next, prev, changeCategory, HISTORY_MAX} from '../src/core';

describe('client core logic', () => {

    it('init application', () => {
        const initData = {
            categories: [],
            book: {
                title: 'Book title',
                category: 'Book category',
                author: 'Book author',
                publisher: 'Book publisher',
                year: 'yyyy',
                pages: 'n'
            }
        };
        const nextState = init(undefined, initData);
        
        expect(nextState).to.deep.equal({
                categories: [],
                currentCategory: '',
                currentCategoryIndexes: [],
                history: [{
                    title: 'Book title',
                    category: 'Book category',
                    author: 'Book author',
                    publisher: 'Book publisher',
                    year: 'yyyy',
                    pages: 'n'
                }],
                currentBookHistoryIndex: 0
            }
        );
    });

    it('next book', () => {
        const state = {
            categories: [],
            currentCategory: '',
            currentCategoryIndexes: [],
            history: [{
                title: 'Book title',
                category: 'Book category',
                author: 'Book author',
                publisher: 'Book publisher',
                year: 'yyyy',
                pages: 'n'
            }],
            currentBookHistoryIndex: 0
        };
        const nextBook = {
                title: 'Book title 2',
                category: 'Book category 2',
                author: 'Book author 2',
                publisher: 'Book publisher 2',
                year: 'yyyy 2',
                pages: 'n 2'
        };
        const nextState = next(state, nextBook);

        expect(state).to.deep.equal(state);
        expect(nextState).to.deep.equal({
            categories: [],
            currentCategory: '',
            currentCategoryIndexes: [],
            history: [{
                title: 'Book title',
                category: 'Book category',
                author: 'Book author',
                publisher: 'Book publisher',
                year: 'yyyy',
                pages: 'n'
            },
            {
                title: 'Book title 2',
                category: 'Book category 2',
                author: 'Book author 2',
                publisher: 'Book publisher 2',
                year: 'yyyy 2',
                pages: 'n 2'
            }
            ],
            currentBookHistoryIndex: 1
        });
    });

    it('clear history when it is more than ' + HISTORY_MAX, () => {
        let history = [];
        for (let i = 0; i < HISTORY_MAX; ++i) {
            history.push({
                title: 'Book title',
                category: 'Book category',
                author: 'Book author',
                publisher: 'Book publisher',
                year: 'yyyy',
                pages: 'n'
            })
        }

        const state = {
            categories: [],
            currentCategory: '',
            currentCategoryIndexes: [],
            history: history,
            currentBookHistoryIndex: HISTORY_MAX - 1
        };
        const nextBook = {
                title: '',
                category: '',
                author: '',
                publisher: '',
                year: '',
                pages: ''
        };
        const nextState = next(state, nextBook);

        expect(state).to.deep.equal(state);
        expect(nextState).to.deep.equal({
            categories: [],
            currentCategory: '',
            currentCategoryIndexes: [],
            history: [{
                title: '',
                category: '',
                author: '',
                publisher: '',
                year: '',
                pages: ''
            }],
            currentBookHistoryIndex: 0});
    });

    it('prev book', () => {
        const state = {
            categories: [],
            currentCategory: '',
            currentCategoryIndexes: [],
            history: [{
                title: 'Book title',
                category: 'Book category',
                author: 'Book author',
                publisher: 'Book publisher',
                year: 'yyyy',
                pages: 'n'
            },
            {
                title: 'Book title 2',
                category: 'Book category 2',
                author: 'Book author 2',
                publisher: 'Book publisher 2',
                year: 'yyyy 2',
                pages: 'n 2'
            }
            ],
            currentBookHistoryIndex: 1
        };
        const prevState = prev(state);

        expect(state).to.deep.equal(state);
        expect(prevState).to.deep.equal({
            categories: [],
            currentCategory: '',
            currentCategoryIndexes: [],
            history: [{
                title: 'Book title',
                category: 'Book category',
                author: 'Book author',
                publisher: 'Book publisher',
                year: 'yyyy',
                pages: 'n'
            },
            {
                title: 'Book title 2',
                category: 'Book category 2',
                author: 'Book author 2',
                publisher: 'Book publisher 2',
                year: 'yyyy 2',
                pages: 'n 2'
            }
            ],
            currentBookHistoryIndex: 0
        });
    });

    it('prev book stay the same if it is the first one', () => {
        const state = {
            categories: [],
            currentCategory: '',
            currentCategoryIndexes: [],
            history: [{
                title: 'Book title',
                category: 'Book category',
                author: 'Book author',
                publisher: 'Book publisher',
                year: 'yyyy',
                pages: 'n'
            },
            {
                title: 'Book title 2',
                category: 'Book category 2',
                author: 'Book author 2',
                publisher: 'Book publisher 2',
                year: 'yyyy 2',
                pages: 'n 2'
            }
            ],
            currentBookHistoryIndex: 0
        };
        const prevState = prev(state);
        
        expect(state).to.deep.equal(state);
        expect(prevState).to.deep.equal(state);
    });

    it('next book - move forward in history', () => {
        const state = {
            categories: [],
            currentCategory: '',
            currentCategoryIndexes: [],
            history: [{
                title: 'Book title',
                category: 'Book category',
                author: 'Book author',
                publisher: 'Book publisher',
                year: 'yyyy',
                pages: 'n'
            },
            {
                title: 'Book title 2',
                category: 'Book category 2',
                author: 'Book author 2',
                publisher: 'Book publisher 2',
                year: 'yyyy 2',
                pages: 'n 2'
            }
            ],
            currentBookHistoryIndex: 0
        };
        const nextState = next(state);
        
        expect(state).to.deep.equal(state);
        expect(nextState).to.deep.equal({
            categories: [],
            currentCategory: '',
            currentCategoryIndexes: [],
            history: [{
                title: 'Book title',
                category: 'Book category',
                author: 'Book author',
                publisher: 'Book publisher',
                year: 'yyyy',
                pages: 'n'
            },
                {
                    title: 'Book title 2',
                    category: 'Book category 2',
                    author: 'Book author 2',
                    publisher: 'Book publisher 2',
                    year: 'yyyy 2',
                    pages: 'n 2'
                }
            ],
            currentBookHistoryIndex: 1
        });
    });

    it('change category', () => {
        const state = {
            categories: [],
            currentCategory: '',
            currentCategoryIndexes: [],
            history: [{
                title: 'Book title',
                category: 'Book category',
                author: 'Book author',
                publisher: 'Book publisher',
                year: 'yyyy',
                pages: 'n'
            },
                {
                    title: 'Book title 2',
                    category: 'Book category 2',
                    author: 'Book author 2',
                    publisher: 'Book publisher 2',
                    year: 'yyyy 2',
                    pages: 'n 2'
                }
            ],
            currentBookHistoryIndex: 0
        };
        const nextState = changeCategory(state, 'Book category');
        
        expect(state).to.deep.equal(state);
        expect(nextState).to.deep.equal({
            categories: [],
            currentCategory: 'Book category',
            currentCategoryIndexes: [0],
            history: [{
                title: 'Book title',
                category: 'Book category',
                author: 'Book author',
                publisher: 'Book publisher',
                year: 'yyyy',
                pages: 'n'
            },
                {
                    title: 'Book title 2',
                    category: 'Book category 2',
                    author: 'Book author 2',
                    publisher: 'Book publisher 2',
                    year: 'yyyy 2',
                    pages: 'n 2'
                }
            ],
            currentBookHistoryIndex: 0
        });
    });

});
