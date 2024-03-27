const mongoose = require('mongoose');

const getIndianTimestamp = () => {
    const options = { timeZone: 'Asia/Kolkata' };
    return new Date().toLocaleString('en-IN', options);
};

const tutorSchema = new mongoose.Schema({
    tutor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    qualifications: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    institutions: {
        type: String,
        required: true
    },
    hourlyRates: {
        type: Number,
        required: true
    },
    overall_rating: {
        type: Number,
        default: 0 
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    zipCode:{
        type: String,
        required: true
    },
    subjects: {
        type: [String],
        required : true 
    },
    profile_picture: {
        type : String,
        default : "abc"
     },
    facebookProfile : {
        type: String
    },
    twitterProfile : {
        type: String
    },
    instagramProfile : {
        type: String
    },
    languages: {
        type: [String],
        required : true
    },
    mode: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        default: getIndianTimestamp
    },
    updated_at: {
        type: String,
        default: getIndianTimestamp
    }
});

tutorSchema.pre('save', function(next) {
    this.updated_at = getIndianTimestamp();
    next();
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
