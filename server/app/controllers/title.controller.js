const db = require('../models');
const Title = db.titles;

// Create and Save a new Title
exports.create = (req, res) => {
  // Validate request
  if (!req.body.dogId) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Title
  const title = new Title({
    dogId: req.body.dogId,
    venue: req.body.venue,
    name: req.body.name,
    dateReceived: req.body.dateReceived
  });

  // Save the Title in the database
  title.save(title)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Title.'
      });
    });
};

// Retrieve all Titles from the database.
exports.findAll = (req, res) => {
  const dogId = req.query.dogId;
  const condition = dogId ? { dogId: { $regex: new RegExp(dogId), $options: 'i' } } : {};

  Title.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Titles.'
      });
    });
};

// Find a single Title with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Title.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Title ${id} was not found.`});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Title ${id}`});
    });
};

// Update a Title by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!'
    });
  }

  const id = req.params.id;

  Title.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Title ${id}. Maybe Title was not found!`
        });
      } else res.send({ message: `Title ${id} was successfully updated.`});
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating Title with ID ${id}`
      });
    });
};

// Delete a Title with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Title.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Title ${id}. Maybe the Title was not found.`
        });
      } else {
        res.send({
          message: `Title ${id} was successfully deleted.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Title ${id}`
      });
    });
};

// Delete all Title from the database.
exports.deleteAll = (req, res) => {
  Title.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Titles were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Titles.'
      });
    });
};
