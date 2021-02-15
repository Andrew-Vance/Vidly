import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, updateFile] = useState(null);
  const [fileName, updateFileName] = useState('');

  const handleChange = (e) => {
    let file = e.target.files[0];
    updateFile(file);
  };

  const uploadFile = (e) => {
    e.preventDefault();

    if (file.type === 'video/mp4') {
      var formData = new FormData();
      formData.append('file', file, fileName);

      axios.post('/video', formData, {
        headers: {
          'Content-Type': 'multipart/formdata'
        }
      })
      .then(response => {
        //update client side video list here
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      window.alert('wrong file type, expecting an mp4');
    }


  };

  return (
    <div className='uploadView'>
      <form className='uploadForm' onSubmit={uploadFile}>
      <div>Title of Video: <input type="text" name="title" onChange={(e)=>{updateFileName(e.target.value + '.mp4')}}/></div>
      <input type="file" onChange={handleChange} />
      <input type="submit" value="Upload" />
      </form>
    </div>
  );
};

export default Upload;