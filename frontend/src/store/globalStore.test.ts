import {ActionType} from './action.types';
import {reducer} from './GlobalStore';
import {GlobalStoreState} from './globalStore.types';

describe('loading', () => {
  let initial: GlobalStoreState;
  beforeEach(() => {
    initial = ({
      loadingFlags: [],
    } as unknown) as GlobalStoreState;
  });
  it('handles setting loading without duplication', () => {
    const flag = 'some-loading-thing';
    const reduce1 = reducer(initial, {type: ActionType.SET_LOADING, payload: flag});

    expect(reduce1.loadingFlags).toContain(flag);
    expect(reduce1.loadingFlags).toHaveLength(1);

    // reducing again should not add the flag again
    const reduce2 = reducer(reduce1, {type: ActionType.SET_LOADING, payload: flag});

    expect(reduce2.loadingFlags).toContain(flag);
    expect(reduce2.loadingFlags).toHaveLength(1);
  });
  it('handles clearing loading', () => {
    const flag = 'some-loading-thing';
    const reduce1 = reducer(initial, {type: ActionType.SET_LOADING, payload: flag});

    expect(reduce1.loadingFlags).toContain(flag);
    expect(reduce1.loadingFlags).toHaveLength(1);

    // reducing again should not add the flag again
    const reduce2 = reducer(reduce1, {type: ActionType.CLEAR_LOADING, payload: flag});

    expect(reduce2.loadingFlags).not.toContain(flag);
    expect(reduce2.loadingFlags).toHaveLength(0);
  });
});
