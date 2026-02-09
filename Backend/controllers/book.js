const Book = require ('../models/book');
const fs = require ('fs');
const sharp = require('sharp');

exports.createBook = (req, res, next) => {
const url = req.protocol + '://' + req.get('host');
req.body.book = JSON.parse(req.body.book)

const webpFilename = req.file.filename.split('.')[0] + '.webp';
sharp(req.file.path)
.webp({ quality: 20 })
.toFile(`images/${webpFilename}`);
fs.unlink(req.file.path, (error) => { 
    console.log(error)
});

const book = new Book({
title: req.body.book.title,
author: req.body.book.author,
imageUrl: url + '/images/' + webpFilename,
year: req.body.book.year,
genre: req.body.book.genre,
ratings: [
{
userId: req.body.book.userId,
userId: req.body.book.userId,
}
],
averageRating: req.body.book.averageRating,
});

book.save().then(() => {
    res.status(201).json({
        message: 'Book saved Successfully'
    });
})
.catch((error) => {
    res.status(400).json({
        error: error
    })
})
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({
        _id: req.params.id
    }).then(
        (book) => {
            res.status(200).json(book);
        })
       .catch((error) => {
            res.status(404).json({
                error: error
            });
        });
};

exports.modifyBook = (req, res, next) => {
    
let book = ({_id: req.params.id})
if(req.file) {
const url = req.protocol + '://' + req.get('host');
req.body.book = JSON.parse(req.body.book)

const webpFilename = req.file.filename.split('.')[0] + '.webp';

book = {
_id: req.params.id,
title: req.body.book.title,
author: req.body.book.author,
imageUrl: url + '/images/' + webpFilename,
year: req.body.book.year,
genre: req.body.book.genre,
ratings: [
{
userId: req.body.book.userId,
userId: req.body.book.userId,
}
],
averageRating: req.body.book.averageRating,
}; 
sharp(req.file.path)
.webp({ quality: 20 })
.toFile(`images/${webpFilename}`);
fs.unlink(req.file.path, (error) => { 
    console.log(error)
});
} 

else {
book = {
_id: req.params.id,
title: req.body.title,
author: req.body.author,
imageUrl: req.body.imageUrl,
year: req.body.year,
genre: req.body.genre,
ratings: [
{
userId: req.body.userId,
userId: req.body.userId,
}
],
averageRating: req.body.averageRating,
    };
}
Book.updateOne({_id: req.params.id}, book) .then(() => {
    res.status(201).json({
        message: 'Book updated successfully!'
    });
    })
    .catch((error) => {
    res.status(400).json({
        error: error
    })
    })
};

exports.deleteBook = (req, res, next) => {
    Book.findOne({_id: req.params.id}) .then((book) => {
        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
        Book.deleteOne({_id: req.params.id}) .then(() => {
        res.status(200).json({
            message: 'Book deleted'})
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            })
        });    
        })
    });
    };

exports.getAllBooks = (req, res, next) => {
    Book.find().then(
    (books) => {
    res.status(200).json(books);
    })
    .catch((error) => {
    res.status(400).json({
    error: error
});
    });
};




