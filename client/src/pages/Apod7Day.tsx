import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_APOD_LAST7 } from '../graphql/queries';
import LikeButton from '../components/Button';

const Apod7day: React.FC = () => {
  const { loading, error, data } = useQuery(GET_APOD_LAST7);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading images.</p>;

  return (
    <div className="apod7day-container">
      <h1 className="apod7day-page-title">NASA APOD - Last 7 Days</h1>
      <div className="apod7day-div">
        {data.apodLast7
          .slice()
          .reverse()
          .map((apod: any) => (
            <div key={apod.date} className="apod7day-card">
              <h1 className="apod7day-img-title">{apod.title}</h1>
              <p className="apod7day-date">{apod.date}</p>
              <LikeButton photo={apod} />
              {apod.media_type === 'image' ? (
                <img
                  src={apod.url}
                  alt={apod.title}
                  style={{ width: '100%', borderRadius: 8 }}
                  className="apod7day-image"
                />
              ) : (
                <a href={apod.url} target="_blank" rel="noopener noreferrer">
                  View Video
                </a>
              )}
              <p className="apod7day-description">{apod.explanation}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Apod7day;