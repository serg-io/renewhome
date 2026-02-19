import React from 'react';
import {WithChildren} from 'types';
import {ActionType, GlobalStoreAction, PayloadOf} from './action.types';

/**********************
 * GlobalStore Config
 **********************/

/**
 * A complete config for the global store including state, dispatch, and provider
 */
export type GlobalStoreConfig = {
  State: React.Context<GlobalStoreState>;
  Dispatch: React.Context<GlobalStoreDispatch>;
  Provider: ({children}: WithChildren) => JSX.Element;
};

/**
 * Global store dispatch type, which is a dispatch of a `GlobalStoreAction`
 */
export type GlobalStoreDispatch = React.Dispatch<GlobalStoreAction>;

/**********************
 * GlobalStore State
 **********************/

/**
 * Type of the global store state object
 */
export interface GlobalStoreState extends Record<string, any> {
  order: PayloadOf<ActionType.UPDATE_ORDER>;
  sandwiches: PayloadOf<ActionType.UPDATE_SANDWICHES>;
  loadingFlags: string[];
}
