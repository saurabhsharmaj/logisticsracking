const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJob);
router.delete('/:id', jobController.deleteJob);
router.put('/:id', authMiddleware, jobController.updateJob);
router.post('/', authMiddleware, jobController.postJob);

router.post('/bidJob', authMiddleware, jobController.bidJob);
router.post('/approveProposal', authMiddleware, jobController.approveProposal);
router.post('/startProject', authMiddleware, jobController.startProject);
router.post('/submitWork', authMiddleware, jobController.submitWork);
router.post('/approveWork', authMiddleware, jobController.approveWork);
router.post('/raiseInvoice', authMiddleware, jobController.raiseInvoice);
router.post('/payInvoice', authMiddleware, jobController.payInvoice);

router.get('/getPayments', authMiddleware, jobController.getPayments);

module.exports = router;