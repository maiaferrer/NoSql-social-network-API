const router = require('express').Router();
const { 
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction } = require('../../controllers/thoughtController');


// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought)

// /api/thoughts/:id
router.route('/:thoughtId')
    .get(getSingleThought)
    .delete(deleteThought)
    .put(updateThought)

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(createReaction)
    



module.exports = router;