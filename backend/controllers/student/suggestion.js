const db = require("../../models");
const Suggestion = db.suggestions;
const Student = db.students;

// Create and Save a new Suggestion
exports.create = (req, res) => {
  let suggestion = {
    name: req.body.name,
    details: req.body.details,
    isHidden: req.body.isHidden,
    student_id: req.user_id,
  };
  console.log(suggestion);
  Suggestion.create(suggestion)
    .then((data) => {
      res.status(201).json({ success: "Suggestion Added" });
    })
    .catch((err) => {
      res.status(201).json({ error: "Error while inseting data" });
    });
};

// Retrieve all Suggestions from the database.
exports.findAll = (req, res) => {
  Suggestion.findAll({
    order: [
      ['created_at', 'DESC'],
    ],
    include: [Student],
  })
    .then((result) => {
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving suggestions." });
    });
}; 

// Update a Suggestion by the id in the request
exports.update = (req, res) => {
  const id = req.body.id;
  Suggestion.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          success: "Suggestion was updated successfully."
        });
      } else {
        res.send({
          success: `Cannot update Suggestion with id=${id}. Maybe Suggestion was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        error: "Error updating Suggestion with id=" + id
      });
    });
};

// Delete a Suggestion with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Suggestion.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Suggestion was deleted successfully!",
        });
      } else {
        res.json({
          message: `Cannot delete Suggestion with id=${id}. Maybe Suggestion was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Suggestion with id=" + id,
      });
    });
};

// Find a single Announcement data with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Suggestion.findByPk(id)
    .then((suggestion) => {
      res.status(201).json({ suggestion: suggestion });
    })
};