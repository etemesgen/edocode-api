import express from 'express';
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
import userRoute from './routes/user';
import authRoute from './routes/auth';
import projectRoute from './routes/project';

dotenv.config();

const app = express();

mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to database !"))
.catch((err: Error) => {
  console.log(err)
});

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/projects", projectRoute);

export default app;