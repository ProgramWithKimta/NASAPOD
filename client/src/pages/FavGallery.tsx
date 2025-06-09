// client/src/pages/FavGallery.tsx

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

// import { GET_FAVORITES } from '../graphql/getFavorites';
import { GET_USER_FAVORITES } from '../graphql/getFavorites';
import { useAuth } from '../auth/AuthProvider';

const PHOTOS_PER_PAGE = 4;

const FavGallery: React.FC = () => {
  const getUsername = useAuth().getUsername
  const { data, loading, error } = useQuery(GET_USER_FAVORITES, {
    variables: {
      username: getUsername()
    }
  });
  const [currentPage, setCurrentPage] = useState(0);

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>Error loading favorites 😢</p>;

  const favorites = data?.getUserFavorites || []; 
  // need to update code to grab favorites from the user - match the user token (username)
  const totalPages = Math.ceil(favorites.length / PHOTOS_PER_PAGE);

  const startIndex = currentPage * PHOTOS_PER_PAGE;
  const paginatedPhotos = favorites.slice(startIndex, startIndex + PHOTOS_PER_PAGE);

  return (
    <div className="favgallery-container">
      <h1 className="favgallery-page-title">Your Favorite Photos</h1>
      <div className="favgallery-div">
        {paginatedPhotos.map((photo: any) => (
          <div key={photo._id} className="favgallery-card">
            <img src={photo.url} alt={photo.title} className="favgallery-image" />
            <h2 className="favgallery-img-title">{photo.title}</h2>
            <p className="favgallery-date">{photo.date}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          &lt; Prev
        </button>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage >= totalPages - 1}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default FavGallery;
