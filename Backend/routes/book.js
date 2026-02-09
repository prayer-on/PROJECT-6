const express = require('express');
const router = express.Router();
const bookCtrl = require ('../controllers/book');
const auth = require ('../middleware/auth')
const multer = require ('../middleware/multer-config');
 
router.get('/', bookCtrl.getAllBooks);
router.post('/', auth, multer, bookCtrl.createBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/:id', bookCtrl.getOneBook);

module.exports = router;