import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.post('/validate', controller.validateToken);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/get/all', controller.getAllUsers);
router.get('/todos', controller.getUserTodos);

export default router;
