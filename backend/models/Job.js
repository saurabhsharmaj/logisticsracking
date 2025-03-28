const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'posted' },
  proposals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Proposal' }],
  stages: [{ type: String }],
  currentStage: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  invoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);