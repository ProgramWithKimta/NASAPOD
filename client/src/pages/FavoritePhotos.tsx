// client/src/pages/FavoritePhotos.tsx

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_FAVORITES } from '../graphql/getFavorites';

const PHOTOS_PER_PAGE = 4;

const FavoritePhotos: React.FC = () => {
  const { data, loading, error } = useQuery(GET_FAVORITES);
  const [currentPage, setCurrentPage] = useState(0);

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>Error loading favorites 😢</p>;

  const favorites = data?.getFavorites || [];
  const totalPages = Math.ceil(favorites.length / PHOTOS_PER_PAGE);

  const startIndex = currentPage * PHOTOS_PER_PAGE;
  const paginatedPhotos = favorites.slice(startIndex, startIndex + PHOTOS_PER_PAGE);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Photos</h1>

      <div className="grid grid-cols-2 gap-4">
        {paginatedPhotos.map((photo: any) => (
          <div key={photo._id} className="bg-white shadow-md rounded p-3">
            <img src={photo.url} alt={photo.title} className="w-full h-48 object-cover rounded" />
            <h2 className="mt-2 text-lg font-semibold">{photo.title}</h2>
            <p className="text-sm text-gray-600">{photo.date}</p>
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

export default FavoritePhotos;
