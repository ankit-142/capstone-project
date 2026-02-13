import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import '../styles/Channel.css';

const Channel = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [channel, setChannel] = useState(null);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: '',
    category: 'All'
  });

  useEffect(() => {
    fetchChannel();
  }, [id]);

  const fetchChannel = async () => {
    try {
      const { data } = await API.get(`/channels/${id}`);
      setChannel(data);
    } catch (error) {
      console.error('Error fetching channel:', error);
    }
  };

  const isOwner = user && channel && user._id === channel.owner._id;

  const handleVideoFormChange = (e) => {
    setVideoForm({ ...videoForm, [e.target.name]: e.target.value });
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      await API.post('/videos', { ...videoForm, channelId: id });
      setShowVideoForm(false);
      setVideoForm({ title: '', description: '', thumbnailUrl: '', videoUrl: '', category: 'All' });
      fetchChannel();
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding video');
    }
  };

  const handleEditVideo = (video) => {
    setEditingVideo(video._id);
    setVideoForm({
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      videoUrl: video.videoUrl,
      category: video.category
    });
    setShowVideoForm(true);
  };

  const handleUpdateVideo = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/videos/${editingVideo}`, videoForm);
      setShowVideoForm(false);
      setEditingVideo(null);
      setVideoForm({ title: '', description: '', thumbnailUrl: '', videoUrl: '', category: 'All' });
      fetchChannel();
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating video');
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm('Delete this video?')) return;
    try {
      await API.delete(`/videos/${videoId}`);
      fetchChannel();
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting video');
    }
  };

  if (!channel) return <div className="loading">Loading...</div>;

  return (
    <div className="channel-page">
      <div className="channel-banner" style={{ backgroundImage: `url(${channel.channelBanner})` }}>
        <div className="channel-info">
          <h1>{channel.channelName}</h1>
          <p>{channel.subscribers} subscribers • {channel.videos?.length || 0} videos</p>
          <p>{channel.description}</p>
        </div>
      </div>

      {isOwner && (
        <div className="channel-actions">
          <button onClick={() => {
            setShowVideoForm(!showVideoForm);
            setEditingVideo(null);
            setVideoForm({ title: '', description: '', thumbnailUrl: '', videoUrl: '', category: 'All' });
          }}>
            {showVideoForm ? 'Cancel' : '+ Add Video'}
          </button>
        </div>
      )}

      {showVideoForm && (
        <div className="video-form-container">
          <form onSubmit={editingVideo ? handleUpdateVideo : handleAddVideo}>
            <input
              type="text"
              name="title"
              placeholder="Video Title"
              value={videoForm.title}
              onChange={handleVideoFormChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={videoForm.description}
              onChange={handleVideoFormChange}
              rows="3"
            />
            <input
              type="url"
              name="thumbnailUrl"
              placeholder="Thumbnail URL"
              value={videoForm.thumbnailUrl}
              onChange={handleVideoFormChange}
              required
            />
            <input
              type="url"
              name="videoUrl"
              placeholder="Video URL"
              value={videoForm.videoUrl}
              onChange={handleVideoFormChange}
              required
            />
            <select name="category" value={videoForm.category} onChange={handleVideoFormChange}>
              <option value="All">All</option>
              <option value="Music">Music</option>
              <option value="Gaming">Gaming</option>
              <option value="Education">Education</option>
              <option value="Sports">Sports</option>
              <option value="Technology">Technology</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            <button type="submit">{editingVideo ? 'Update Video' : 'Add Video'}</button>
          </form>
        </div>
      )}

      <div className="channel-videos">
        <h2>Videos</h2>
        {channel.videos?.length === 0 ? (
          <p>No videos yet</p>
        ) : (
          <div className="videos-grid">
            {channel.videos?.map((video) => (
              <div key={video._id} className="video-item">
                <img src={video.thumbnailUrl} alt={video.title} onClick={() => navigate(`/video/${video._id}`)} />
                <div className="video-details">
                  <h3 onClick={() => navigate(`/video/${video._id}`)}>{video.title}</h3>
                  <p>{video.views} views</p>
                  {isOwner && (
                    <div className="video-actions">
                      <button onClick={() => handleEditVideo(video)}>Edit</button>
                      <button onClick={() => handleDeleteVideo(video._id)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
