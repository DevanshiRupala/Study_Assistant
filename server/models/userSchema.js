const mongoose = require('mongoose');

const getIndianTimestamp = () => {
  const options = { timeZone: 'Asia/Kolkata' };
  return new Date().toLocaleString('en-IN', options);
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isStudent: {
        type: Boolean,
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

userSchema.pre('save', function(next) {
  this.updated_at = getIndianTimestamp();
  next();
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
