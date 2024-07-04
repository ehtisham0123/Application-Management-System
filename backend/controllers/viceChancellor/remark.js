const db = require("../../models");
const Remark  = db.remarks;

// Create and Save a new remark
exports.create = (req, res) => {
  let remark = {
    details: req.body.remark,
    vice_chancellor_id : req.user_id,
    application_id: req.body.application_id,
  };
  
  Remark.create(remark)
    .then((data) => {
      res.status(201).json({ success: "remark Added" });
    })
    .catch((err) => {
      console.log(err)
      res.status(201).json({ error: "Error while inseting data" });
    });
};


// Delete a remark with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Remark.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "remark was deleted successfully!",
        });
      } else {
        res.json({
          message: `Cannot delete remark with id=${id}. Maybe remark was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete remark with id=" + id,
      });
    });
};