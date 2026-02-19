import {
  Exact,
  NarrowUnionByIntersection,
  Order,
  Sandwich,
  UnionFromMapWithKey,
  ValuesOf,
} from 'types';

/**********************
 * Action Definitions
 **********************/

/**
 * An enum representing all possible global store action types. Each enum value
 * must be represented in the `ActionsMap` type.
 */
export enum ActionType {
  UPDATE_ORDER = 'UPDATE_ORDER',
  UPDATE_SANDWICHES = 'UPDATE_SANDWICHES',
  SET_LOADING = 'SET_LOADING',
  CLEAR_LOADING = 'CLEAR_LOADING',
  UPDATE_ORDER_PHONE_NUMBER = 'UPDATE_ORDER_PHONE_NUMBER',
}

/**
 * A map of all global store actions, mapped to the action type. When consuming
 * via the `GlobalStoreAction` type, the map key is asserted as the `type` property.
 * The map must contain exactly every key in the `ActionType` enum.
 */
interface ActionsMap extends ActionsMapBase {
  [ActionType.UPDATE_ORDER]: {payload: Order | null};
  [ActionType.UPDATE_SANDWICHES]: {payload: Sandwich[]};
  [ActionType.SET_LOADING]: {payload: string};
  [ActionType.CLEAR_LOADING]: {payload: string};
  [ActionType.UPDATE_ORDER_PHONE_NUMBER]: {payload: string};
}

/**********************
 * GlobalStoreAction Type
 **********************/

/**
 * Discriminating union of all global store actions. This type ensures every action
 * type from the `ActionType` enum is represented in the map.
 */
export type GlobalStoreAction = Exact<keyof ActionsMap, ValuesOf<typeof ActionType>> extends never
  ? "Error: The keys in 'ActionsMap' do not match 'ActionType' enum. The keys of each must be match."
  : UnionFromMapWithKey<ActionsMap, 'type'>; // Actions discriminating union

/**********************
 * Helpers
 **********************/

/**
 * Returns the payload type for the the given action type `T`
 */
export type PayloadOf<T extends ActionType> = NarrowUnionByIntersection<
  GlobalStoreAction,
  {type: T; payload: unknown}
>['payload'];

/**
 * Base structure of the `ActionsMap`, which must not contain sub objects with a `type` key.
 * The `GlobalStoreAction` type mutates `ActionsMap` and asserts the map key as the `type` property
 */
type ActionsMapBase = Record<ActionType, {type?: never; payload: unknown}>;
