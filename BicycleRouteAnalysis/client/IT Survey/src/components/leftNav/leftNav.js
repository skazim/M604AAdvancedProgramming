import React from 'react';
import { useEffect ,useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Accidents } from '../charts/Accidents';
import { Gender } from '../charts/Gender';
import { AccidentsByWeek } from '../charts/AccidentsByWeek';

const App = () => {
    const [gender , setGender] = useState({});
    useEffect (()=>{
        axios.get('http://127.0.0.1:5000/getGender')
        .then(res=>{
        setGender(res.data)
        })
        .catch(error=>{
        console.error('Error fetching columns',error);
        })
        
    })
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Accidents</Link>
          </li>
          <li>
            <Link to="/gender">Gender</Link>
          </li>
          <li>
            <Link to="/accidentperweeks">Accidents per Week</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Accidents />} />
        <Route path="/gender" element={<Gender values={gender}/>} />
        <Route path="/accidentperweeks" element={<AccidentsByWeek />} />
      </Routes>
    </Router>
  );
};

export default App;
