const db = require("../../models");
const Application = db.applications;
const Remark = db.remarks;
const ViceChancellor = db.viceChancellor;
const ForwardedApplication = db.forwardedApplications;
const Teacher = db.teachers;
const Student = db.students;
const Op = db.Op;
const fs = require("fs");

var pluck = require("arr-pluck");
const { log } = require("console");


// Retrieve all Applications from the database.
exports.findAll = (req, res) => {
  const teacher_role = req.query.teacher_role;
  let query;
  if (teacher_role == 'Chairman') {
    query = {
      order: [
        ['created_at', 'DESC'],
      ]
    }

  }
  else if (teacher_role == 'Coordinator Software Engineering') {
    query = {
      where: {
        discipline: 'Software Engineering',
        category: {
          [Op.ne]: 'teacher change'
        }
      },
      order: [
        ['created_at', 'DESC'],
      ]
    }

  } else if (teacher_role == 'Coordinator Computer Science') {
    query = {
      where: {
        discipline: 'Computer Science',
        category: {
          [Op.ne]: 'teacher change'
        }
      },
      order: [
        ['created_at', 'DESC'],
      ]
    }

  }
  else if (teacher_role == 'Coordinator M. Phil.') {
    query = {
      where: {
        discipline: 'M. Phil.',
        category: {
          [Op.ne]: 'teacher change'
        }
      },
      order: [
        ['created_at', 'DESC'],
      ]
    }
  }
  else if (teacher_role == 'Lecturer') {
    query = 0;
  }
  Application.findAll(query)
    .then(result => {
      res.status(201).json({ result: result });
    })
    .catch(err => {
      res.status(201).json({ error: "Some error accurred while retrieving assignments." });
    });
};

// Retrieve all Announcements from the database.
exports.searchApplications = (req, res) => {
  const teacher_role = req.query.teacher_role;
  const application_type = req.query.application_type;

  let query;
  if (teacher_role == 'Chairman') {
    query = {
      where: {
        application_type: application_type
      },
      order: [
        ['created_at', 'DESC'],
      ]
    }

  }
  else if (teacher_role == 'Coordinator Software Engineering') {
    query = {
      where: {
        discipline: 'Software Engineering',
        category: {
          [Op.ne]: 'teacher change'
        },
        application_type: application_type
      },
      order: [
        ['created_at', 'DESC'],
      ]
    }

  } else if (teacher_role == 'Coordinator Computer Science') {
    query = {
      where: {
        discipline: 'Computer Science',
        category: {
          [Op.ne]: 'teacher change',
          application_type: application_type
        }
      },
      order: [
        ['created_at', 'DESC'],
      ]
    }

  }
  else if (teacher_role == 'Coordinator M. Phil.') {
    query = {
      where: {
        discipline: 'M. Phil.',
        category: {
          [Op.ne]: 'teacher change'
        },
        application_type: application_type
      },
      order: [
        ['created_at', 'DESC'],
      ]
    }
  }
  else if (teacher_role == 'Lecturer') {
    query = 0;
  }

  Application.findAll(query)
    .then(result => {
      res.status(201).json({ result: result });
    })
    .catch(err => {
      res.status(201).json({ error: "Some error accurred while retrieving assignments." });
    });

};


exports.forward = (req, res) => {
  const fo = {
    application_id: req.body.application_id,
    teacher_id: req.body.teacher,
  }
  ForwardedApplication.create(fo)
    .then((data) => {
      res.status(201).json({ success: "Application Forworded" });
    })
    .catch((err) => {
      res.status(201).json({ error: "Error while inseting data" });
    });
};


exports.forwardToVC = async (req, res) => {

  const firstViceChancellor = await ViceChancellor.findOne();
  const fo = {
    application_id: req.body.application_id,
    vice_chancellor_id: firstViceChancellor?.dataValues?.id
  }
  ForwardedApplication.create(fo)
    .then((data) => {
      res.status(201).json({ success: "Application Forworded" });
    })
    .catch((err) => {
      res.status(201).json({ error: "Error while inseting data" });
    });
};


exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the forwarded applications with the given application_id
    const forwardedApplications = await ForwardedApplication.findAll({
      where: { application_id: id },
      attributes: ["teacher_id"],
      raw: true,
    });

    // Extract teacher_ids from forwarded applications
    const teacherIds = forwardedApplications.map(app => app.teacher_id);

    // Find teachers with the extracted teacher_ids
    const teachers = await Teacher.findAll({
      where: { id: { [Op.in]: teacherIds } },
    });

    // Find the main application
    const application = await Application.findByPk(id);

    // Find remarks for the application along with related teachers
    const remarks = await Remark.findAll({
      where: { application_id: id },
      include: [{ model: Teacher }],
    });


    const firstViceChancellor = await ViceChancellor.findOne();

    const forwardedToVC = await ForwardedApplication.findOne({
      where: {
        vice_chancellor_id: firstViceChancellor?.dataValues?.id, // Replace with the Vice Chancellor's teacher_id
        application_id: id, // Replace with the specific application_id
      },
    });

    const isForwardedToVC = !!forwardedToVC;

    const teacherId = application.approved_or_rejected_by;

    // Find teacher with the extracted teacher ID
    const teacher = await Teacher.findByPk(teacherId);

    // Replace teacher ID with teacher's first and last name in application
    if (teacher) {
      application.approved_or_rejected_by = teacher.firstname + ' ' + teacher.lastname;
    }

    if (application.approved_or_rejected_by == 'VC') {
      application.approved_or_rejected_by = 'Vice Chancellor';
    }


    // Send the response with the gathered data
    res.status(201).json({ result: application, remarks, teachers, isForwardedToVC });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: `Error retrieving Application with id = ${id}` });
  }
}


// Update a Application by the id in the request
exports.approve = (req, res) => {
  const id = req.body.id;
  const application = {
    status: 'Accepted',
    approved_or_rejected_by: req.user_id,
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
    approved_or_rejected_by: req.user_id,
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



// Retrieve all Applications from the database.
exports.forwardedApplication = (req, res) => {
  ForwardedApplication.findAll({
    where: { teacher_id: req.user_id },
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
            .json({ error: "Some error accurred while retrieving applications." });
        });
    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving applications." });
    });
};


// Retrieve all Applications from the database.
exports.searchforwardedApplication = (req, res) => {
  const application_type = req.query.application_type;
  ForwardedApplication.findAll({
    where: { teacher_id: req.user_id },
    attributes: ["application_id"],
    raw: true,
  })
    .then((forwarded_applications) => {
      let applications_id = pluck(forwarded_applications, "application_id");
      Application.findAll({
        where: {
          id: {
            [Op.in]: applications_id,
          }, application_type: application_type
        },
      })
        .then((result) => {
          res.status(201).json({ result: result });
        })
        .catch((err) => {
          res
            .status(201)
            .json({ error: "Some error accurred while retrieving applications." });
        });
    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving applications." });
    });
};
