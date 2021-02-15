import React, { useState, useEffect } from 'react';

const App = () => {

  const [view, updateView] = useState('browse');
  const [video, updateVideo] = useState(null);

  const changeView = (newView, videoName = null) => {
    updateView(newView);
    updateVideo(videoName);
  }

  const renderView = () => {
    if (view === 'video') {

    } else if (view === 'browse') {

    } else if (view === 'upload') {

    }
  }

  return (
    <div>
      <div className='header'>
        <span className='nav' onClick={() => {changeView('Browse')}}>Browse</span>
        <span className='nav' onClick={() => {changeView('Upload')}}>Upload</span>
      </div>
    </div>
  );
};

export default App;