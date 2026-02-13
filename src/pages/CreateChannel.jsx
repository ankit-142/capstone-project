import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import '../styles/CreateChannel.css';

const CreateChannel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    channelName: '',
    description: '',
    channelBanner: ''
  });
  const [error, setError] = useState('');

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.channelName.trim()) {
      setError('Channel name is required');
      return;
    }

    try {
      await API.post('/channels', formData);
      navigate('/my-channels');
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating channel');
    }
  };

  return (
    <div className="create-channel-container">
      <div className="create-channel-box">
        <h2>Create a Channel</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="channelName"
            placeholder="Channel Name"
            value={formData.channelName}
            onChange={handleChange}
            required
          />
          
          <textarea
            name="description"
            placeholder="Channel Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
          
          <input
            type="url"
            name="channelBanner"
            placeholder="Channel Banner URL (optional)"
            value={formData.channelBanner}
            onChange={handleChange}
          />
          
          <button type="submit" className="create-btn">Create Channel</button>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;
