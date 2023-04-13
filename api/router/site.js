import express from 'express';
import { searchUser } from '../controllers/siteController.js';

const router = express.Router();


router.post("/", searchUser);




export default router;