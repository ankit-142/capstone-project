import { useState } from 'react';
import '../styles/FilterButtons.css';

const FilterButtons = ({ onFilterChange, sidebarOpen }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const categories = ['All', 'Music', 'Gaming', 'Education', 'Sports', 'Technology', 'Entertainment'];

  const handleFilterClick = (category) => {
    setActiveFilter(category);
    onFilterChange(category);
  };

  return (
    <div className={`filter-buttons ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
          onClick={() => handleFilterClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
