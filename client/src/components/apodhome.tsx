import { useQuery } from '@apollo/client';
import { GET_APOD } from '../graphql/queries';
import LikeButton from './Button';


const APOD = () => {
  const { loading, error, data } = useQuery(GET_APOD);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const apod = data.apodToday;

return (
    <div className="apod-container">
      <div className="apod-left">
        {apod.media_type === 'image' ? (
          <img src={apod.url} alt={apod.title} className="apod-image" />
        ) : (
          <iframe
            src={apod.url}
            title={apod.title}
            width="100%"
            height="250"
            allowFullScreen
            className="apod-image"
          ></iframe>
        )}
        <h1 className="apod-title">{apod.title}</h1>
        <p className="apod-date">{apod.date}</p>
        <LikeButton photo={apod} />
      </div>

      <div className="apod-right">
        <p className="apod-description">{apod.explanation}</p>
      </div>
    </div>
  );
};

export default APOD;