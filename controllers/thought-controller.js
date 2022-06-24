const {Thought, User} = require('../models');

const thoughtController = {

    //get all
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //get thought by id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with this id.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    addThought({body}, res) {
        //create new thought
        Thought.create(body)
           
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    {$push: {thoughts: _id}}, 
                    {new: true, runValidators: true} 
                );
            })
            .then (dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'No user found with this id.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    //update by id
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id:params.id}, body, {new:true, runValidators:true})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with that id.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch (err => res.status(400).json(err));
    },

    //dele by id
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id:params.id})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with that id.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    
    addReaction ({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with that id.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    //delete reaction
    deleteReaction ({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: body.reactionId}}},
            {new: true}
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};


module.exports = thoughtController;