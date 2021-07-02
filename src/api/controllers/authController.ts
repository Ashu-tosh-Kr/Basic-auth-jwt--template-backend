import { Request, Response } from "express";
import userModel from "../models/userModel";
import jwt from 'jsonwebtoken'
import config from '../../config'
import bcrypt from 'bcrypt'

const handleErrors = (err) => {
  let error = { email: "", password: "" };

  //incorrect email
  if (err.message === "incorrect email") {
    error.email = err.message;
  }
  if (err.message === "incorrect password") {
    error.password = err.message;
  }

  //validation error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    })
  }

  //duplication error
  if (err.code === 11000) {
    error.email="Email already exists"
  }

  return error;
}

const maxAge = 3*24*60*60

const createToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: maxAge })
  
}


export const signup_post = async (req: Request, res: Response) => {
  try {
    const user = await userModel.create({
      email: req.body.email,
      password: req.body.password,
    })
    //token & cookie creation
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * maxAge })
    
    res.status(201).json({msg:"signed up", error:false,user: user._id});
    
  } catch (err) {
    const error = handleErrors(err);
    res.status(404).json({ msg: error, error: true })
  }
};


export const login_post = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // const user = await userModel.login(req.body.email,req.body.password);
    const user = await userModel.findOne({ email: email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * maxAge })
        res.status(200).json({msg:"logged in", error:false,user: user._id})
      }
      else throw Error("incorrect password");
    }
    else throw Error("incorrect email");
  } catch (err) {
    const error = handleErrors(err);
    res.status(404).json({ msg: error, error: true })
  }
};

export const logout_get = async (req: Request, res: Response) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.json({msg:'logged out',error:false})
};
