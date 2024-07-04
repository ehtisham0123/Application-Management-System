const db = require("../../models");
const Application = db.applications;
const ForwardedApplication = db.forwardedApplications;
const Remark  = db.remarks;
const Teacher = db.teachers;

const Op = db.Op;
const bcrypt = require("bcrypt");

var pluck = require("arr-pluck");

// Create and Save a new Application
exports.create = (req, res) => {
  console.log(req.body);
  const application = {
    name : req.body.name,
    rollnumber : req.body.rollnumber,
    classandsection : req.body.classandsection,
    discipline : req.user_discipline,
    mobilenumber : req.body.mobilenumber,
    subject : req.body.subject,
    category : req.body.category,
    subCategory : req.body.subCategory,
    purpose : req.body.purpose,
    details : req.body.details,
    date :  req.body.date,
    student_id: req.user_id,
    application_type: req.body.application_type,
    status: "Pending",
    file: '',
    file_type: ''
  };


    if (req.files) {
    const file = req.files.file;
    let applicationName = file.name.split(".");
    application.file_type = applicationName[applicationName.length - 1];
    applicationName = applicationName[0] + "." + Date.now() + "." + applicationName[applicationName.length - 1];
    application.file = applicationName;
    file.mv(
      `${__dirname}/../../../frontend/public/uploads/${applicationName}`,
      (err) => {
        if (err) {
           console.error(err);
        }
      }
    );
  } 


  Application.create(application)
    .then((result) => {
        res.status(201).json({ success: "Application Send." });
    })
    .catch((err) => {
      res.status(201).json({ error: "Error while inseting result" });
    });
 
};

// Retrieve all Applications from the database.
exports.findAll = async (req, res) => {
  try {
    const result = await Application.findAll({
      order: [['created_at', 'DESC']],
      where: {
        student_id: req.user_id
      }
    });

    if (result && result.length > 0) {
      console.log(result);
      res.status(201).json({ result: result });
    } else {
      res.status(201).json({ success: "No applications." });
    }
  } catch (err) {
    res.status(201).json({ error: "Some error occurred while retrieving applications." });
  }
};


exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    // Find forwarded applications and extract teacher IDs
    const forwardedApplications = await ForwardedApplication.findAll({
      where: { application_id: id },
      attributes: ["teacher_id"],
      raw: true,
    });
    const teacherIds = forwardedApplications.map(app => app.teacher_id);

    // Find teachers with the extracted teacher IDs
    const teachers = await Teacher.findAll({
      where: { id: { [Op.in]: teacherIds } },
    });

    // Find the main application
    const application = await Application.findByPk(id);

    // Find remarks for the application with teacher information
    const remarks = await Remark.findAll({
      where: { application_id: id },
      include: [{ model: Teacher }],
    });

    // Replace teacher IDs with teacher names in application
    if (application.approved_or_rejected_by === 'VC') {
      application.approved_or_rejected_by = 'Vice Chancellor';
    } else {
      const teacher = teachers.find(t => t.id === application.approved_or_rejected_by);
      if (teacher) {
        application.approved_or_rejected_by = teacher.firstname + ' ' + teacher.lastname;
      }
    }

    res.status(200).json({ result:application, remarks, teachers });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: `Error retrieving Application with id = ${id}` });
  }
};

// Delete a Application with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;
  Application.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({
          success: "Application was deleted successfully!"
        });
      } else {
        res.json({
          message: `Cannot delete Application with id=${id}. Maybe Application was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Application with id=" + id
      });
    });
};




// Update a Application by the id in the request
exports.update = (req, res) => {

    let id = req.body.id;
    const application = {
    name : req.body.name,
    rollnumber : req.body.rollnumber,
    classandsection : req.body.classandsection,
    discipline : req.user_discipline,
    mobilenumber : req.body.mobilenumber,
    subject : req.body.subject,
    category : req.body.category,
    purpose : req.body.purpose,
    details : req.body.details,
    date :  req.body.date,
    student_id: req.user_id,
    file: req.body.file,
    file_type: req.body.file_type,
  };

  if (req.files) {
    const file = req.files.file;
    let applicationName = file.name.split(".");
    application.file_type = applicationName[applicationName.length - 1];
    applicationName = applicationName[0] + "." + Date.now() + "." + applicationName[applicationName.length - 1];
    application.file = applicationName;
    file.mv(
      `${__dirname}/../../../frontend/public/uploads/${applicationName}`,
      (err) => {
        if (err) {
           console.error(err);
        }
      }
    );
  } 

  Application.update(application, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.status(201).json({success: "Application Updated" });
        } else {
          res.json({
            message: `Cannot update Application with id=${id}. Maybe Application was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error updating Application with id=" + id,
        });
      });

};