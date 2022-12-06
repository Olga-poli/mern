import { useCallback, useState } from 'react';

export const useAPIHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const request = useCallback(async (api, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }
      const response = await fetch(api, { method, body, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    request
  };
};

export default useAPIHook;
