import { useNavigate } from 'react-router-dom';
import '../styles/VideoCard.css';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views;
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

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-card" onClick={() => navigate(`/video/${video._id}`)}>
      <div className="video-thumbnail">
        <img src={video.thumbnailUrl} alt={video.title} />
        {video.duration && <span className="video-duration">{formatDuration(video.duration)}</span>}
      </div>
      <div className="video-info">
        <div className="video-details">
          <h3 className="video-title">{video.title}</h3>
          <p className="video-channel">{video.channelId?.channelName || 'Unknown Channel'}</p>
          <p className="video-stats">{formatViews(video.views)} views • {getTimeAgo(video.uploadDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
