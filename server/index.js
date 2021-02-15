const express = require('express');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3000;
const db = require('../database');

const app = express();

app.use(fileUpload());
app.use(express.json());

app.use('/', express.static('dist'));

app.get('/videos', (req, res) => {
  db.getAll()
  .then(results => {
    res.send(results);
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
});

app.post('/video', (req, res) => {
  if (req.files == null) {
    res.status(400).send('no file was uploaded')
  } else {
    let file = req.files.file;

    db.findOne(file.name)
    .then(results => {
      if (results.length > 0) {
        res.status(400).send('video name already exists');
      } else {
        file.mv(`/Users/andrewvance/Projects/Vidly/files/${file.name}`, err => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          }

          db.create(file.name)
          .then(result => {
            res.send(file.name);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send('file upload unsuccessful');
          })
        })
      }
    })

  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})