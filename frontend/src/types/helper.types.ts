import React from 'react';

/**
 * Appends custom props to the props of a given component or intrinsic element (with or without ref)
 * @template T Component or intrinsic element key
 * @template P Optional custom props
 */
export type WithComponentProps<
  T extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  P = {}
> = React.ComponentProps<T> & {as?: React.ElementType} & P;

/**
 * Appends custom props to the props of a given component or intrinsic element (with ref)
 * @template T Component or intrinsic element key
 * @template P Optional custom props
 */
export type WithComponentPropsWithRef<
  T extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  P = {}
> = React.ComponentPropsWithRef<T> & {as?: React.ElementType} & P;

/**
 * Appends custom props to the props of a given component or intrinsic element (without ref)
 * @template T Component or intrinsic element key
 * @template P Optional custom props
 */
export type WithComponentPropsWithoutRef<
  T extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  P = {}
> = React.ComponentPropsWithoutRef<T> & {as?: React.ElementType} & P;

/**
 * Provides a type for an object with React component `children`, along with optional additional props
 * @template P Optional custom props
 */
export type WithChildren<P = {}> = {children?: React.ReactNode} & P;

/**
 * Concats the keys from object or string T and the keys from object or string U,
 * into a record with `<key: string, value: V>`
 */
export type ConcatKeys<
  T extends Record<string | number, any> | string,
  U extends Record<string | number, any> | string,
  V = string
> = {
  // prettier-ignore
  // eslint-disable-next-line prettier/prettier 
  [key in `${StringKeys<T>}${StringKeys<U>}`]: V; 
};

/**
 * Extracts keys of type string from an object or string
 */
export type StringKeys<T extends object | string> = T extends object
  ? Extract<keyof T, string>
  : T extends string
  ? T
  : never;

/**
 * Narrow down a union type `U` by the provided key `K` and value `V`
 */
export type NarrowUnionByKeyValue<U extends {}, K extends keyof U, V extends U[K]> = U extends {
  [k in K]: V;
}
  ? U
  : never;

/**
 * Narrow down a union type `U` by the provided intersection object `O`
 */
export type NarrowUnionByIntersection<
  U extends {},
  O extends Partial<{[k in keyof U]: unknown}>
> = U extends O ? U : never;

/**
 * If types `A` and `B` match, returns the type, otherwise returns never
 */
export type Exact<A, B> = (<T>() => T extends A ? 1 : 0) extends <T>() => T extends B ? 1 : 0
  ? A extends B
    ? B extends A
      ? A
      : never
    : never
  : never;

/**
 * Returns a union of all the values in a given object `T`
 */
export type ValuesOf<T> = T[keyof T];

/**
 * Any primitive type, including `null` and `undefined`
 */
export type Primitive = string | number | boolean | bigint | symbol | null | undefined;

/**
 * Expands an object type `T` one level deep.
 */
export type Expand<T> = T extends infer O ? {[k in keyof O]: O[k]} : never;

/**
 * Expands an object type `T` recursively.
 */
export type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? {[k in keyof O]: ExpandRecursively<O[k]>}
    : never
  : T;

/**
 * Transforms a map of type `T` into a discriminating union. The map keys are lost.
 * To store the map keys as a value in the resulting union, use `UnionFromMapWithKey` instead.
 * @example UnionFromMap<{a: {foo: 1, bar: 2}, b: {foo: 3, bar: 4}}>
 * // resolves...
 * {foo: 1, bar: 2} | {foo: 3, bar: 4}
 */
export type UnionFromMap<T extends object> = T[keyof T];

/**
 * Transforms a map of type `T` into a discriminating union. The map keys can optionally be
 * reassigned as a value in the expanded object to key `K`.
 * @example UnionFromMapWithKey<{a: {foo: 1, bar: 2}, b: {foo: 3, bar: 4}}, 'type'>
 * // resolves...
 * {type: a, foo: 1, bar: 2} | {type: b, foo: 3, bar: 4}
 */
export type UnionFromMapWithKey<
  T extends object,
  K extends string | number | symbol | never = never
> = {[k in keyof T]: Expand<{[key in K]: k} & T[k]>}[keyof T];
