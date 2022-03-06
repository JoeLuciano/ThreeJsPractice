import { useState } from 'react';
import ZoomPractice from './components/zoomPractice/ZoomPractice';
import SystemMap from './components/systemMap/SystemMap';
import { motion } from 'framer-motion';

const iframeVariant = {
  small: { x: 0, width: '25rem', height: '40rem', transition: { duration: 1 } },
  big: {
    x: -300,
    width: '100vw',
    height: '50rem',
    transition: { duration: 1 },
  },
};

export default function App() {
  const [fullscreenTweedle, setFullscreenTweedle] = useState(false);

  function toggleFullscreen(item) {
    let elem = document.getElementById(item);
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <div className='app'>
      <h1>Pracitce</h1>
      <button onClick={() => toggleFullscreen('systemMap')}>System Map</button>
      <button onClick={() => setFullscreenTweedle((prev) => !prev)}>
        Fullscreen Tweedle
      </button>
      <div className='section'>
        <p>Lorem ipsum</p>
        <ZoomPractice />
        <SystemMap />
        <Tweedle type={fullscreenTweedle ? 'big' : 'small'} />
      </div>
    </div>
  );
}

const Tweedle = ({ type }) => {
  return (
    <motion.iframe
      variants={iframeVariant}
      animate={type}
      exit='exit'
      layoutId='tweedle'
      id='tweedleSmall'
      title='tweedleSmall'
      src='http://www.joeluciano.io/tweedle'
      style={{ border: 0 }}
      allow='fullscreen'
      loading='lazy'
    />
  );
};
