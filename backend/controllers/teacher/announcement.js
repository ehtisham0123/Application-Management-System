const db = require("../../models");
const Announcement = db.announcements;
const Teacher = db.teachers;
const ViceChancellor = db.viceChancellor;
const Admin = db.admins;

const Op = db.Op;
const bcrypt = require("bcrypt");
const fs = require("fs");

// Create and Save a new Announcement
exports.create = (req, res) => {
  let announcement = {
    name: req.body.name,
    details: req.body.details,
    discipline: req.body.discipline,
    session: req.body.session,
    teacher_id: req.user_id,
  };
  Announcement.create(announcement)
    .then((data) => {
      res.status(201).json({ success: "Announcement Added" });
    })
    .catch((err) => {
      res.status(201).json({ error: "Error while inseting data" });
    });
};

// Retrieve all Announcements from the database.
exports.findAll = (req, res) => {
  Announcement.findAll({
    order: [
      ['created_at', 'DESC'],
    ],
    include: [Admin,Teacher,ViceChancellor],
  })
    .then((result) => {
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving announcements." });
    });
}; 

// Retrieve all Announcements from the database.
exports.searchAnnouncements = (req, res) => {
  let session = req.query.session;
  let discipline = req.query.discipline;
  Announcement.findAll({
      order: [
      ['created_at', 'DESC'],
    ],
    where: {
      session: session,
      discipline: discipline,
    },
    include: [Admin,Teacher],
  })
    .then((result) => {
      console.log(result);
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving announcements." });
    });
};

// Find a single Announcement data with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Announcement.findByPk(id)
    .then((announcement) => {
      res.status(201).json({ announcement: announcement });
    })
};

// Update a Announcement by the id in the request
exports.update = (req, res) => {
  const id = req.body.id;
  Announcement.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          success: "Announcement was updated successfully."
        });
      } else {
        res.send({
          success: `Cannot update Announcement with id=${id}. Maybe Announcement was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        error: "Error updating Announcement with id=" + id
      });
    });
};

// Delete a Announcement with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Announcement.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Announcement was deleted successfully!",
        });
      } else {
        res.json({
          message: `Cannot delete Announcement with id=${id}. Maybe Announcement was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Announcement with id=" + id,
      });
    });
};
