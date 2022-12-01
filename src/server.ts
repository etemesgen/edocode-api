import http from 'http';
import app from '../app';
import mongoose from 'mongoose';

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to database !"))
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

connectDB().then(() => {
  server.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
  })
})

// server.listen(process.env.PORT || 3000, () => {
//   console.log("Server is running");
// });