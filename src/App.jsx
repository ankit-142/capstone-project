import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import VideoPlayer from './pages/VideoPlayer';
import CreateChannel from './pages/CreateChannel';
import MyChannels from './pages/MyChannels';
import Channel from './pages/Channel';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header toggleSidebar={toggleSidebar} />
          <div className="app-body">
            <Sidebar isOpen={sidebarOpen} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home sidebarOpen={sidebarOpen} />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/video/:id" element={<VideoPlayer />} />
                <Route path="/create-channel" element={<CreateChannel />} />
                <Route path="/my-channels" element={<MyChannels sidebarOpen={sidebarOpen} />} />
                <Route path="/channel/:id" element={<Channel sidebarOpen={sidebarOpen} />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
