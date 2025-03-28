const Job = require('../models/Job');
const Proposal = require('../models/Proposal');
const Invoice = require('../models/Invoice');



exports.updateJob = async (req, res) => {
  const { id } = req.params;  // Extract ID from request parameters
  const { title, description, createdBy } = req.body;  // Extract updated job data from the request body

  try {
    // Validate and cast createdBy to ObjectId
    let validCreatedBy = createdBy;
    if (createdBy && !mongoose.Types.ObjectId.isValid(createdBy)) {
      return res.status(400).json({ message: 'Invalid createdBy ID' });
    } else if (createdBy) {
      validCreatedBy = mongoose.Types.ObjectId(createdBy); // Cast to ObjectId
    }

    // Find the job by ID
    const job = await Job.findById(id);

    // If the job does not exist, return an error
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Update the job fields with new data from the request body
    job.title = title || job.title;  // Update only if new value is provided
    job.description = description || job.description;  // Update only if new value is provided
    job.createdBy = validCreatedBy || job.createdBy;  // Update createdBy if a valid ID is provided

    // Save the updated job document
    await job.save();

    // Send a success response
    res.status(200).json({ message: 'Job updated successfully', job });
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ message: 'Error updating job', error });
  }
};


exports.postJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    console.log(job);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.bidJob = async (req, res) => {
  try {
    const proposal = new Proposal(req.body);
    await proposal.save();
    const job = await Job.findById(proposal.job);
    job.proposals.push(proposal._id);
    await job.save();
    res.status(201).json(proposal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.approveProposal = async (req, res) => {
  try {
    const { jobId, proposalId } = req.body;
    const job = await Job.findById(jobId);
    job.assignedTo = proposalId;
    job.status = 'approved';
    await job.save();
    res.status(200).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.startProject = async (req, res) => {
  try {
    const { jobId } = req.body;
    const job = await Job.findById(jobId);
    job.status = 'in progress';
    job.currentStage = 1;
    await job.save();
    res.status(200).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.submitWork = async (req, res) => {
  try {
    const { jobId } = req.body;
    const job = await Job.findById(jobId);
    job.status = 'submitted';
    await job.save();
    res.status(200).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.approveWork = async (req, res) => {
  try {
    const { jobId } = req.body;
    const job = await Job.findById(jobId);
    job.status = 'completed';
    await job.save();
    res.status(200).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.raiseInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.payInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.body;
    const invoice = await Invoice.findById(invoiceId);
    invoice.status = 'paid';
    await invoice.save();
    res.status(200).json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getJob = async (req, res) => {
  const { id } = req.params;  // Extract ID from request parameters
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job', error });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  const { id } = req.params;  // Extract ID from request parameters
  try {
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error });
  }
};


exports.getPayments = async (req, res) => {
  try {
    const payments = await Invoice.find();
    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};