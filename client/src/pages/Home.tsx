import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_APOD } from '../utils/queries';
import '../App.css';

const Home: React.FC = () => {
  const { data, loading, error } = useQuery(GET_APOD);

  if (loading) return <p>Loading NASA’s APOD...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const apod = data.apod;

  return (
    <div style={styles.container}>
      <h1>{apod.title}</h1>
      <p>{apod.date}</p>

      {apod.media_type === 'image' ? (
        <img src={apod.url} alt={apod.title} style={styles.image} />
      ) : (
        <iframe
          src={apod.url}
          title={apod.title}
          width="100%"
          height="500"
          allowFullScreen
        ></iframe>
      )}

      <p>{apod.explanation}</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center' as const,
  },
  image: {
    maxWidth: '100%',
    borderRadius: '10px',
  },
};

export default Home;
