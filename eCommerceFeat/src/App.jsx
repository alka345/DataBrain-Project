import React, { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import ShowItem from './components/ShowItem';
const apiUrl = 'https://api.tvmaze.com/search/shows?q=all';

const filterGenres = (shows, selectedGenres) => {
  if (!selectedGenres.length) return shows;

  return shows.filter((show) =>
    show.show.genres.some((genre) => selectedGenres.includes(genre))
  );
};


const sortShows = (shows, sortBy) => {
    switch (sortBy) {
      case 'name':
        return shows.slice().sort((a, b) => a.show.name.localeCompare(b.show.name));
      case 'runtime':
        return shows.slice().sort((a, b) => a.show.runtime - b.show.runtime);
      case 'rating':
        return shows.slice().sort((a, b) => b.show.rating.average - a.show.rating.average);
      default:
        return shows;
    }
  };

const App = () => {
  const [shows, setShows] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredShows = filterGenres(shows, selectedGenres);
  const sortedShows = sortShows(filteredShows, sortBy);

  return (
    <div className="flex">
    {/* Sidebar/Navbar */}
    <div className="w-1/4 p-4">
      <h2 className="text-lg font-semibold mb-2">Genres</h2>
      {Array.from(new Set(shows.flatMap((show) => show.show.genres))).map(
        (genre) => (
          <div key={uniqueId()}>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
                className="mr-2"
              />
              {genre}
            </label>
          </div>
        )
      )}
    </div>
      
      
      {/* Main Content */}
      <div className="w-3/4 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filtered Shows</h2>
          <div className="flex items-center space-x-2">
            <label className="mr-2">Sort By:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="border p-1"
            >
              <option value="name">Name</option>
              <option value="runtime">Runtime</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {sortedShows.map((show) => (
            <ShowItem key={show.show.id} show={show} />
          ))}
        </div>
        </div>
    </div>
  );
};
        


export default App;
