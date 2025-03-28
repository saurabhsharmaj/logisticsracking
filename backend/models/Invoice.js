const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  status: { type: String, default: 'unpaid' },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);