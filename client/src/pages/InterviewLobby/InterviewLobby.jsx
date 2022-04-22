import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./interviewLobby.scss";
import io from "socket.io-client";

import {
  getOneInterview,
  getAllUsersThatApplied,
} from "../../actions/interviewActions";
import { Link, useNavigate } from "react-router-dom";
import { getAUser } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

// Components
import Navbar from "../../components/Navbar/Navbar";
import JobDetailsLobby from "../../components/JobDetailsLobby/JobDetailsLobby";
import LobbyQueue from "../../components/LobbyQueue/LobbyQueue";

const socket = io.connect("http://localhost:3001/");

const InterviewLobby = ({ darkTheme, setDarkTheme }) => {
  const [interviewQueue, setInterviewQueue] = useState([]);
  const [showJoin, setShowJoin] = useState(true);
  const [currentCalling, setCurrentCalling] = useState("");
  const [link, setLink] = useState("");
  const [hostId, setHostId] = useState("");
  const [userSocketId, setUserSocketId] = useState("");
  const [userJoinedCall, setUserJoinedCall] = useState(false);
  const history = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch();

  const oneInterview = useSelector((state) => state.oneInterview);
  const { interview, loading } = oneInterview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getUsersThatApplied = useSelector((state) => state.getUsersThatApplied);
  const { usersThatApplied } = getUsersThatApplied;

  useEffect(() => {
    if (!userInfo) {
      history("/login");
    }
    id && dispatch(getOneInterview(id));
    id && dispatch(getAllUsersThatApplied(id));
    id && socket.emit("loadQueue", { interviewId: id });

    console.log(interview, "interview");

    if (sessionStorage.getItem("refresh")) {
      sessionStorage.clear();
      window.location.reload();
    }

    if (sessionStorage.getItem("userEnded")) {
      sessionStorage.clear();
    }
  }, []);

  const joinQueue = () => {
    if (userInfo && id) {
      const user = {
        userId: userInfo?._id,
        interviewId: id,
        socketId: userSocketId,
      };
      socket.emit("joinInterviewQueue", user);
      setShowJoin(false);
    }
  };

  const leaveQueue = () => {
    if (userInfo && id) {
      const user = {
        userId: userInfo?._id,
        interviewId: id,
        socketId: userSocketId,
      };
      socket.emit("leaveInterviewQueue", user);
      setShowJoin(true);
    }
  };

  const callUser = (userId, socketId) => {
    // console.log(userId);
    if (userInfo?.userType.toLowerCase() == "employer") {
      let data = {
        userId,
        interviewId: id,
        hostId: userInfo?._id,
        link: `/interview/${id}/${userInfo?._id}/${userId}`,
        socketId: socketId,
      };
      socket.emit("callUser", data);
      // history.push(link);
    }
  };

  const removeUserFromQueue = (userId) => {
    if (userId && id) {
      // console.log("userId: " + userId);
      const user = {
        userId: userId,
        interviewId: id,
      };
      socket.emit("leaveInterviewQueue", user);
    }
  };

  const userJoinedCallHandler = () => {
    if (userInfo?.userType.toLowerCase() == "user") {
      const data = {
        calling: true,
        interviewId: id,
        userId: userInfo?._id,
      };
      const user = data;
      socket.emit("userJoinedCall", data);
      socket.emit("leaveInterviewQueue", user);
    }
  };

  useEffect(() => {
    socket.on("userJoinedInterviewQueue", (queue) => {
      // console.log("user joined queue: ", queue);
      // setInterviewQueue(queue);
      // console.log("User joined queue: ", interviewQueue);
    });
    socket.on("userLeftInterviewQueue", (queue) => {
      // console.log("Queue: ", queue);
      // setInterviewQueue(queue)
      // console.log("User left queue: ", interviewQueue);
    });

    socket.on("loadedInterviewQueue", (queue) => {
      // console.log("Loaded Queue: ", queue);
      setInterviewQueue(queue);
    });

    socket.on(
      "callingUser",
      ({ userId, interviewId, hostId, link, socketId }) => {
        setCurrentCalling(userId);
        setHostId(hostId);
        setLink(link);
        setUserSocketId(socketId);
      }
    );

    socket.on("userHasJoinedCall", ({ interviewId, calling }) => {
      setUserJoinedCall(true);
    });
  }, [socket]);

  if (loading) return "Loading...";

  return (
    <div className={darkTheme ? "lobby dark" : "lobby"}>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      {interview.map((job) => (
        <>
          <JobDetailsLobby
            darkTheme={darkTheme}
            setDarkTheme={setDarkTheme}
            job={job}
          />
          <LobbyQueue
            darkTheme={darkTheme}
            interviewId={id}
            showJoin={showJoin}
            joinQueue={joinQueue}
            leaveQueue={leaveQueue}
            interviewQueue={interviewQueue}
            callUser={callUser}
          />
        </>
      ))}
    </div>
  );
};

export default InterviewLobby;
