import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Accidents } from '../charts/Accidents';
import { Gender } from '../charts/Gender';
import { Predict } from '../predict/predict';


const App = () => {
  const genderData = {
    category: ["Women", "Men", "Children"],
    count: [50, 80, 30]
  };
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Accidents</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/gender">Gender</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/predict">Predict</Link>
          </li>
        </ul>
      </div>
    </nav>
      <Routes>
        <Route path="/" element={<Accidents />} />
        <Route path="/gender" element={<Gender values={genderData}/>} />
        <Route path="/predict" element={<Predict />} />
      </Routes>
    </Router>
  );
};

export default App;
