const mongoose = require('mongoose');

const getIndianTimestamp = () => {
    const options = { timeZone: 'Asia/Kolkata' };
    return new Date().toLocaleString('en-IN', options);
};

const sessionSchema = new mongoose.Schema({
    tutor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutor', // Assuming there's a 'Tutor' model
        required: true
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // Assuming there's a 'Student' model
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    online_meeting_link: {
        type: String,
        default: null // Assuming not all sessions have online meeting links
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'canceled'],
        default: 'scheduled' // Default status for a session
    },
    created_at: {
        type: Date,
        default: getIndianTimestamp // Default to the current timestamp
    },
    updated_at: {
        type: Date,
        default: getIndianTimestamp
    }
});

sessionSchema.pre('save', function(next) {
    this.updated_at = getIndianTimestamp();
    next();
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
