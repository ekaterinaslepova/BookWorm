/**
 * Created by nebel on 16.05.2016.
 */

import DB from './db'

const fs = require('fs');
const encoder = require('base64-arraybuffer');
let db = null;

export async function init(cb, cb_error) {
    if (db === null) {
        db = new DB();
        await db.connect().catch((error)=>{
            cb_error('Internal server error');
        });
    }

    const categories = await db.categories();
    const bk = await book();
    cb(Object.assign({}, {book: bk}, {categories}));
}

export async function nextBook(cb, cb_error, category) {
    const bk = await book(category).catch((error) => {
        cb_error('Internal server error')
    });
    cb(bk);
}

async function book(category) {
    const book = await db.book(category);
    const img  = await image(book.Title);
    
    return {
        title: book.Name,
        category: book.Category,
        author: book.Author,
        publisher: book.Publisher,
        year: book.Year,
        pages: book.Pages,
        image: img
    }
}

async function image(name) {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/../images/' + name, (err, buf) => {
            if (err) {
                reject(err);
            } else {
                resolve(encoder.encode(buf));
            }
        }); 
    });
}
    

