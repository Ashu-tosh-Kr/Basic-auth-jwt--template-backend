import { Router } from 'express';
import authRouter from './routes/authRoutes';

export default (): Router => {
  const app = Router();
  
  //routes
  app.use(authRouter);

  //cookies
  app.get('/set-cookies',(req,res)=>{})
  app.get('/read-cookies',(req,res)=>{})

  return app;
};
