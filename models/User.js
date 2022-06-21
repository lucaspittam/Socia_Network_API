const {Schema, model} = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: "Enter a username!",
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: "Enter an email address!",
            match: [/.+\@.+\..+/] //regex
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

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User; 
