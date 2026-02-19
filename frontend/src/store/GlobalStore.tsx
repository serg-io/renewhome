import React from 'react';

import {WithChildren} from 'types';
import {GlobalStoreState, GlobalStoreConfig, GlobalStoreDispatch} from './globalStore.types';
import {ActionType, GlobalStoreAction} from './action.types';

const initialValue: GlobalStoreState = {
  order: null,
  sandwiches: [],
  loadingFlags: [],
};

// Context
const State = React.createContext<GlobalStoreState>(initialValue);
State.displayName = 'GlobalState';
const Dispatch = React.createContext<GlobalStoreDispatch>((action: GlobalStoreAction) => {});
Dispatch.displayName = 'GlobalDispatch';

// Reducer
export function reducer(state: GlobalStoreState, action: GlobalStoreAction): GlobalStoreState {
  switch (action.type) {
    case ActionType.UPDATE_ORDER:
      return {...state, order: action.payload};
    case ActionType.UPDATE_SANDWICHES:
      return {...state, sandwiches: action.payload};
    case ActionType.SET_LOADING:
      // add the payload (a string) to the array of loading flags
      // use a set to deduplicate; kinda clumsy, but works with no library
      return {
        ...state,
        loadingFlags: Array.from(new Set([...state.loadingFlags, action.payload])),
      };
    case ActionType.CLEAR_LOADING:
      return {
        ...state,
        loadingFlags: state.loadingFlags.filter(s => s !== action.payload),
      };

    case ActionType.UPDATE_ORDER_PHONE_NUMBER:
      return {
        ...state,
        order: !!state.order
          ? {
              ...state.order,
              customer_phone_number: action.payload,
            }
          : null,
      };
    // # Unexpected action:
    default:
      // eslint-disable-next-line no-console
      console.error(`Unexpected action: ${action['type']}`);
      return state;
  }
}

// Provider
function Provider({children}: WithChildren): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialValue);

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </State.Provider>
  );
}

export const GlobalStore: GlobalStoreConfig = {
  State,
  Dispatch,
  Provider,
};
