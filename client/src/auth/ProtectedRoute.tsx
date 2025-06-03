import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // adjust import as needed

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;