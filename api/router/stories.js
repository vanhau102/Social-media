import express from 'express';

const router = express.Router();


router.get("/test", (req, res) => {
    res.send('nay la stories ne');
})



export default router;