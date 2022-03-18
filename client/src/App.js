import './App.css';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link
} from "react-router-dom";

// Pages
import FindJobs from './pages/FindJobs/FindJobs';


function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" element={<FindJobs />} />
        </Switch>
    </Router>
  );
}

export default App;
