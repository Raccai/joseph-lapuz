const express = require("express");

const {
  getProjects,
  getProjectsAdmin,
  getProject,
  getProjectAdmin,
  createProject,
  deleteProject,
  updateProject
} = require("../controllers/projectContoller")

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// get all projects
router.get("/Projects", getProjects)

// get one project
router.get("/Projects/:id", getProject)


// protect admin routes
router.use(requireAuth);

// get all projects in Admin
router.get("/Admin", getProjectsAdmin)

// get one project in Admin
router.get("/Admin/:id", getProjectAdmin)

// add/post new project
router.post("/Admin", createProject)

// delete new project
router.delete("/Admin/:id", deleteProject)

// update new project
router.patch("/Admin/:id", updateProject)

module.exports = router;