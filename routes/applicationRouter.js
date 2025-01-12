import express from 'express';
import { employerGetAllApplications, jobseekerDelApplication, jobseekerGetAllApplications, postApplication } from '../controllers/applicationController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router= express.Router();
router.get('/getallemployerapplications',isAuthenticated,employerGetAllApplications)
router.get('/getalljobseekerapplications',isAuthenticated,jobseekerGetAllApplications)
router.delete('/deleteapplicaton/:id',isAuthenticated,jobseekerDelApplication)
router.post('/postyourapplication',isAuthenticated,postApplication)
// router.post('/postyourapplication', isAuthenticated, upload.single('resume'), postApplication);

export default router;
