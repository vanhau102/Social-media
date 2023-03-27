import express from 'express';

const router = express.Router();


router.get("/test", (req, res) => {
    res.send('nay la comments ne');
})



export default router;