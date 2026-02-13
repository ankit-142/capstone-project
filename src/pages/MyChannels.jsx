import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import '../styles/MyChannels.css';

const MyChannels = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchChannels();
  }, [user]);

  const fetchChannels = async () => {
    try {
      const { data } = await API.get('/channels/my-channels');
      setChannels(data);
      if (data.length === 1) {
        navigate(`/channel/${data[0]._id}`);
      }
    } catch (error) {
      console.error('Error fetching channels:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="my-channels-container">
      <h2>My Channels</h2>
      
      {channels.length === 0 ? (
        <div className="no-channels">
          <p>You don't have any channels yet</p>
          <button onClick={() => navigate('/create-channel')}>Create Channel</button>
        </div>
      ) : (
        <div className="channels-grid">
          {channels.map((channel) => (
            <div key={channel._id} className="channel-card" onClick={() => navigate(`/channel/${channel._id}`)}>
              <img src={channel.channelBanner} alt={channel.channelName} />
              <h3>{channel.channelName}</h3>
              <p>{channel.subscribers} subscribers</p>
              <p>{channel.videos?.length || 0} videos</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyChannels;
