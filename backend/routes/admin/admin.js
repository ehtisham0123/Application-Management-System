const express = require('express');
const verifyToken = require('../verifyToken');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fileUpload = require("express-fileupload");
const fs = require("fs");
router.use(fileUpload());

const adminController = require("../../controllers/admin/admin.js");
const studentController = require("../../controllers/admin/student.js");
const teacherController = require("../../controllers/admin/teacher.js");
const sessionController = require("../../controllers/admin/session.js");
const announcementController = require("../../controllers/admin/announcement.js");

// Admin
// Admim Login  
router.post('/login', adminController.login);
// Retrieve Admim with id
router.get("/profile", verifyToken, adminController.findOne);
// Update a Admin by the id in the request
router.put("/update", verifyToken, adminController.update);

// Sessions
// Create a new session  
router.post("/sessions/create", verifyToken, sessionController.create);
/* GET sessions listing. */
router.get("/sessions", verifyToken, sessionController.findAll);
// Delete a Session with the specified id in the request
router.delete("/sessions/:id", verifyToken, sessionController.delete);

// Students  
// Create a new Student  
router.post("/students/store", verifyToken, studentController.create);
/* GET students listing. */
router.get("/students/:name?", verifyToken, studentController.findAll);
// Retrieve a single Student with id
router.get("/students/profile/:id", verifyToken, studentController.findOne);
// Update a Student by the id in the request
router.put("/students/update", verifyToken, studentController.update);
// Delete a Student with the specified id in the request
router.delete("/students/:id", verifyToken, studentController.delete);


// Teachers  
// Create a new Teacher  
router.post("/teachers/store", verifyToken, teacherController.create);
/* GET teachers listing. */
router.get("/teachers/:name?", verifyToken, teacherController.findAll);
// Retrieve a single Teacher with id
router.get("/teachers/profile/:id", verifyToken, teacherController.findOne);
// Update a Teacher by the id in the request
router.put("/teachers/update", verifyToken, teacherController.update);
// Delete a Teacher with the specified id in the request
router.delete("/teachers/:id", verifyToken, teacherController.delete);

// Announcement
// Create a new Announcement
router.post("/announcements/create", verifyToken, announcementController.create);
/* GET Single Announcement. */
router.get("/announcement/:id", verifyToken, announcementController.findOne);
/* GET Announcements listing. */
router.get("/announcements", verifyToken, announcementController.findAll);
/* GET Announcements listing. */
router.get("/announcements/search", verifyToken, announcementController.searchAnnouncements);
// Update a Announcement by the id in the request
router.put("/announcements/update", verifyToken, announcementController.update);
// Delete a Announcement with the specified id in the request
router.delete("/announcements/:id", verifyToken, announcementController.delete);



module.exports = router;


