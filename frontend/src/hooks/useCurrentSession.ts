import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWindowFocus from 'use-window-focus';

import { useCurrentSessionQuery } from '../api';
import { RootState } from '../stores';
import { setError, setIsLoading, setIsLoggedIn } from '../stores/appSlice';

const useCurrentSession = () => {
  const refreshTime = 5 * 60 * 1000;
  const windowFocused = useWindowFocus();
  const { isLoggedIn } = useSelector((state: RootState) => state.app);

  const { isSuccess, data: currentSessionData } = useCurrentSessionQuery(undefined, {
    refetchOnFocus: true,
    pollingInterval: windowFocused ? refreshTime : 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && !currentSessionData?.isLoggedIn) {
      dispatch(setError('Your session has expired'));
    }
  }, [currentSessionData, isLoggedIn, dispatch]);

  useEffect(() => {
    if (currentSessionData) {
      dispatch(setIsLoggedIn(currentSessionData.isLoggedIn));
    }
  }, [currentSessionData, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsLoading(false));
    }
  }, [isSuccess, dispatch]);
};

export default useCurrentSession;
