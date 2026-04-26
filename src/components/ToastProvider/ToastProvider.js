import React, { useReducer, useMemo, useCallback, createContext, useContext } from 'react';

import { useEscapeKey } from '../../hooks/useEscapeKey'
import ToastShelf from '../ToastShelf';

const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add':
        return [...state, action.payload];
      case 'remove':
        return state.filter((toast) => toast.id !== action.payload.id);
      case 'reset':
        return [];
      default:
        throw new Error('Unknown action type: ' + action.type);
    }
  }, []);

  useEscapeKey(useCallback(() => dispatch({ type: 'reset' }), []));

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
