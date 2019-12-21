import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(_, res) {
  res.json('hi');
});

export default router;
