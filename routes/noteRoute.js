const router = require('express').Router()
const auth = require('../middleware/auth')
const {getNotes, getNote, createNote, updateNote, deleteNote, getByCategory} = require('../controllers/noteController');


router.route('/')
    .get(auth, getNotes)
    .post(auth, createNote)

router.route('/category/:category')
      .get(auth, getByCategory)

router.route('/:id')
    .get(auth, getNote)
    .put(auth, updateNote)
    .delete(auth, deleteNote)



module.exports = router;