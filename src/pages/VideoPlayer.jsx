import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import '../styles/VideoPlayer.css';

const VideoPlayer = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [video, setVideo] = useState(null);
  const [comment, setComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/videos/${id}`);
      setVideo(data);
    } catch (error) {
      console.error('Error fetching video:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  };

  const handleLike = async () => {
    if (!user) return alert('Please sign in to like videos');
    try {
      const { data } = await API.post(`/videos/${id}/like`);
      setVideo({ ...video, likes: data.likes, dislikes: data.dislikes });
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleDislike = async () => {
    if (!user) return alert('Please sign in to dislike videos');
    try {
      const { data } = await API.post(`/videos/${id}/dislike`);
      setVideo({ ...video, likes: data.likes, dislikes: data.dislikes });
    } catch (error) {
      console.error('Error disliking video:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please sign in to comment');
    if (!comment.trim()) return;

    try {
      const { data } = await API.post(`/videos/${id}/comments`, { text: comment });
      setVideo({ ...video, comments: data });
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editText.trim()) return;

    try {
      const { data } = await API.put(`/videos/${id}/comments/${commentId}`, { text: editText });
      setVideo({ ...video, comments: data });
      setEditingComment(null);
      setEditText('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      await API.delete(`/videos/${id}/comments/${commentId}`);
      setVideo({ ...video, comments: video.comments.filter(c => c._id !== commentId) });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) return <div className="loading">Loading video...</div>;
  if (!video) return <div className="loading">Video not found</div>;

  return (
    <div className="video-player-page">
      <div className="video-section">
        <video controls className="video-player" src={video.videoUrl}>
          Your browser does not support the video tag.
        </video>
        
        <h1 className="video-title">{video.title}</h1>
        
        <div className="video-meta">
          <div className="channel-info">
            <h3>{video.channelId?.channelName}</h3>
            <p>{video.channelId?.subscribers} subscribers</p>
          </div>
          
          <div className="video-actions">
            <button onClick={handleLike} className="action-btn">
              <i className="fas fa-thumbs-up"></i> {video.likes}
            </button>
            <button onClick={handleDislike} className="action-btn">
              <i className="fas fa-thumbs-down"></i> {video.dislikes}
            </button>
          </div>
        </div>
        
        <div className="video-description">
          <p>{video.views} views • {getTimeAgo(video.uploadDate)}</p>
          <p>{video.description}</p>
        </div>
      </div>

      <div className="comments-section">
        <h3>{video.comments?.length || 0} Comments</h3>
        
        {user && (
          <form onSubmit={handleAddComment} className="comment-form">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Comment</button>
          </form>
        )}

        <div className="comments-list">
          {video.comments?.map((c) => (
            <div key={c._id} className="comment">
              <img src={c.userId?.avatar} alt={c.userId?.username} className="comment-avatar" />
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">{c.userId?.username}</span>
                  <span className="comment-time">{getTimeAgo(c.timestamp)}</span>
                </div>
                
                {editingComment === c._id ? (
                  <div className="edit-comment">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={() => handleUpdateComment(c._id)}>Save</button>
                    <button onClick={() => setEditingComment(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <p className="comment-text">{c.text}</p>
                    {user && user._id === c.userId?._id && (
                      <div className="comment-actions">
                        <button onClick={() => {
                          setEditingComment(c._id);
                          setEditText(c.text);
                        }}>Edit</button>
                        <button onClick={() => handleDeleteComment(c._id)}>Delete</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
