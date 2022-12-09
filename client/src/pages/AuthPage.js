import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAPIHook } from '../hooks/useAPI.hook';
import Spinner from '../components/Spinner';
import useAuth from '../hooks/useAuth.hook';

const AuthPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { isLoading, request } = useAPIHook();
  const { login } = useAuth();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const action = event.target.name;

    try {
      const response = await request(
        `/api/auth/${action}`,
        'POST',
        { ...form }
      );

      login(response);
      toast.success(response.message || 'Success');
    } catch (error) {
      toast.error(error.message || 'Something went wrong, try again');
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xs space-y-8">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <form className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={handleChange}
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={handleChange}
                className="relative block w-full appearance-n one rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              name="login"
              onClick={handleSubmit}
            >
              Sign in
            </button>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              name="register"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </form>
      </div>
      {isLoading && Spinner()}
    </div>
  );
};

export default AuthPage;
