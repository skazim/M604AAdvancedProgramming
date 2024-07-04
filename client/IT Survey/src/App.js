import './App.css';
import React , {useEffect, useState } from 'react';
import axios from 'axios';

import LeftNav from "../src/components/leftNav/leftNav";

function App() {
  return (
    <div className="App">
      <h1>Accidents in City and Bicycle Routes Analysis</h1>
      <LeftNav />
    </div>
  );
}

export default App;