import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Toast from './components/Toast';
import Navbar from './components/Navbar';
import useRoutes from './routes';
import useAuth from './hooks/useAuth.hook';

const App = () => {
  useAuth();
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  const routes = useRoutes(isAuthenticated);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen w-screen">
        {isAuthenticated && <Navbar />}
        <Toast />
        {routes}
      </div>
    </BrowserRouter>
  );
};

export default App;
