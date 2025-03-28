import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobForm = ({ job, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  
  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
    }
  }, [job]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = { title, description };

    try {
      if (job) {
       
        await axios.put(`/api/jobs/${job._id}`, jobData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
       
        await axios.post('/api/jobs', jobData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }

      
      onSave();
    } catch (error) {
      console.error('Errors savees job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Job Description"
      
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button type="submit">{job ? 'Update' : 'Create'} Job</button>
    </form>
  );
};

export default JobForm;
