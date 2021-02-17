import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';
import VideoEntry from './VideoEntry.jsx';

const Browse = ({ changeView }) => {

  const [videos, updateVideos] = useState([]);

  useEffect(() => {
    axios.get('/videos')
    .then(results => {
      updateVideos(results.data);
    })
  }, []);

  return (
     _.map(videos, video => {
      return <li key={video.id} onClick={()=>{changeView('video', video)}}> < VideoEntry video={video} changeView={changeView} /> </li>;
     })
  );
};

export default Browse;