import './App.css';
import React , {useEffect, useState } from 'react';
import axios from 'axios';
import {Gender} from './components/Gender';
import {Accidents} from './components/Accidents';


function App() {

  const [accidents, setAccidents] = useState({});
  const [band, setBand] = useState({});
  const [gender , setGender] = useState({});
  const [graphList, setGraphList] = useState({});

  useEffect (()=>{
    axios.get('http://127.0.0.1:5000/graphList')
    .then(res=>{
      setGraphList(res.data)
    })
    .catch(error=>{
      console.error('Error while fetching GraphList',error);
    })
    axios.get('http://127.0.0.1:5000/getAccidentSeverity')
    .then(res =>{
      setAccidents(res.data)
    })
    .catch(error =>{
      console.error('Error fetching data',error)
    });

    axios.get('http://127.0.0.1:5000/getGender')
    .then(res=>{
      setGender(res.data)
    })
    .catch(error=>{
      console.error('Error fetching columns',error);
    })
    axios.get('http://127.0.0.1:5000/getAgeBand')
    .then(res=>{
      setBand(res.data)
    })
    .catch(error=>{
      console.error('Error while fetching Age of bands',error)
    })
  },[]);
  return (
    <div className="App">
      <h1>Bicycle Routes Analysis</h1>
      <Gender values={gender} />
      <Accidents values={accidents}/>
    </div>
  );
}

export default App;