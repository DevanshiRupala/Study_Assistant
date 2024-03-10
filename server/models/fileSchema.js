const mongoose = require('mongoose');

const getIndianTimestamp = () => {
    const options = { timeZone: 'Asia/Kolkata' };
    return new Date().toLocaleString('en-IN', options);
};

const fileSchema = new mongoose.Schema({
    fileid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    tutorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
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

fileSchema.pre('save', function(next) {
    this.updated_at = getIndianTimestamp();
    next();
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
