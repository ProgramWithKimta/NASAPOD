import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_APOD_LAST7 } from '../graphql/queries';

const Apod7day: React.FC = () => {
  const { loading, error, data } = useQuery(GET_APOD_LAST7);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading images.</p>;

  return (
    <div>
      <h1>NASA APOD - Last 7 Days</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {data.apodLast7
          .slice()
          .reverse()
          .map((apod: any) => (
            <div key={apod.date} style={{ width: 300 }}>
              <h3>{apod.title}</h3>
              <p>{apod.date}</p>
              {apod.media_type === 'image' ? (
                <img
                  src={apod.url}
                  alt={apod.title}
                  style={{ width: '100%', borderRadius: 8 }}
                />
              ) : (
                <a href={apod.url} target="_blank" rel="noopener noreferrer">
                  View Video
                </a>
              )}
              <p style={{ fontSize: '0.9rem' }}>{apod.explanation}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Apod7day;