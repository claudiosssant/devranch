import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import SessionController from './controllers/SessionController';
import RanchController from './controllers/RanchController';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
routes.post('/ranch', upload.single('thumbnail'), RanchController.store);
routes.get('/ranch', RanchController.index);
routes.put('/ranch/:ranch_id', upload.single('thumbnail'), RanchController.update);

export default routes;