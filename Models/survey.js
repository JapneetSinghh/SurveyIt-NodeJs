const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const surveySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // GIVING REFERENCE TO USER SCHEMA
        required: true
    },
    name: {
        type: String,
        required: true
    },
    acceptingResponses: {
        type: String,
        required: true
    },
    shareGlobally: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailImage: {
        type: String,
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: String,
        required: true
    },
    numOfQues: {
        type: Number,
        required: true
    },
    questionsData: {
        type: Array,
        required: true
    },
    responses: {
        type: Array
    }
})

module.exports = mongoose.model('Survey', surveySchema);