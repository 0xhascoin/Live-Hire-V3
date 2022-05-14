import React from 'react'

import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';

const PostJobSuccess = () => {
  const interviewCreate = useSelector((state) => state.interviewCreate);
  const { interview, loading } = interviewCreate;

  if(loading) return "Loading...."

  return (
    <div>
      <Link to={`/job/${interview?._id}`}>View your job</Link>
    </div>
  )
}

export default PostJobSuccess