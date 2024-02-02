import React, { useState, useEffect } from 'react';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchShows();
  }, []);

  return (
    <div className="container bg-gradient-to-br from-black via-teal-800 to-black font-serif ">
      <h1 className="flex justify-center items-center text-white text-3xl font-bold pt-10  mb-10 ">Show List</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
        {shows.map(show => (
          <li key={show.show.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{show.show.name}</h2>
            <p dangerouslySetInnerHTML={{ __html: show.show.summary }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
