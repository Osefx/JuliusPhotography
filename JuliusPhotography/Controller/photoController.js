const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // replace 'uploads/' with your desired destination
const path = require('path');
const router = express.Router();
const Photo = require('../Models/photo');
const con = require('../db.js');
const fs = require('fs');
// GET /photos
router.get('/', (req, res) => {
        Photo.getPhotos((err, photos) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: err.message });
            } else {
                res.json(photos);
            }
        });
    });

// POST /photos
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb){
      cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    }
  });
  
  router.post('/', upload.single('image'), async (req, res) => {
    const photo = {
      name: req.file.filename,
      path: '/uploads/' + req.file.filename,
      size: req.file.size
    };
  
    try {
      await Photo.createPhoto(photo);
      res.status(201).json(photo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// PUT /photos/:id
router.put('/:id', upload.single('image'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    const { originalname: name, size } = req.file;
    const path = req.file.path; // get the path of the uploaded file
  
    const sql = `UPDATE photo SET name = ?, path = ?, size = ? WHERE id = ?`;
  
    con.query(sql, [name, path, size, req.params.id], (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: 'Updated Photo' });
      }
    });
  });

// DELETE /photos/:id
router.delete('/:id', getPhoto, async (req, res) => {
    const baseDir = 'C:\\Users\\h_aso\\Desktop\\DEV\\JuliusPhotography\\JuliusPhotography\\';
    fs.unlink(baseDir + res.photo.path, (err) => { //C:\Users\h_aso\Desktop\DEV\JuliusPhotography\JuliusPhotography\uploads\c77a8702e30f2c463d0e4ebf1c0981b9
        if (err) {
            console.error(err);
        }
        });
    try {
      const sql = `DELETE FROM photo WHERE id = ${req.params.id}`;
      con.query(sql, (err, result) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.json({ message: 'Deleted Photo' });
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

async function getPhoto(req, res, next) {
    Photo.getPhotoById(req.params.id, (err, photo) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      } else if (photo == null) {
        return res.status(404).json({ message: 'Cannot find photo' });
      } else {
        res.photo = photo;
        next();
      }
    });
  }

module.exports = router;