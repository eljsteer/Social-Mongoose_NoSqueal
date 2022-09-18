// const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const friendCount = async () =>
  User.aggregate()
    .count("friendCount")
    .then((numberOfFriends) => numberOfFriends);

module.exports = {
// >>-------------------------->>
// User Controller Queries
// >>-------------------------->>
// Get all Users
  getUsers(req, res) {
    User.find({})
      .populate({path: "thoughts", select: "-__v"})
      .populate({path: "friends", select: "-__v"})
      .select("-__v")
      .then(userData => res.json(userData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate({path: "thoughts", select: "-__v"})
      .populate({path: "friends", select: "-__v"})
      .then(async (userData) =>
        !userData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              userData,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

// create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

// Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

// Delete a user and delete them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((dbUserData) => {
        if(!dbUserData) {
          return res.status(404).json({ message: "No such user exists" })
        }

  // Delete Thoughts that related to User
      return Thought.deleteMany(
        { _id: { $in: dbUserData.thoughts } },
      )
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "User deleted, but no thoughts found",
            })
          : res.json({ message: "User successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

// >>-------------------------->>
// Friend Controller Queries
// >>-------------------------->>
  // Add an Friend to a user
  addFriend(req, res) {
    console.log("You are adding a Friend");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

  // Remove Friend from a user
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  }
}
