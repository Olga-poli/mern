import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.hook';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpened((prevState) => !prevState);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-white text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
      <div className="mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <NavLink to="/" className="text-indigo-600 px-3 py-2 rounded-md text-sm font-bold" aria-current="page">Home</NavLink>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLink
                  to="/create"
                  className={
                    ({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-gray-700 text-white' : 'text-gray-700'}`
                  }
                  aria-current="page"
                >
                  Create
                </NavLink>

                <NavLink
                  to="/links"
                  className={
                   ({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-gray-700 text-white' : 'text-gray-700'}`
                  }
                >
                  Links
                </NavLink>

              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  onClick={handleMenuToggle}
                  className="flex rounded-full bg-gray-800 text-sm hover:outline-none hover:ring-1 hover:ring-white hover:ring-offset-1 hover:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src="https://www.vincentvangogh.org/images/self-portrait.jpg" alt="" />
                </button>
              </div>

              <div
                className={classNames({ hidden: !isMenuOpened }, 'absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none')}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <a tabIndex="0" href="/" className="block px-4 py-2 text-sm text-gray-700 hover:font-medium" role="menuitem" id="user-menu-item-2" onClick={handleLogout}>Logout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
