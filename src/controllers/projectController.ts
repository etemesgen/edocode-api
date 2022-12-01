import * as express from 'express';
import Project from "../models/projectModel";

export const createProject = async (req: express.Request, res: express.Response) => {
  const newProject = new Project(req.body);
  
  try{
    const savedProject = await newProject.save();
    res.status(201).json(savedProject)
  } catch(err){
    res.status(500).json(err);
  }
}

export const updateProject = async (req: express.Request, res: express.Response) => {
  try{
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, 
      {
        $set: req.body
      }, 
      { new:true }
    );

    res.status(200).json(updatedProject);

  } catch(err){
    res.status(500).json(err);
  }
}

export const deleteProject = async (req: express.Request, res: express.Response) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.status(200).json("Project has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getProject = async (req: express.Request, res: express.Response) => {
  try {
    const projectResponse = await Project.findById(req.params.id)
    res.status(200).json(projectResponse);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getAllProjects = async (req: express.Request, res: express.Response) => {
  const newQuery = req.query.new; // If a query parameter is added in url of api request
  const categoryQuery = req.query.category;
  try {
    let Projects;

    if(newQuery){
      Projects = await Project.find().sort({ createdAt: -1}).limit(5)
    } else if(categoryQuery){
      Projects = await Project.find({categories: {
        $in: [categoryQuery],
      }})
    } else {
      Projects = await Project.find();
    }

    res.status(200).json(Projects);
  } catch (err) {
    res.status(500).json(err);
  }
}