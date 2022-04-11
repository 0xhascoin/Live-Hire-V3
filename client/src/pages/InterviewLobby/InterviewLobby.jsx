import React from 'react';
import { useParams } from 'react-router-dom';
import './interviewLobby.scss';

const InterviewLobby = ({darkTheme, setDarkTheme}) => {
    const { id } = useParams();
  return (
    <div>InterviewLobby {id}</div>
  )
}

export default InterviewLobby