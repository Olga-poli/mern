import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import useRoutes from './routes';
import Toast from './components/Toast';

const App = () => {
  const routes = useRoutes(false);

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
