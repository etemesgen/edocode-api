import * as express from 'express';
import User from "../models/userModel";
import CryptoJS from 'crypto-js';

export const updateUser = async (req: express.Request, res: express.Response) => {
  if(req.body.password){
    req.body.password = CryptoJS.AES.encrypt
    ( 
      req.body.password, 
      process.env.PASS_SEC
    ).toString();
  }

  try{
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      {
        $set: req.body
      }, 
      { new:true }
    );

    res.status(200).json(updatedUser);

  } catch(err){
    res.status(500).json(err);
  }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user; // To return all other info and not password
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  const query = req.query.new // If a query parameter is added in url of api request
  try {
    const users = query 
      ? await User.find().sort({ _id: -1}).limit(5) // to return recent 5 new users
      : await User.find() 
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}