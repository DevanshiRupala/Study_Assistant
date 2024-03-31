const mongoose = require('mongoose');

const getIndianTimestamp = () => {
  const options = { timeZone: 'Asia/Kolkata' };
  return new Date().toLocaleString('en-IN', options);
};

const paymentSchema = new mongoose.Schema({
    tutor_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    student_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    session_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session', 
        required: true
    },
    amount : {
        type: Number,
        required: true
    },
    date: {
        type: Date,
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

paymentSchema.pre('save', function(next) {
  this.updated_at = getIndianTimestamp();
  next();
});

const Payment = mongoose.model('Payments', paymentSchema);

module.exports = Payment;
