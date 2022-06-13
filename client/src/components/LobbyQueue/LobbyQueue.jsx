import React, { useState } from "react";
import "./lobbyQueue.scss";
import { useSelector } from "react-redux";


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

  function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

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

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {interviewQueue.sort((a,b) =>  a.place - b.place).map((user) => (
            <tr>
              <th>{user?.name}</th>
              <th>{getFlagEmoji(user?.location)}</th>
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
