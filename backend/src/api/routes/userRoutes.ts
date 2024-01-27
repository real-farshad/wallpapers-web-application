import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/hello', (req, res) => res.send('Hi there, this is user routes!'));

export default router;
