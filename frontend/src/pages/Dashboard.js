import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobForm from '../components/JobForm';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get('/api/jobs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setJobs(res.data);
    };

    fetchJobs();
  }, []);

  const handleSave = async () => {
    const res = await axios.get('/api/jobs', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setJobs(res.data);
    setSelectedJob(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/jobs/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setJobs(jobs.filter(job => job._id !== id));
  };

 

  return (
    <div>
      <h1>Dashboard</h1>
       <JobForm job={selectedJob} onSave={handleSave} />
      <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job._id}>
              <td>{job.title} / {job.description}</td>
              <td>
                <button onClick={() => setSelectedJob(job)}>Edit</button>
                <button onClick={() => handleDelete(job._id)}>Delete</button>
              </td>
            </tr>
          ))}
         
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;