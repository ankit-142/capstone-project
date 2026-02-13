import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../utils/api';
import VideoCard from '../components/VideoCard';
import FilterButtons from '../components/FilterButtons';
import '../styles/Home.css';

const Home = ({ sidebarOpen }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchVideos();
  }, [searchParams]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const search = searchParams.get('search') || '';
      const category = searchParams.get('category') || 'All';
      
      const { data } = await API.get(`/videos?search=${search}&category=${category}`);
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    window.history.pushState({}, '', `?${params.toString()}`);
    fetchVideos();
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className={`home ${sidebarOpen ? '' : 'sidebar-closed'}`}>
      <FilterButtons onFilterChange={handleFilterChange} sidebarOpen={sidebarOpen} />
      <div className="video-grid">
        {videos.length === 0 ? (
          <p className="no-videos">No videos found</p>
        ) : (
          videos.map((video) => <VideoCard key={video._id} video={video} />)
        )}
      </div>
    </div>
  );
};

export default Home;
