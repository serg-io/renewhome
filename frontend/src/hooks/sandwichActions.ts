import {useEffect} from 'react';
import {ActionType, useGlobalDispatch, useGlobalState} from 'store';
import {Sandwich} from 'types';
import {useLoadingController} from './loading';

export function useGetSandwiches() {
  const globalState = useGlobalState();
  return globalState.sandwiches ?? [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockSandwiches: Sandwich[] = [
  {
    id: 1,
    name: 'Hoagie A',
    description: 'A really good Hoagie',
    price: 68,
    image_url:
      // eslint-disable-next-line max-len
      'https://assets.bonappetit.com/photos/5d15197f7b2b76000841cd43/5:4/w_3515,h_2812,c_limit/Basically-Hoagie-Beauty02.jpg',
  },
  {
    id: 2,
    name: 'Hoagie B',
    description: 'Another hoagie',
    price: 42,
    image_url:
      // eslint-disable-next-line max-len
      'https://irepo.primecp.com/2015/08/233972/Overstuffed-Grilled-Veggie-Hoagie_MASTER_ID-1159482.jpg?v=1159482',
  },
];

export function useFetchSandwiches() {
  const sandwichLoadingState = useLoadingController('sandwich-api');
  const dispatch = useGlobalDispatch();
  useEffect(
    () => {
      if (sandwichLoadingState.isLoading) {
        // don't multi-fetch!
        return;
      }
      sandwichLoadingState.setLoading();
      fetch('/api/sandwiches')
        .then(x => x.json())
        .then((sandwiches: Sandwich[]) => {
          dispatch({
            type: ActionType.UPDATE_SANDWICHES,
            payload: sandwiches,
          });
          sandwichLoadingState.clearLoading();
        });
    },
    // Ignore deps for this line, so the effect only runs once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
}
