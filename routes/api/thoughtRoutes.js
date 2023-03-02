const router = require('express').Router();
const { 
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought} = require('../../controllers/thoughtController');


// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought)

// /api/thoughts/:id
router.route('/:thoughtId')
    .get(getSingleThought)
    .delete(deleteThought);

module.exports = router;