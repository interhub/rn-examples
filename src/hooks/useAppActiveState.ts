import {useEffect, useLayoutEffect, useState} from 'react';
import {AppState} from 'react-native';

/**
hook for check app is active state and use it for request and repeat request after change active state
 */
const useAppActiveState = () => {
  const [state, setState] = useState(AppState.currentState);
  useEffect(() => {
    return AppState.addEventListener('change', (newState) => {
      setState(newState);
    }).remove;
  }, []);
  const isActive = state === 'active';
  return {state, isActive};
};
export default useAppActiveState;
