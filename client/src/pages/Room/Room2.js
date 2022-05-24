import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import "./room2.scss";

import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAUser } from "../../actions/userActions";

import { GrDocumentText } from "react-icons/gr";
import { BsFillFileTextFill } from "react-icons/bs";
import { GoGlobe } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";

import GuestLoader from './Loaders/GuestLoader';
import WorkExp from "./WorkExp/WorkExp";
import Edu from "./Edu/Edu";
import Navbar from "../../components/Navbar/Navbar";
import Loader from "../../components/Loader/Loader";
import joinedAudio from "./joinAudio.mp3";
import leaveAudio from "./leaveAudio.mp3";

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <video className="guest-video" muted playsInline autoPlay ref={ref} />;
};

const Room2 = ({ darkTheme, setDarkTheme }) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  // const roomID = props.match.params.roomID;
  const [roomView, setRoomView] = useState(1);
  const [showEndCallButton, setShowEndCallButton] = useState(false);
  const { interviewId, hostId, userId } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getUser = useSelector((state) => state.getUser);
  const { user, loading } = getUser;

  const playJoinSound = () => {
    var audio = document.getElementById("join-audio");
    audio.play();
  };

  const playLeaveSound = () => {
    var audio = document.getElementById("leave-audio");
    audio.play();
  };

  useEffect(() => {
    if (!userInfo) history(-1);
    if (userInfo?.userType.toLowerCase() === "user" && userInfo?._id !== userId)
      history(-1);
    if (
      userInfo?.userType.toLowerCase() === "employer" &&
      userInfo?._id !== hostId
    )
      history(-1);

    dispatch(getAUser(userId));
    // socketRef.current = io.connect("http://localhost:3001/");
    socketRef.current = io.connect("https://v2lhbackend.herokuapp.com/");
    console.log(socketRef.current);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join-room", interviewId);
        // console.log("EMIT");
        socketRef.current.on("all users", (users) => {
          const peerss = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peerss.push(peer);
          });
          setPeers(peerss);
          // alert("ONE");
          if (users.length === 0) {
            setRoomView(1);
          } else {
            setRoomView(2);
          }
          console.log(users.length, "Users length");
        });

        socketRef.current.on("user left", (user) => {
          setPeers([]);
          setRoomView(1);
          playLeaveSound();
          setShowEndCallButton(false);
        });

        socketRef.current.on("call ended", () => {
          // alert("CALL ENDED");
          socketRef.current.disconnect();
          userVideo.current.srcObject
            .getTracks()
            .forEach((track) => track.stop());
          history(-1);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
          playJoinSound();
          setRoomView(2);
          setShowEndCallButton(true);
          // alert("JOINED ROOM")
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
          setShowEndCallButton(true);
        });
      });

      
    return () => {
      // alert("DISCONNECT");
      socketRef.current.emit("user left");
      socketRef.current.disconnect();
      userVideo.current.srcObject.getTracks().forEach((track) => track.stop());
    };
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    // console.log("createPeer");
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function endCall() {
    socketRef.current.emit("end call");
    socketRef.current.disconnect();
    userVideo.current.srcObject.getTracks().forEach((track) => track.stop());
    history(-1);
  }

  function addPeer(incomingSignal, callerID, stream) {
    // console.log("addPeer");
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div className={darkTheme ? "room-page dark" : "room-page"}>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <div className={darkTheme ? "columns room dark" : "columns room"}>
        <div className="column is-8 webcam-col">
          <div className="cam-container">
            {showEndCallButton && (
              <div className="call-options">
                <button className="button is-danger" onClick={endCall}>
                  End Call
                </button>
              </div>
            )}
            {roomView === 1 && (
              <h1 className="loading-text">
                Waiting for user to connect
                <GuestLoader />
              </h1>
            )}
            <video
              className="my-video"
              muted
              ref={userVideo}
              autoPlay
              playsInline
            />
            {peers.map((peer, index) => {
              return <Video key={index} peer={peer} />;
            })}
            <audio id="join-audio" src={joinedAudio}></audio>
            <audio id="leave-audio" src={leaveAudio}></audio>
          </div>
        </div>
        <div className="column cv-col">
          <div className="cv-container">
            <div className="cv-header">
              <BsFillFileTextFill className="icon" />
              <span className="cv-header-title">CV</span>
            </div>
            <div className="cv-section">
              <div className="cv-content">
                <h2 className="cv-name">{user?.name}</h2>
                <p className="cv-subtitle">
                  <GoGlobe /> {user?.location}
                </p>
                <p className="cv-subtitle">
                  <HiOutlineMail /> {user?.email}
                </p>
                <div className="cv-aboutme">{user?.userCV?.aboutMe}</div>
              </div>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <WorkExp darkTheme={darkTheme} user={user} />
                  <Edu darkTheme={darkTheme} user={user} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room2;
