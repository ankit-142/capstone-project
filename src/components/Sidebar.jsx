import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const location = window.location.pathname;

  return (
    <aside className={`sidebar ${!isOpen ? 'closed' : ''}`}>
      <div className={`sidebar-item ${location === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>
        <i className="fas fa-home"></i> Home
      </div>
      <div className={`sidebar-item ${location === '/shorts' ? 'active' : ''}`} onClick={() => navigate('/shorts')}>
        <i className="fas fa-play"></i> Shorts
      </div>
      {user && (
        <>
          <div className="sidebar-divider"></div>
          <div className={`sidebar-item ${location === '/my-channels' ? 'active' : ''}`} onClick={() => navigate('/my-channels')}>
            <i className="fas fa-tv"></i> My Channels
          </div>
          <div className={`sidebar-item ${location === '/create-channel' ? 'active' : ''}`} onClick={() => navigate('/create-channel')}>
            <i className="fas fa-plus-circle"></i> Create Channel
          </div>
        </>
      )}
      <div className="sidebar-divider"></div>
      <div className="sidebar-section">Categories</div>
      <div className="sidebar-item" onClick={() => navigate('/?category=Music')}>
        <i className="fas fa-music"></i> Music
      </div>
      <div className="sidebar-item" onClick={() => navigate('/?category=Gaming')}>
        <i className="fas fa-gamepad"></i> Gaming
      </div>
      <div className="sidebar-item" onClick={() => navigate('/?category=Education')}>
        <i className="fas fa-graduation-cap"></i> Education
      </div>
      <div className="sidebar-item" onClick={() => navigate('/?category=Sports')}>
        <i className="fas fa-football-ball"></i> Sports
      </div>
      <div className="sidebar-item" onClick={() => navigate('/?category=Technology')}>
        <i className="fas fa-laptop"></i> Technology
      </div>
      <div className="sidebar-item" onClick={() => navigate('/?category=Entertainment')}>
        <i className="fas fa-film"></i> Entertainment
      </div>
    </aside>
  );
};

export default Sidebar;
