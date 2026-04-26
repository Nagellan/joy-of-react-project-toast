import React, { useReducer, useMemo, createContext, useContext } from 'react';

import ToastShelf from '../ToastShelf';

const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add':
        return [...state, action.payload];
      case 'remove':
        return state.filter((toast) => toast.id !== action.payload.id);
      default:
        throw new Error('Unknown action type: ' + action.type);
    }
  }, []);

  const value = useMemo(() => ({
    add: (payload) => dispatch({ type: 'add', payload }),
    remove: (id) => dispatch({ type: 'remove', payload: { id } })
  }), [dispatch])

  return (
    <ToastContext value={value}>
      {children}
      <ToastShelf toasts={toasts} />
    </ToastContext>
  );
}

export function useToasts() {
  return useContext(ToastContext);
}

export default ToastProvider;
