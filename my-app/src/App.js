import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const nhacRef = useRef(null);
  const playRef = useRef(null);
  const pauseRef = useRef(null);
  const [vi_tri, setVi_tri] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, []);

  const Play = () => {
    nhacRef.current.play();
    playRef.current.style.display = 'none';
    pauseRef.current.style.display = 'inline';
  };

  const Pause = () => {
    nhacRef.current.pause();
    playRef.current.style.display = 'inline';
    pauseRef.current.style.display = 'none';
  };

  const Next = () => {
    playRef.current.style.display = 'none';
    pauseRef.current.style.display = 'inline';
    if (vi_tri < 3) {
      setVi_tri(vi_tri + 1);
    } else {
      setVi_tri(vi_tri - 2);
    }
  };

  const Back = () => {
    playRef.current.style.display = 'inline';
    pauseRef.current.style.display = 'none';
    if (vi_tri > 0) {
      setVi_tri(vi_tri - 1);
    } else {
      setVi_tri(vi_tri + 3);
    }
  };

  return (
    <div className="App">
      <div className="Box">
        <div className="Picture">
          <img className="cat_img" src={data[vi_tri]?.anh} alt={data[vi_tri]?.name} />
        </div>
        <div className="Name">
          <p className="Name_nhac">{data[vi_tri]?.name}</p>
        </div>
        <div className="Controll">
          <button onClick={Back}>Back</button>
          <button className="Play" onClick={Play} ref={playRef}>
            <i className="fa fa-play"></i>
          </button>
          <button className="Dung" onClick={Pause} ref={pauseRef}>
            <i className="fa fa-pause"></i>
          </button>
          <button onClick={Next}>Next</button>
        </div>
        <audio src={data[vi_tri]?.link} controls loop ref={nhacRef}></audio>
      </div>
    </div>
  );
}

export default App;






