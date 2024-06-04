const Project = require("../models/ProjectModel")
const mongoose = require("mongoose")

// get all projects
const getProjects = async (req, res) => {
  const projects = await Project.find({}).sort({createdAt: -1});

  res.status(200).json(projects);
}

// get all projects in Admin
const getProjectsAdmin = async (req, res) => {
  const projects = await Project.find({}).sort({createdAt: -1});

  res.status(200).json(projects);
}

// get one project
const getProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such project"})
  }

  const project = await Project.findById(id);

  if(!project) {
    return res.status(400).json({error: "No such project"})
  }

  res.status(200).json(project);
}

// get one project in Admin
const getProjectAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such project"})
  }

  const project = await Project.findById(id);

  if(!project) {
    return res.status(400).json({error: "No such project"})
  }

  res.status(200).json(project);
}

// create a new project
const createProject = async (req, res) => {
  const {titles, descriptions, imgUrls, link} = req.body;

  if (titles.length !== descriptions.length || titles.length !== imgUrls.length) {
    return res.status(400).json({error: "Titles, descriptions, and imgUrls arrays must match in length"})
  }

  const items = titles.map((title, index) => ({
    title,
    description: descriptions[index],
    imgUrl: imgUrls[index]
  }))

  // add doc to db
  try {
    const project = await Project.create({items, link});
    res.status(201).send(project);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such project"})
  }

  const project = await Project.findOneAndDelete({_id: id});

  if(!project) {
    return res.status(400).json({error: "No such project"})
  }

  res.status(200).json(project);
}

// update a project
const updateProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such project"})
  }

  const {titles, descriptions, imgUrls, link} = req.body;

  if (titles.length !== descriptions.length || titles.length !== imgUrls.length) {
    return res.status(400).json({error: "Titles, descriptions, and imgUrls arrays must match in length"})
  }

  const items = titles.map((title, index) => ({
    title,
    description: descriptions[index],
    imgUrl: imgUrls[index]
  }))

  const project = await Project.findOneAndUpdate(
    { _id: id }, 
    { items, link },
    { new: true }
  );

  if(!project) {
    return res.status(400).json({error: "No such project"})
  }

  res.status(200).json(project);
}


module.exports = {
  getProjects,
  getProjectsAdmin,
  getProject,
  getProjectAdmin,
  createProject,
  deleteProject,
  updateProject,
}