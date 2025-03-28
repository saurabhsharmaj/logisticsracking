import React, { useState } from 'react';
import { postJob } from '../api';

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postJob({ title, description });
      setTitle('');
      setDescription('');
      alert('Job posted successfully!');
    } catch (err) {
      setError(err.response.data.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h1>Post a Job</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;