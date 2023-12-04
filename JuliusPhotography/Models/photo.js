const con = require('../db.js');

const createPhotoTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS photo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            path VARCHAR(255),
            size INT
        )
    `;

    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Photo table created successfully");
    });
};

const createPhoto = (photoData) => {
    const { name, path, size } = photoData;
    const sql = `INSERT INTO photo (name, path, size) VALUES ('${name}', '${path}', '${size}')`;

    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Photo created successfully");
    });
};
const updatePhoto = (id, photoData) => {
    const { name, path, size } = photoData;
    const sql = `UPDATE photo SET name = '${name}', path = '${path}', size = '${size}' WHERE id = ${id}`;
  
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Photo updated successfully");
    });
  };
  const deletePhoto = (id) => {
    const sql = `DELETE FROM photo WHERE id = ${id}`;
  
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Photo deleted successfully");
    });
  };


module.exports = {
    createPhotoTable,
    createPhoto,
    updatePhoto,
    deletePhoto
};