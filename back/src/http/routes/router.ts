import { Router } from 'express';
import { register } from '../controllers/register';
import { login } from '../controllers/login';
import { getUser, updateUser, deleteUser } from '../controllers/user';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.use(authMiddleware); 

router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
