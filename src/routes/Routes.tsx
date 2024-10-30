import {useEffect, useState} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './../setups/firebaseSetup'; // Adjust based on your setup
import LoaderMutationDots from '../components/Loader/LoaderMutationDots';
import {NO_HEADER_PAGES} from '../constants/global';

// Protected route: Only accessible if the user is authenticated
const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  if (isAuthenticated === null) return <LoaderMutationDots />; // Optionally, add a loading state

  return isAuthenticated ? (
    <div className="pt-[120px] sm:pt-[70px]">
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

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className={`${!NO_HEADER_PAGES.includes(location.pathname) ? 'pt-[120px] sm:pt-[70px]' : ''}`}>
      <Outlet />
    </div>
  );
};

export {ProtectedRoute, UnprotectedRoute};
