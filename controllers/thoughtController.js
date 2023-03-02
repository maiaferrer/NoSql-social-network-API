const { Thought, User } = require("../models");

module.exports = { 
// get all thoughts
  getThoughts(req, res) {
    Thought.find({})
      .sort({ _id: -1 })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
},

// get single thought by _id
  getSingleThought (req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: "reactions", select: "-__v", })
      .select('-__v')
      .then((dbThoughtData) =>
        !dbthoughtData
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
},
// create a thought & add to the users associate thoughts array
createThought(req , res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
       return User.findOneAndUpdate(
           {_id:req.body.userId},
           {$push:{ thoughts:dbThoughtData._id}},
           {new:true}
       )
      })
      .then((userData) => 
      !userData
          ? res.status(404).json({ message: 'No ID found with thought creation' })
          : res.json(userData)
        )
      .catch((err) => res.json(err));
  },

// delete a thought


// update a thought


};