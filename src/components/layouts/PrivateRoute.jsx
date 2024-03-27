import { Navigate, useLocation } from 'react-router-dom';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import auth from '../../utils/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();

  const { email, isLoading } = useSelector((state) => state.userSlice);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
    })
  }) 
  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
