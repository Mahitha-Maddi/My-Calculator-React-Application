import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CalculationsList from "./components/Calculations-List.component";


function App() {
  return (
    <Router>
      <Route path="/" exact component={CalculationsList}/>
    </Router>
  );
}

export default App;
