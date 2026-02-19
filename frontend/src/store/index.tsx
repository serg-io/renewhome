import React, {useContext} from 'react';
import {GlobalStoreAction} from './action.types';

import {GlobalStore, reducer} from './GlobalStore';

const providers = [<GlobalStore.Provider />];

function Store({children: initial}: any) {
  return providers.reduce((children, parent) => React.cloneElement(parent, {children}), initial);
}

function useGlobalState() {
  return useContext(GlobalStore.State);
}

function useGlobalDispatch(): (action: GlobalStoreAction) => void {
  return useContext(GlobalStore.Dispatch);
}

export {Store, GlobalStore, useGlobalState, useGlobalDispatch, reducer};

export * from './globalStore.types';
export * from './action.types';
