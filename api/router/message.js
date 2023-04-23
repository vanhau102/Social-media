import express from 'express';
import { addMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();


router.get("/", getMessages)
router.post("/", addMessage)



export default router;