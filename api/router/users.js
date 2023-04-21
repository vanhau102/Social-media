import express from 'express';
import { getUser, updateUser, getUserFollower } from '../controllers/user.js';

const router = express.Router();


router.get("/find/:userId", getUser)
router.get("/follow", getUserFollower)
router.put("/", updateUser)



export default router;