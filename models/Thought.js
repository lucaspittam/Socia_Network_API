const {Schema, model, Types} = require ('mongoose');
const moment = require('moment');

//Reaction schema
const ReactionSchema = new Schema (
    {  
        reactionId: { 
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: "Share your reaction.",
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: "Please enter your name."
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') 
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);


const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: "Please share your thoughts.",
            minlength: 1, 
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') //formatting the date using Moment
        },
        username: {
            type: String,
            required: "Please provide your name."
        },
        reactions: [ReactionSchema] 
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;