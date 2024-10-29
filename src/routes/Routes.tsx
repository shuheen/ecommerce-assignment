import {useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './../setups/firebaseSetup'; // Adjust based on your setup
import LoaderMutationDots from '../components/Loader/LoaderMutationDots';

// Protected route: Only accessible if the user is authenticated
const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  if (isAuthenticated === null) return <LoaderMutationDots />; // Optionally, add a loading state

  return isAuthenticated ? (
    <div className="mt-[120px] sm:mt-[70px]">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

// Unprotected route: Redirects to home if the user is authenticated
const UnprotectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  if (isAuthenticated === null) return <LoaderMutationDots />; // Optionally, add a loading state

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export {ProtectedRoute, UnprotectedRoute};
