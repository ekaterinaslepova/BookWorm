/**
 * Created by nebel on 13.05.2016.
 */

import {expect} from 'chai';
import reducer from '../src/reducer'
import * as actions from '../src/actions'

describe('reducer test', () => {
    
    it('init', () => {
        const action = actions.init({
            categories: [],
            book: {
                title: 'Book title',
                category: 'Book category',
                author: 'Book author',
                publisher: 'Book publisher',
                year: 'yyyy',
                pages: 'n'
            }
        });
        const nextState = reducer({}, action);
        
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
        });
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
        const action = actions.nextBook({
            title: 'Book title 2',
            category: 'Book category 2',
            author: 'Book author 2',
            publisher: 'Book publisher 2',
            year: 'yyyy 2',
            pages: 'n 2'
        });
        const nextState = reducer(state, action);

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
        const action = actions.prevBook();
        const nextState = reducer(state, action);

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
            currentBookHistoryIndex: 0
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
        const action = actions.changeCategory('Book category');
        const nextState = reducer(state, action);

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
