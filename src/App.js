import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoToMp3Converter from './components/VideoToMp3Converter';

function App() {
  return (
    <div
      style={{ height: '100vh' }}
      className=' d-flex align-items-center w-100'
    >
      <div className='row g-2 w-100'>
        <div className='col-lg-4'></div>
        <div className='col-lg-4'>
          <VideoToMp3Converter />
        </div>
        <div className='col-lg-4'></div>
      </div>
    </div>
  );
}

export default App;
