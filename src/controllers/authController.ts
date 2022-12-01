import * as express from 'express';
import User from '../models/userModel';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

export const register = async (req: express.Request, res: express.Response) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt
      ( 
        req.body.password, 
        process.env.PASS_SEC
      ).toString(),
    });
    
    try{
      const savedUser = await newUser.save();
      res.status(201).json(savedUser)
    } catch(err){
      res.status(500).json(err);
    }
  }
  
export const login = async (req: express.Request, res: express.Response) => {
  try{
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials !");

    const hashedPassword = CryptoJS.AES.decrypt
    (
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8); // To decrypt hashed password
    
    originalPassword !== req.body.password && 
      res.status(401).json("Wrong credentials !"); 

      // To create JWT Token for user
      const accessToken = jwt.sign({
        id: user._id
      }, 
      process.env.JWT_SEC,
      {expiresIn: "3d"}
      )
    
    const { password, ...others } = user; // To return all other info and not password

    res.status(200).json({...others, accessToken});

  } catch(err){
    res.status(500).json(err);
  }
}