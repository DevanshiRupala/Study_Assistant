const mongoose = require('mongoose');

const getIndianTimestamp = () => {
    const options = { timeZone: 'Asia/Kolkata' };
    return new Date().toLocaleString('en-IN', options);
};

const studentSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
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

studentSchema.pre('save', function(next) {
    this.updated_at = getIndianTimestamp();
    next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
