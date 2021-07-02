import { Request, Response,NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../../config';
import userModel from '../models/userModel';

export const reqAuth = (req: Request, res: Response, next:NextFunction) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(522).json({ msg: 'invalid token',error:true })                
            } else {
                next();               
            }
        })
    } else {
        res.status(522).json({ msg: 'not logged in',error:true })
        
    }
}

export const checkUser = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, config.jwtSecret, async (error, decodedToken) => {
            if (error) {
                res.status(404).json({ msg: 'not logged in',data:null,error:true });
                next();
            } else {
                const user = await userModel.findById(decodedToken.id);
                res.status(200).json({ msg: "logged in", data: user,error:false });
                next();
            }
        })
    }
    else {
        res.status(404).json({ msg: 'not logged in',data:null,error:true });
    }
}