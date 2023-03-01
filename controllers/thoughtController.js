const Thought = require("../models/thought");

// get all thoughts
function getThoughts(req, res) {
    Thought.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
}

// get single thought
function getSingleThought (req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No course with that ID' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
}
// create a thought 


// delete a thought


// update a thought



module.exports = {
    getThoughts,
    getSingleThought
}