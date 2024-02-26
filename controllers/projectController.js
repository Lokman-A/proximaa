const { mongoose } = require("mongoose");
const Project = require("../models/projectModel");

///////////////////////////////////////////////////////////////////////////////////////////
//get all projects
///////////////////////////////////////////////////////////////////////////////////////////
const allProjects = async (req, res) => {
  const projects = await Project.find({});

  res.status(200).json(projects);
};

////////////////////////////////////////////////////////////////////////////////////////////
//get a single project
////////////////////////////////////////////////////////////////////////////////////////////
const getSingleProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid project id" });
  }

  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  res.status(200).json(project);
};

////////////////////////////////////////////////////////////////////////////////////////////
// post a new project
////////////////////////////////////////////////////////////////////////////////////////////
const postProject = async (req, res) => {
  const data = req.body;

  try {
    const project = await Project.create({
      ...data,
    });

    res.status(200).json(project);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////
// delete a project
////////////////////////////////////////////////////////////////////////////////////////////
const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid project id" });
  }

  const project = await Project.findOneAndDelete({ _id: id });
  if (!project) {
    return res.status(404).json({ error: "project not found" });
  }
  res.status(200).json(project);
};

////////////////////////////////////////////////////////////////////////////////////////////
// update a project
////////////////////////////////////////////////////////////////////////////////////////////
const updateProject = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid project ID" });
  }

  const project = await Project.findOneAndUpdate({ _id: id }, { ...data });
  if (!project) {
    return res.status(404).json({ error: "project not found" });
  }
  res.status(200).json(project);
};

////////////////////////////////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  allProjects,
  postProject,
  getSingleProject,
  deleteProject,
  updateProject,
};
