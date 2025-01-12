import express from 'express';
import { deleteJob, getAllJobs, getMyJobs, postJob, updateJob } from '../controllers/jobController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router= express.Router();
router.get('/getalljobs',getAllJobs);
router.post('/postjob',isAuthenticated,postJob)
router.get('/getmypostedjobs',isAuthenticated,getMyJobs)
router.put('/updatejob/:id',isAuthenticated,updateJob)
router.delete('/deletejob/:id',isAuthenticated,deleteJob)

export default router;
