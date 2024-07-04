const express = require('express');
const verifyToken = require('../verifyToken');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fileUpload = require("express-fileupload");
const fs = require("fs");
router.use(fileUpload());

const studentController = require("../../controllers/student/student.js");
const teacherController = require("../../controllers/student/teacher.js");
const applicationController = require("../../controllers/student/application.js");
const announcementController = require("../../controllers/student/announcement.js");
const suggestionController = require("../../controllers/student/suggestion.js");


// Student
// Student Login  
router.post('/login', studentController.login);
// Student SignUp  
router.post('/signup', studentController.signup);
// Retrieve Student with id
router.get("/profile", verifyToken, studentController.findOne);
// Update a Student by the id in the request
router.put("/update", verifyToken, studentController.update);


 
// Retrieve Teacher with id
router.get("/teachers/profile/:id", verifyToken, teacherController.findOne);
/* GET teachers listing. */
router.get("/teachers/:name?", verifyToken, teacherController.findAll);

// applications
// Create a new applications  
router.post("/applications/create", verifyToken, applicationController.create);
/* GET single application */
router.get("/applications/show/:id", verifyToken, applicationController.findOne);
// Update a Applicaions by the id in the request
router.put("/applications/update", verifyToken, applicationController.update);

/* GET application listing. */
router.get("/applications", verifyToken, applicationController.findAll);
// Delete a application with the specified id in the request
router.delete("/applications/:id", verifyToken, applicationController.delete);


// Announcement
/* GET Announcements listing. */
router.get("/announcements", verifyToken, announcementController.findAll);


// Announcement
// Create a new Announcement
router.post("/suggestions/create", verifyToken, suggestionController.create);
/* GET Single Announcement. */
router.get("/suggestion/:id", verifyToken, suggestionController.findOne);
/* GET Announcements listing. */
router.get("/suggestions", verifyToken, suggestionController.findAll);
// Update a Announcement by the id in the request
router.put("/suggestions/update", verifyToken, suggestionController.update);
// Delete a Announcement with the specified id in the request
router.delete("/suggestions/:id", verifyToken, suggestionController.delete);



module.exports = router;