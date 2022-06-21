const {User} = require('../models');

const userController = {

    //All Users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //Single user
    getUserById({params}, res) {
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with this id.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //Create User
    createUser({body}, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    //update User
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id:params.id}, body, {new:true, runValidators:true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with that id.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch (err => res.status(400).json(err));
    },

    //Delete User
    deleteUser({params}, res) {
        User.findOneAndDelete({_id:params.id})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with that id.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }

};


module.exports = userController;