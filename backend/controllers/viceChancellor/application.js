const db = require("../../models");
const Application = db.applications;
const Remark  = db.remarks;
const ForwardedApplication = db.forwardedApplications;
const Teacher = db.teachers;
const ViceChancellor = db.viceChancellor;
const Op = db.Op;
const bcrypt = require("bcrypt");
const fs = require("fs");

var pluck = require("arr-pluck");
const { log } = require("console");

// Retrieve all Applications from the database.
exports.forwardedApplication = (req, res) => {
  ForwardedApplication.findAll({
    where: { vice_chancellor_id: req.user_id },
    attributes: ["application_id"],
    raw: true,
  })
    .then((forwarded_applications) => {
      let applications_id = pluck(forwarded_applications, "application_id");
      Application.findAll({
        where: {
          id: {
            [Op.in]: applications_id,
          },
        },
      })
        .then((result) => {
          res.status(201).json({ result: result });
        })
        .catch((err) => {
          res
            .status(201)
            .json({ error: "Some error accurred while retrieving students." });
        });
    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving students." });
    });
};



// Find a single Application with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const forwardedApplications = await ForwardedApplication.findAll({
      where: { application_id: id },
      attributes: ["teacher_id"],
      raw: true,
    });

    const teacherIds = forwardedApplications.map(app => app.teacher_id);

    const teachers = await Teacher.findAll({
      where: { id: { [Op.in]: teacherIds } },
    });

    const application = await Application.findByPk(id);

    const remarks = await Remark.findAll({
      where: { application_id: id },
      include: [Teacher, ViceChancellor],
    });

    const teacherId = application.approved_or_rejected_by;

    // Find teacher with the extracted teacher ID
    const teacher = await Teacher.findByPk(teacherId);

    // Replace teacher ID with teacher's first and last name in application
    if (teacher) {
      application.approved_or_rejected_by = teacher.firstname + ' ' + teacher.lastname;
    }

    if (application.approved_or_rejected_by == 'VC') {
      application.approved_or_rejected_by = 'Vice Chancellor ';
    }


    res.status(200).json({ result: application, remarks, teachers });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: `Error retrieving Application with id = ${id}` });
  }
};

// Update a Application by the id in the request
exports.approve = (req, res) => {
  const id = req.body.id;
    const application = {
    status: 'Accepted', 
    approved_or_rejected_by:'VC',

  };
   Application.update(application, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.status(201).json({ success: "Application Approved" });
          } else {
            res.json({
              message: `Cannot Approve Application with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          console.log(err)

          res.status(500).json({
            message: `Cannot Approve Application with id=${id}.`,
          });
        });
 
};

// Update a Application by the id in the request
exports.reject = (req, res) => {
  const id = req.body.id;
    const application = {
    status: 'Rejected', 
    approved_or_rejected_by:'VC',
  };
   Application.update(application, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.status(201).json({ success: "Application Rejected" });
          } else {
            res.json({
              message: `Cannot Reject Application with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          console.log(err)

          res.status(500).json({
            message: `Cannot Reject Application with id=${id}.`,
          });
        });
 
 
};

