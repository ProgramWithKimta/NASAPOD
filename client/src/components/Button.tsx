
import { useMutation } from '@apollo/client';
import { SAVE_FAVORITE } from '../graphql/saveFavorite';
import { Photo } from '../schemas/typePhoto';

const LikeButton: React.FC<{ photo: Photo }> = ({ photo }) => {
  const [saveFavorite, { loading }] = useMutation(SAVE_FAVORITE);

  const handleFavorite = () => {
    const input = {
      title: photo.title,
      url: photo.url,
      date: photo.date,
      explanation: photo.explanation,
    };
    saveFavorite({ variables: { input } });
  };

  return (
    <button
      onClick={handleFavorite}
      disabled={loading}
      className={`px-4 py-2 rounded bg-blue-500 text-white font-medium ${
        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
      }`}
    >
      {loading ? 'Liking...' : 'Like'}
    </button>
  );
};

export default LikeButton;