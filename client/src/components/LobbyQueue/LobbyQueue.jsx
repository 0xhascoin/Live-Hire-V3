import React, { useState } from "react";
import "./lobbyQueue.scss";
import { useSelector } from "react-redux";

const users = [
  {
    name: "Hasan Elmi",
    location: "United Kingdom",
  },
  {
    name: "John Smith",
    location: "United States",
  },
  {
    name: "Mohammed Bilal",
    location: "Pakistan",
  },
];

const LobbyQueue = ({
  darkTheme,
  showJoin,
  joinQueue,
  leaveQueue,
  interviewQueue,
  callUser
}) => {
  const [joined, setJoined] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className={darkTheme ? "table-container dark" : "table-container"}>
      <h1>Queue</h1>
      {userInfo?.userType.toLowerCase() == "user" && (
        <div className="action-buttons">
          {showJoin ? (
            <button
              className="button is-light is-info join-button"
              onClick={joinQueue}
            >
              Join
            </button>
          ) : (
            <button className="button is-light is-danger" onClick={leaveQueue}>
              Leave
            </button>
          )}
        </div>
      )}

      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {interviewQueue.map((user) => (
            <tr>
              <th>{user?.name}</th>
              <th>{user?.location}</th>
              <th>
                {userInfo?.userType.toLowerCase() == "employer" ? (
                  <button
                    className="button is-primary is-outlined"
                    onClick={() =>
                      callUser(user?._id, user?.socketId, user?.name)
                    }
                  >
                    Call
                  </button>
                ) : (
                  "Waiting..."
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LobbyQueue;
