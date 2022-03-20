import './App.css';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from 'react';

// Pages
import Login from './pages/Login/Login';
import FindJobs from './pages/FindJobs/FindJobs';
import ViewJob from './pages/ViewJob/ViewJob';


function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <Router>
        <Switch>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<FindJobs darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
          <Route exact path="/job/:id" element={<ViewJob darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
        </Switch>
    </Router>
  );
}

export default App;
