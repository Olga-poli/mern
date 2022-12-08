import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';

const customLogger = (store) => (next) => (action) => {
  console.group(
    `%c${action.type}`,
    'color:#a8329e;font-family:system-ui;font-size:.75rem;font-weight:bold',
    `${new Date(Date.now()).toTimeString().split(' ')[0]}`
  );
  console.log('%cPrevious state:', 'font-family:system-ui;font-size:.75rem;font-weight:bold', store.getState());
  next(action);
  console.log('%cAction:', 'color:#57d100;font-family:system-ui;font-size:.75rem;font-weight:bold', action);
  console.log('%cNext state:', 'font-family:system-ui;font-size:.75rem;font-weight:bold', store.getState());
  console.groupEnd();
};

export const store = configureStore({
  reducer: { authReducer },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), customLogger],
  devTools: true,
  preloadedState: {}
});

export default store;
