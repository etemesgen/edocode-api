import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, unique: true },
    technologies: { type: Array },
    desc: {type: String, required: true },
    onlinelink: { type: String },
    githublink: { type: String },
    img: { type: String, required: true },
  }, 
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);