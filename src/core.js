import {List, Map} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}


function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if (aVotes > bVotes) return [a];
  if (aVotes < bVotes) return [b];
  return [a, b];
}

export function next(state) {
  const entries = state.get('entries', List());
  const winners = getWinners(state.get('vote'));
  return state.merge({
    entries: entries.concat(winners).skip(2),
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
