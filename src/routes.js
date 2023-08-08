import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import SessionController from './controllers/SessionController';
import RanchController from './controllers/RanchController';
import DashboardController from './controllers/DashboardController';
import ReserveController from './controllers/ReserveController';


const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
routes.post('/ranch', upload.single('thumbnail'), RanchController.store);
routes.get('/ranch', RanchController.index);
routes.put('/ranch/:ranch_id', upload.single('thumbnail'), RanchController.update);
routes.delete('/ranch', RanchController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.post('/ranch/:ranch_id/reserve', ReserveController.store);

export default routes;