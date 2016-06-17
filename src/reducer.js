import {setEntries, next, vote, INITIAL_STATE} from './core';
import {Map} from 'immutable';

export function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);

    case 'NEXT':
      return next(state);

    case 'VOTE':
      return state.update('vote', (voteState) => vote(voteState, action.entry));

    return state;
  }
}
