import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils'
import App from '../src/components/app';
import {expect} from 'chai';

describe('ui tests', () => {

   it('ui structure', () => {
       const test = {
           title: 'Book title',
           category: 'Book category',
           author: 'Book author',
           publisher: 'Book publisher',
           year: 'yyyy',
           pages: 'n'
       };
       
       const component = renderIntoDocument(<App book={test} />);
       const select = scryRenderedDOMComponentsWithTag(component, 'select');
       const p = scryRenderedDOMComponentsWithTag(component, 'p');
       const buttons = scryRenderedDOMComponentsWithTag(component, 'input');
       
       expect(select.length).to.equal(1);
       expect(p.length).to.equal(1);
       expect(buttons.length).to.equal(2);
   });

});