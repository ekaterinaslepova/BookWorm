/**
 * Created by nebel on 13.05.2016.
 */

import {expect} from 'chai'
import * as actions from '../src/actions'

describe('action creator test', () => {

    it('init action', () => {
        const action = actions.init({
            title: 'Book title',
            category: 'Book category',
            author: 'Book author',
            publisher: 'Book publisher',
            year: 'yyyy',
            pages: 'n'
        });
        
        expect(action).to.deep.equal({
            type: actions.INIT,
            data: {
                title: 'Book title',
                category: 'Book category',
                author: 'Book author',
                publisher: 'Book publisher',
                year: 'yyyy',
                pages: 'n'
            }
        });
    });

    it('next book action', () => {
        const action = actions.nextBook({
            title: 'Book title',
            category: 'Book category',
            author: 'Book author',
            publisher: 'Book publisher',
            year: 'yyyy',
            pages: 'n'
        });

        expect(action).to.deep.equal({
            type: actions.NEXT_BOOK,
            book: {
                title: 'Book title',
                category: 'Book category',
                author: 'Book author',
                publisher: 'Book publisher',
                year: 'yyyy',
                pages: 'n'
            }
        });
    });

    it('prev book action', () => {
        const action = actions.prevBook();

        expect(action).to.deep.equal({
            type: actions.PREV_BOOK
        });
    });

    it('change category action', () => {
        const action = actions.changeCategory('new category');
        
        expect(action).to.deep.equal({
            type: actions.CHANGE_CATEGORY,
            category: 'new category'
        });
    })

});
