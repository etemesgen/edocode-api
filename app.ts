import express from 'express';
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './src/routes/user';
import authRoute from './src/routes/auth';
import projectRoute from './src/routes/project';

dotenv.config();

const app = express();

mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to database !"))
.catch((err: Error) => {
  console.log(err)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors());

app.get("/",(req, res) => {
  res.status(200).json({'message': 'edocode API running'});
});

app.use("/edocode-api/auth", authRoute);
app.use("/edocode-api/users", userRoute);
app.use("/edocode-api/projects", projectRoute);

export default app;