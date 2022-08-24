import express from 'express';
import controller from '../controllers/todo';

const router = express.Router();

router.post('/create', controller.createTodo);
router.put('/:id', controller.updateTodo);

export default router;