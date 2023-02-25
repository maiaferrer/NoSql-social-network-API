const { getThoughts, getSingleThought } = require('../../controllers/thoughtController');

const router = require('express').Router();

// GET
// getting all the thoughts
router.route('/').get(getThoughts)

router.route('/:thoughtId').get(getSingleThought)

module.exports = router;