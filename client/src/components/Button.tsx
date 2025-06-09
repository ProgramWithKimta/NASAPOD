
import { useMutation } from '@apollo/client';
import { SAVE_FAVORITE } from '../graphql/saveFavorite';
import { Photo } from '../schemas/typePhoto';
import { useAuth } from '../auth/AuthProvider';

const LikeButton: React.FC<{ photo: Photo }> = ({ photo }) => {
  const [saveFavorite, { loading }] = useMutation(SAVE_FAVORITE);
  const getUsername = useAuth().getUsername

  const handleFavorite = () => {
    const input = {
      title: photo.title,
      url: photo.url,
      date: photo.date,
      explanation: photo.explanation,
      username: getUsername()
    };
    saveFavorite({ variables: { input } });
  };

  return (
    <button
      onClick={handleFavorite}
      disabled={loading}
      className={`text-2xl ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:text-yellow-400'}`}
    >
        ★
      {loading ? 'Liking...' : 'Like'}
    </button>
  );
};

export default LikeButton;