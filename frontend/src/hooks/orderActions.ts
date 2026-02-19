import {useCallback} from 'react';
import {useGlobalDispatch, ActionType, useGlobalState} from 'store';
import {Order, OrderItemInput} from 'types';
import {useLoadingController} from './loading';
import {useGetSandwiches} from './sandwichActions';
import {cloneDeep} from 'lodash';

export function useUpdateOrder() {
  const dispatch = useGlobalDispatch();
  const loadingState = useLoadingController('order-update');
  const order = useOrder();

  return useCallback(
    async (sandwichId: number, quantity: number) => {
      try {
        if (loadingState.isLoading) {
          return;
        }
        loadingState.setLoading();
        const payload = {
          items: [
            {
              sandwich_id: sandwichId,
              quantity,
            },
          ] as OrderItemInput[],
        };
        // use a different route to create the order
        const route = order ? `/api/order/${order.id}/items` : '/api/order/create';
        const result = await fetch(route, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'content-type': 'application/json',
          },
        });
        if (!result.ok) {
          throw Error(await result.text());
        }
        const updatedOrder = await result.json();

        dispatch({
          type: ActionType.UPDATE_ORDER,
          payload: updatedOrder,
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error while submitting:', e);
      } finally {
        loadingState.clearLoading();
      }
    },
    [loadingState, order, dispatch],
  );
}

export function useSubmitOrder() {
  const dispatch = useGlobalDispatch();
  const loadingState = useLoadingController('order-submit');
  const order = useOrder();

  return useCallback(async () => {
    try {
      if (loadingState.isLoading) {
        return;
      }
      if (!order) {
        // eslint-disable-next-line no-console
        console.warn('Somehow attempted to submit an order with no order!');
        return;
      }
      loadingState.setLoading();
      const result = await fetch(`/api/order/${order.id}/submit`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: !!order.customer_phone_number
          ? JSON.stringify({
              phone_number: order.customer_phone_number,
            })
          : undefined,
      });
      if (!result.ok) {
        throw Error(await result.text());
      }

      dispatch({
        type: ActionType.UPDATE_ORDER,
        payload: null,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error while submitting:', e);
    } finally {
      loadingState.clearLoading();
    }
  }, [loadingState, order, dispatch]);
}

export function useOrder(withSandwiches: boolean = false): Order | null {
  const state = useGlobalState();
  const sandwiches = useGetSandwiches();
  if (!state.order) {
    return null;
  }

  if (!withSandwiches) {
    // should probably be a deep clone
    return cloneDeep(state.order);
  }

  // hydrate the order items with sandwich objects
  return {
    ...state.order,
    items: state.order.items.map(i => ({
      ...i,
      sandwich: sandwiches.find(s => s.id === i.sandwich_id),
    })),
  };
}
