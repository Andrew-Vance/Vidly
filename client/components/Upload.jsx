import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, updateFile] = useState(null);
  const [fileName, updateFileName] = useState('');
  const [description, updateDescription] = useState('');
  const [uploaded, updateUploaded] = useState(false);

  const handleChange = (e) => {
    let file = e.target.files[0];
    updateFile(file);
  };

  const uploadFile = (e) => {
    e.preventDefault();
    updateUploaded(false);

    if (file.type === 'video/mp4') {
      var formData = new FormData();
      formData.append('file', file, fileName);

      axios.post('/video', formData, {
        headers: {
          'Content-Type': 'multipart/formdata'
        }
      })
      .then(response => {
        axios.patch(`/video/${fileName}`, {description})
        .then(result => {
          updateUploaded(true);
        })
        .catch(err => {
          window.alert('error updating video descrption');
          console.log(err);
        });
      })
      .catch(err => {
        window.alert(err.response.data);
      })
    } else {
      window.alert('wrong file type, expecting an mp4');
    }


  };

  const renderUploaded = () => {
    if (uploaded) {
      return (
        <div id='upload-confirmation'>
          UPLOADED
        </div>
      );
    }
  };

  return (
    <div className='uploadView'>
      <form className='uploadForm' onSubmit={uploadFile}>
      <div>Title of Video: <input className='titleInput' type="text" name="title" required onChange={(e)=>{updateFileName(e.target.value + '.mp4')}}/></div>
      Video Description: <input className='descriptionInput' type='text' onChange={(e) => {updateDescription(e.target.value)}}></input> <br></br>
      <input type="file" onChange={handleChange} />
      <input type="submit" value="Upload" />
      </form>
      {renderUploaded()}
    </div>
  );
};

export default Upload;