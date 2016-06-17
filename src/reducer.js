import {setEntries, next, vote} from '../src/core';

export function reducer(state, action) {
  switch(action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);

    case 'NEXT':
      return next(state);

    case 'VOTE':
      return vote(state, action.entry);

    return state;
  }
}
