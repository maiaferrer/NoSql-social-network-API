const Thought = require("../models/thought");

function getThoughts(req, res) {
    // get thoughts from model
    Thought.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
}

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


module.exports = {
    getThoughts,
    getSingleThought
}