const express = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3000;
const db = require('../database');
const path = require('path');
const createThumbnail = require('../Utils/createThumbnail.js');
const upload = require('../Utils/uploadToS3.js');

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
        return;

      } else {
        file.mv(`/Users/andrewvance/Projects/Vidly/files/${file.name}`, async (err) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
          }

          let source = path.resolve(`./files/${file.name}`);
          let target = path.resolve(`./files/${file.name.slice(0, -4)}.jpg"`);
          await createThumbnail(source, target);

          let thumbFile = fs.readFileSync(`./files/${file.name.slice(0, -4)}.jpg`);

          let thumbUrl = await upload(`${file.name.slice(0, -4)}.jpg`, thumbFile, 'image/jpeg');
          let videoUrl = await upload(file.name, file.data, 'video/mp4');

          db.create(file.name, videoUrl, thumbUrl)
          .then(result => {
            fs.unlink(path.resolve(`./files/${file.name}`), () => {});
            fs.unlink(path.resolve(`./files/${file.name.slice(0, -4)}.jpg`), () => {});
            res.send('uploaded');
          })
          .catch(err => {
            console.log(err);
            res.status(500).send('file upload unsuccessful');
          });

        });

      }
    })
    .catch(err =>{
      res.status(500).send('server error');
    })
  }
});

app.patch('/video/:name', (req, res) => {
  let name = req.params.name;
  let description = req.body.description;
  db.update(name, description)
  .then(result => {
    res.status(200).send('description updated');
  })
  .catch(err => {
    console.log(err);
    res.status(500).send('error updating description');
  })
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})