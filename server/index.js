const express = require('express');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3000;

const app = express();

app.use(fileUpload());
app.use(express.json());

app.use('/', express.static('dist'));

app.post('/video', (req, res) => {
  if (req.files == null) {
    res.status(400).send('no file was uploaded')
  } else {
    let file = req.files.file;

    file.mv(`/Users/andrewvance/Projects/Vidly/files/${file.name}`, err => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      res.send(file.name);
    })
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})