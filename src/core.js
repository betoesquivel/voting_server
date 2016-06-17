import {List, Map} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries', List());
  return state.merge({
    entries: entries.skip(2),
    vote: Map({
      pair: entries.take(2)
    })
  });
}

export function vote(state, entry) {
  return state.updateIn(['vote', 'tally', entry],
                        0,
                        tally => tally + 1);
}
