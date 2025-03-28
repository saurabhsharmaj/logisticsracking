import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    const fetchJob = async () => {
      const res = await axios.get(`/api/jobs/${id}`);
      setJob(res.data);
    };

    fetchJob();
  }, [id]);

  return (
    <div>
      <h1>Job Details</h1>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
    </div>
  );
};

export default JobDetails;