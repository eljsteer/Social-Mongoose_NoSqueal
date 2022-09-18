const { Thought, User } = require('../models');

module.exports = {

  // >>-------------------------->>
  // Thought Controller Queries
  // >>-------------------------->>
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  
  // Get a Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({path: "reactions"})
      .select('-__v')
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
    .then(thoughtInfo => {
      return User.findOneAndUpdate( 
        {_id: req.body.userId },
        { $push: { thoughts: thoughtInfo._id } },
        { new: true }
      )
    })
      .then((thoughtInfo) => res.json(thoughtInfo))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then(thoughtData => {
      User.findOneAndDelete(      
        { _id: thoughtData.userId },
        { $pull: { thoughts: { _id: req.params.thoughtId } } },
        { runValidators: true, new: true })
      })
      .then((thoughtData) => 
        !thoughtData
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : User.deleteOne({ _id: { $in: User.thoughts } })
      )
      .then(() => res.json({ message: 'Thought and reactions deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  
  // >>-------------------------->>
  // Reaction Controller Queries
  // >>-------------------------->>
  // Add an reaction to a thought
  addReaction(req, res) {
    console.log('You are adding an reaction');
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
