import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { setUserAuthorization } from '../store/slices/auth.slice';

const storageName = 'userAuthentication';

const useAuth = () => {
  const [user, setUser] = useState({ userId: null, token: null });
  const dispatch = useDispatch();

  const login = useCallback(({ userId, token }) => {
    const newUserData = { userId, token };
    setUser(newUserData);

    dispatch(setUserAuthorization(!!token));
    localStorage.setItem(storageName, JSON.stringify(newUserData));
  }, [user]);

  const logout = useCallback(() => {
    const newUserData = { userId: null, token: null };
    setUser(newUserData);

    dispatch(setUserAuthorization(!!newUserData.token));
    localStorage.removeItem(storageName);
  }, [user]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(storageName));

    if (userData && userData.token) {
      login(userData);
    }
  }, []);

  return { login, logout };
};

export default useAuth;
