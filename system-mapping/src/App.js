import ZoomPractice from './components/zoomPractice/ZoomPractice';
import SystemMap from './components/systemMap/SystemMap';

export default function App() {
  function toggleFullscreen(item) {
    let elem = document.getElementById(item);
    console.log(elem);
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
      <button onClick={() => toggleFullscreen('tweedle')}>
        Fullscreen Tweedle
      </button>
      <div className='section'>
        <p>Lorem ipsum</p>
        <SystemMap />
        <iframe
          id='tweedle'
          title='tweedle'
          src='http://www.joeluciano.io/tweedle'
          width='600'
          height='450'
          style={{ border: 0 }}
          allow='fullscreen'
          loading='lazy'
        />
      </div>
    </div>
  );
}
