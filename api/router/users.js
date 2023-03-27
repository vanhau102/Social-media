import express from 'express';

const router = express.Router();


router.get("/test", (req, res) => {
    res.send('nay la user ne');
})



export default router;