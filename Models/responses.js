const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    questionsData: {
        type: Array,
        required: true
    },
    surveyId: {
        type: Schema.Types.ObjectId,
        ref: 'Schema', // GIVING REFERENCE TO USER SCHEMA
        required: true
    }
})

module.exports = mongoose.model('Response', responseSchema);

