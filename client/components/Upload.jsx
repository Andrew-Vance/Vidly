import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, updateFile] = useState(null);
  const [fileName, updateFileName] = useState('');
  const [description, updateDescription] = useState('');
  const [uploaded, updateUploaded] = useState(false);
  const [uploading, updateUploading] = useState(false);

  const handleChange = (e) => {
    let file = e.target.files[0];
    updateFile(file);
  };

  const uploadFile = (e) => {
    e.preventDefault();
    updateUploaded(false);

    if (file.type === 'video/mp4') {
      updateUploading(true);
      var formData = new FormData();
      formData.append('file', file, fileName);

      axios.post(`/video/${description}`, formData, {
        headers: {
          'Content-Type': 'multipart/formdata'
        }
      })
      .then(response => {
        updateUploaded(true);
        updateUploading(false);
      })
      .catch(err => {
        window.alert(err);
      })
    } else {
      window.alert('wrong file type, expecting an mp4');
    }


  };

  const renderUploaded = () => {
    if (uploaded) {
      return (
        <div id='upload-confirmation'>
          UPLOADED AND PROCESSING
        </div>
      );
    } else if (uploading) {
      return (
        <div id='uploading-confirmation'>
          <span className="loader loader-quart"></span>
          uploading
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