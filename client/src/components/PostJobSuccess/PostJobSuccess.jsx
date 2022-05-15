import React from 'react'
import './successPage.scss';
import {AiOutlineCheckCircle} from 'react-icons/ai';
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';

const PostJobSuccess = () => {
  const interviewCreate = useSelector((state) => state.interviewCreate);
  const { interview, loading } = interviewCreate;

  if(loading) return "Loading...."

  return (
    <div className="success-page">
      <AiOutlineCheckCircle style={{fontSize: '4rem', color: '#57cc99'}}/>
      <h1 className="success-title">Thank you for posting a job with us</h1>
      <p className="success-subtitle">You can view your job using the link below</p>
      <Link className="button is-primary success-button" to={`/job/${interview?._id}`}>View my job</Link>
    </div>
  )
}

export default PostJobSuccess