const {Schema, model} = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: "Please enter a username!",
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: "Please enter an email address!",
            match: [`/.+\@.+\..+/`] //regex to validate the email address.
        },
        thoughts: [],
        friends: []
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

//friendCount virtual retrieves the length of a user's friends array on query.
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//create model using the UserSchema
const User = model('User', UserSchema);

module.exports = User; 
