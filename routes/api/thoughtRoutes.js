const router = require('express').Router();
const { 
    getThoughts,
    getSingleThought,
    createThought } = require('../../controllers/thoughtController');


// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought)

// /api/thoughts/:id
router.route('/:thoughtId')
    .get(getSingleThought)

module.exports = router;