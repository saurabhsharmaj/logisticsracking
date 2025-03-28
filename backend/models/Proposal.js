const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bidAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Proposal', ProposalSchema);