const req = require("express/lib/request");
const { Thought, User } = require("../models");

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .sort({ _id: -1 })
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // get a single user by its _id and populated thought and friend data
  getSingleUser( req , res ) {
    User.findOne({ _id: req.params.id })
      .select("-__v")
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new user
  createUser(req , res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // update a user by their _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete user by their _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "All User info successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // add a new friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendsId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // remove a friend from a user's friend list
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
};
