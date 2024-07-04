const db = require("../../models");
const Announcement = db.announcements;
const Student = db.students;
const Teacher = db.teachers;
const ViceChancellor = db.viceChancellor;
const Admin = db.admins;
const Op = db.Op;
const bcrypt = require("bcrypt");
const fs = require("fs");

// Retrieve all Announcements from the database.
exports.findAll = (req, res) => {
  Student.findByPk(req.user_id)
    .then((student) => {
      Announcement.findAll({
        order: [
          ['created_at', 'DESC'],
        ],
        include: [Admin,Teacher,ViceChancellor],
         where: {
          session: student.dataValues.session,
          discipline: student.dataValues.discipline,
        },
      })
        .then((result) => {
          console.log("result " + result)
          res.status(201).json({ result: result });
        })
        .catch((err) => {
          res
            .status(201)
            .json({ error: "Some error accurred while retrieving announcements." });
        });
    })
};

