/**
 * Created by nebel on 16.05.2016.
 */

export default class DB {
    constructor() {
        this._size = 0;
        this._categories = [];
        this._PATH = 'mongodb://localhost:27017/bookworm';
    }

    connect() {
        return new Promise((resolve, reject) => {
            const mongoose = require('mongoose');
            mongoose.connection.on('connected', () => {
                resolve(mongoose);
            });

            mongoose.connection.on('error', () => {
                reject('db connection error');
            });

            mongoose.connect(this._PATH);

            const BookSchema = mongoose.Schema({
                Name: String,
                Category: String,
                Author: String,
                Publisher: String,
                Year: Number,
                Pages: String,
                Title: String
            });
            this.bookModel = mongoose.model('Book', BookSchema);
        });
    }
    
    async book(category) {
        const toFind = typeof category === 'string' && 
                        category !== '' ? {Category: category} : {};

        const size = await new Promise((resolve, reject) => {
            this.bookModel.count(toFind, (err, count) => {
                resolve(count);
            });    
        });
        
        const index = Math.floor(Math.random() * size);

        return new Promise((resolve, reject) => {
            this.bookModel.findOne(toFind).skip(index).exec((err, book) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(book);
                }
            });
        });
        
    }

    categories() {
        if (this._categories.length) {
            return this._categories;    
        }
        
        return new Promise((resolve, reject) => {
           this.bookModel.distinct('Category', (err, categories) => {
               if (err) {
                   reject(err);
               } else {
                   this._categories = categories;
                   resolve(categories);    
               }
           });
        });
    }
}