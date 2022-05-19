import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./interviewLobby.scss";
import io from "socket.io-client";

import {
  getOneInterview,
  getAllUsersThatApplied,
} from "../../actions/interviewActions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAUser } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

// Components
import Navbar from "../../components/Navbar/Navbar";
import JobDetailsLobby from "../../components/JobDetailsLobby/JobDetailsLobby";
import LobbyQueue from "../../components/LobbyQueue/LobbyQueue";
import CallingModal from "../../components/Modals/CallingModal";
import ReceivingCallModal from "../../components/Modals/ReceivingCallModal";
import CallAcceptedModal from "../../components/Modals/CallAcceptedModal";
import LoadingJob from "../../components/LoadingJob/LoadingJob";

// const socket = io.connect("http://localhost:3001/");
const socket = io.connect("https://v2lhbackend.herokuapp.com/");

const InterviewLobby = ({ darkTheme, setDarkTheme }) => {
  const [interviewQueue, setInterviewQueue] = useState([]);
  const [showJoin, setShowJoin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showReceivingCallModal, setShowReceivingCallModal] = useState(false);
  const [showCallAcceptedModal, setShowCallAcceptedModal] = useState(false);
  const [currentCalling, setCurrentCalling] = useState("");
  const [callingUsername, setCallingUsername] = useState("");
  const [link, setLink] = useState("");
  const [hostId, setHostId] = useState("");
  const [userSocketId, setUserSocketId] = useState("");
  const [userJoinedCall, setUserJoinedCall] = useState(false);
  const history = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const dispatch = useDispatch();

  const oneInterview = useSelector((state) => state.oneInterview);
  const { interview, loading } = oneInterview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getUsersThatApplied = useSelector((state) => state.getUsersThatApplied);
  const { usersThatApplied } = getUsersThatApplied;

  // useEffect(() => {
  //   console.log('LOCATION CHANGED');
  //   // sessionStorage.setItem("locationChanged", true);
  // }, [location]);

  useEffect(() => {
    if (!userInfo) {
      history("/login");
    }
    id && dispatch(getOneInterview(id));
    id && dispatch(getAllUsersThatApplied(id));
    id && socket.emit("loadQueue", { interviewId: id });

    // console.log(interview, "interview");

    return () => {
      // alert("DISCONNECT");
      leaveQueue();
      socket.disconnect();
    };
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
    console.log("INT QUEUE", interviewQueue);
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
    console.log("INT QUEUE", interviewQueue);
  };

  const callUser = (userId, socketId, name) => {
    // console.log(userId);
    if (userInfo?.userType.toLowerCase() == "employer") {
      let data = {
        userId,
        interviewId: id,
        hostId: userInfo?._id,
        link: `/interview/room/${id}/${userInfo?._id}/${userId}`,
        socketId: socketId,
      };
      socket.emit("callUser", data);
      // history.push(link);
      setShowModal(true);
      setCallingUsername(name);
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
      setShowJoin(true);
      const user = data;
      socket.emit("userJoinedCall", data);
      socket.emit("leaveInterviewQueue", user);
    }
  };

  useEffect(() => {
    socket.on("loadedInterviewQueue", (queue) => {
      // console.log("Loaded Queue: ", queue);
      setInterviewQueue(queue);
      console.log(queue, "queue");
    });

    socket.on(
      "callingUser",
      ({ userId, interviewId, hostId, link, socketId }) => {
        setCurrentCalling(userId);
        setHostId(hostId);
        setLink(link);
        setUserSocketId(socketId);
        setShowReceivingCallModal(true);
      }
    );

    socket.on("userHasJoinedCall", ({ interviewId, calling }) => {
      setUserJoinedCall(true);
      setShowModal(false);
      setShowCallAcceptedModal(true);
    });

    socket.on("hostCancelledCallEvent", () => {
      setShowReceivingCallModal(false);
      setShowModal(false);
      setCallingUsername("");
    });

    socket.on("guestCancelledCallEvent", () => {
      setShowModal(false);
      setCallingUsername("");
      setShowReceivingCallModal(false);
    });
  }, [socket]);

  const closeCallingModal = () => {
    setShowModal(false);
    setCallingUsername("");
    socket.emit("hostCancelledCall", { interviewId: id });
  };
  const closeReceivingCallModal = () => {
    setShowReceivingCallModal(false);
    setCallingUsername("");
    socket.emit("guestCancelledCall", { interviewId: id });
  };

  const closeCallAcceptedModal = () => {
    setShowCallAcceptedModal(false);
    setCallingUsername("");
  };

  // if (loading) return "Loading...";

  return (
    <div className={darkTheme ? "lobby dark" : "lobby"}>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      {loading ? (
        <>
          <LoadingJob />
          <LoadingJob />
        </>
      ) : (
        <>
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
              <CallingModal
                showModal={showModal}
                closeCallingModal={closeCallingModal}
                name={callingUsername}
              />
              <ReceivingCallModal
                currentCalling={currentCalling}
                id={userInfo?._id}
                closeReceivingCallModal={closeReceivingCallModal}
                showReceivingCallModal={showReceivingCallModal}
                userJoinedCallHandler={userJoinedCallHandler}
                link={link}
              />
              <CallAcceptedModal
                userJoinedCall={userJoinedCall}
                id={userInfo?._id}
                hostId={hostId}
                closeCallAcceptedModal={closeCallAcceptedModal}
                showCallAcceptedModal={showCallAcceptedModal}
                link={link}
              />
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default InterviewLobby;
