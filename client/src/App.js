import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useRoutes from './routes';
import Toast from './components/Toast';

const App = () => {
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  const routes = useRoutes(isAuthenticated);

  return (
    <BrowserRouter>
      <div className="flex justify-center h-screen w-screen">
        {routes}
        <Toast />
      </div>
    </BrowserRouter>
  );
};

export default App;
