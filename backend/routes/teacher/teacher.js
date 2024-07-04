const express = require('express');
const verifyToken = require('../verifyToken');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fileUpload = require("express-fileupload");
const fs = require("fs"); 
router.use(fileUpload());

const studentController = require("../../controllers/teacher/student.js");
const teacherController = require("../../controllers/teacher/teacher.js");
const applicationController = require("../../controllers/teacher/application.js");
const sessionController = require("../../controllers/teacher/session.js");
const announcementController = require("../../controllers/teacher/announcement.js");
const remarkController = require("../../controllers/teacher/remark.js");

/* GET students Sessions listing. */
router.get("/sessions", verifyToken, sessionController.findAll);

// Teacher
// Admim Login  
router.post('/login', teacherController.login);
// Retrieve Admim with id
router.get("/profile", verifyToken, teacherController.findOne);
// Update a Teacher by the id in the request
router.put("/update", verifyToken, teacherController.update);


// Student
// Retrieve Student with id
router.get("/students/profile/:id", verifyToken, studentController.findOne);
/* GET students listing. */
router.get("/students", verifyToken, studentController.findAll);

/* GET applications listing. */
router.get("/applications", verifyToken, applicationController.findAll);
/* GET applications listing. */
router.get("/applications/search-applications", verifyToken, applicationController.searchApplications);
/* GET applications listing. */
router.get("/forwarded_applications", verifyToken, applicationController.forwardedApplication);
/* GET applications listing. */
router.get("/forwarded_applications/search-applications", verifyToken, applicationController.searchforwardedApplication);
// Create a new Announcement
router.post("/forwarded_applications/create", verifyToken, applicationController.forward)
/* GET single application */
router.post("/forwarded_applications/vc/create", verifyToken, applicationController.forwardToVC)
/* GET single application */
router.get("/applications/show/:id", verifyToken, applicationController.findOne);
// Update a applications by the id in the request
router.put("/applications/approve", verifyToken, applicationController.approve);
// Update a applications by the id in the request
router.put("/applications/reject", verifyToken, applicationController.reject);



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



// Create a new Remark
router.post("/remarks/create", verifyToken, remarkController.create);
// Delete a Remark with the specified id in the request
router.delete("/remarks/:id", verifyToken, remarkController.delete);



module.exports = router;