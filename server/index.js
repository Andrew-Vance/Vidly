const express = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3000;
const db = require('../database');
const thumb = require('node-video-thumb');
const path = require('path');

const app = express();

app.use(fileUpload());
app.use(express.json());

app.use('/', express.static('dist'));

app.get('/video/:name', (req, res) => {
  const path = `./files/${req.params.name}`
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});

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

app.get('/thumbnail/:name', (req, res) => {
  let fileLocation = path.resolve(`./files/${req.params.name.slice(0, -4)}.jpg`)
  res.sendFile(fileLocation);
})

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
            thumb({
              source: path.resolve(`./files/${file.name}`),
              target: path.resolve(`./files/${file.name.slice(0, -4)}.jpg"`),
              width: 480,
              height: 340,
              seconds: 10
            })

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