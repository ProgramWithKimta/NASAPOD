
import { useMutation } from '@apollo/client';
import { DELETE_FAVORITE_BY_USER } from '../graphql/deleteFavoriteByUser';
import { Photo } from '../schemas/typePhoto';
import { useAuth } from '../auth/AuthProvider';

const UnlikeButton: React.FC<{ photo: Photo }> = ({ photo }) => {
  const [deleteFavoriteByUser, { loading }] = useMutation(DELETE_FAVORITE_BY_USER);
  const getUsername = useAuth().getUsername

  const handleDeleteFavorite = () => {
    const input = {
      username: getUsername(),
      favorite_id: photo
    };
    deleteFavoriteByUser({ variables: { 
      username: input.username,
      favorite_id: input.favorite_id
    } });
    window.location.reload();
  };

  return (
    <button
      onClick={handleDeleteFavorite}
      disabled={loading}
      className={`text-2xl ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:text-yellow-400'}`}
    >
      {loading ? 'Removing...' : 'Remove'}
    </button>
  );
};

export default UnlikeButton;