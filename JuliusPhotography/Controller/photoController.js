const express = require('express');
const router = express.Router();
const Photo = require('../Models/photo');

// GET /photos
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /photos
router.post('/', async (req, res) => {
  const photo = new Photo({
    name: req.body.name,
    path: req.body.path,
    size: req.body.size
  });

  try {
    const newPhoto = await photo.save();
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /photos/:id
router.put('/:id', getPhoto, async (req, res) => {
  res.photo.name = req.body.name;
  res.photo.path = req.body.path;
  res.photo.size = req.body.size;

  try {
    const updatedPhoto = await res.photo.save();
    res.json(updatedPhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /photos/:id
router.delete('/:id', getPhoto, async (req, res) => {
  try {
    await res.photo.remove();
    res.json({ message: 'Deleted Photo' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPhoto(req, res, next) {
  let photo;

  try {
    photo = await Photo.findById(req.params.id);
    if (photo == null) {
      return res.status(404).json({ message: 'Cannot find photo' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.photo = photo;
  next();
}

module.exports = router;