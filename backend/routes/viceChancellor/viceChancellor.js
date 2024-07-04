const express = require('express');
const verifyToken = require('../verifyToken');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fileUpload = require("express-fileupload");
const fs = require("fs");
router.use(fileUpload());

const viceChancellor = require("../../controllers/viceChancellor/viceChancellor.js");
const announcementController = require("../../controllers/viceChancellor/announcement.js");
const applicationController = require("../../controllers/viceChancellor/application.js");
const remarkController = require("../../controllers/viceChancellor/remark.js");

// Admin
// Admim Login  
router.post('/login', viceChancellor.login);
// Retrieve Admim with id
router.get("/profile", verifyToken, viceChancellor.findOne);
// Update a Admin by the id in the request
router.put("/update", verifyToken, viceChancellor.update);


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

// // Application
/* GET applications listing. */
router.get("/forwarded_applications", verifyToken, applicationController.forwardedApplication);
/* GET single application */
router.get("/applications/show/:id", verifyToken, applicationController.findOne);
// Update a applications by the id in the request
router.put("/applications/approve", verifyToken, applicationController.approve);
// Update a applications by the id in the request
router.put("/applications/reject", verifyToken, applicationController.reject);

// Create a new Remark
router.post("/remarks/create", verifyToken, remarkController.create);
// Delete a Remark with the specified id in the request
router.delete("/remarks/:id", verifyToken, remarkController.delete);




module.exports = router;


