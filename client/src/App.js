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
import Register from './pages/Register/Register';
import FindJobs from './pages/FindJobs/FindJobs';
import ViewJob from './pages/ViewJob/ViewJob';
import SavedJobs from './pages/SavedJobs/SavedJobs';
import Applications from './pages/Applications/Applications';
import ViewApplied from './pages/ViewApplied/ViewApplied';
import PostJob from './pages/PostJob/PostJob';
import EditProfile from './pages/EditProfile/EditProfile';
import InterviewsManager from './pages/InterviewsManager/InterviewsManager';
import InterviewLobby from './pages/InterviewLobby/InterviewLobby';
// import Room from './pages/Room/Room';
import Room2 from './pages/Room/Room2';


function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <Router>
        <Switch>
          <Route exact path="/login/:registerSuccess" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<FindJobs darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
          <Route exact path="/job/:id" element={<ViewJob darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
          <Route exact path="/saved" element={<SavedJobs darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
          <Route exact path="/applications" element={<Applications darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
          <Route exact path="/applications/:jobId" element={<ViewApplied darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
          <Route exact path="/post" element={<PostJob darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
          <Route exact path="/account" element={<EditProfile darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
          <Route exact path="/manage/interviews" element={<InterviewsManager darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
          // <Route exact path="/interview/:id/lobby" element={<InterviewLobby darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
          {/* <Route exact path="/interview/room/:interviewId/:hostId/:userId" element={<Room darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} /> */}
          // <Route exact path="/interview/room/:interviewId/:hostId/:userId" element={<Room2 darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
        </Switch>
    </Router>
  );
}

export default App;
