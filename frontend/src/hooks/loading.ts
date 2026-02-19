import {useCallback} from 'react';
import {ActionType, useGlobalDispatch, useGlobalState} from 'store';

/**
 * Is the app in a loading state?
 * @returns boolean
 */
export function useIsAnyLoading() {
  const globalState = useGlobalState();
  return (globalState.loadingFlags?.length ?? 1) > 0;
}

export function useLoadingController(loadingKey: string) {
  const dispatch = useGlobalDispatch();
  const globalState = useGlobalState();

  const setLoading = useCallback(() => {
    dispatch({type: ActionType.SET_LOADING, payload: loadingKey});
  }, [dispatch, loadingKey]);

  const clearLoading = useCallback(() => {
    dispatch({type: ActionType.CLEAR_LOADING, payload: loadingKey});
  }, [dispatch, loadingKey]);

  const isLoading = globalState.loadingFlags.includes(loadingKey);

  return {setLoading, clearLoading, isLoading};
}
