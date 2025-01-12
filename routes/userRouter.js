import express from 'express';
import { login, logout, register } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router= express.Router();
router.post('/register',register);
router.post('/login',login);
router.get('/logout',isAuthenticated,logout);

// router.post('/test', (req, res) => {
//     console.log('Headers:', req.headers);
//     console.log('Body:', req.body);
//     res.json({ success: true, message: 'Test route is working!' });
// });
export default router;
