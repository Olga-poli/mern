import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useRoutes from './routes';
import Toast from './components/Toast';
import Navbar from './components/Navbar';

const App = () => {
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  const routes = useRoutes(isAuthenticated);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen w-screen">
        {isAuthenticated && <Navbar />}
        {routes}
        <Toast />
      </div>
    </BrowserRouter>
  );
};

export default App;
