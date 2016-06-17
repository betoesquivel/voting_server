import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {reducer} from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {
      type: 'SET_ENTRIES',
      entries: ['Trainspotting', '28 days later']
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting', '28 days later']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Trainspotting', '28 days later'],
    });
    const action = {
      type: 'NEXT'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: [],
      vote: {
        pair: ['Trainspotting', '28 days later']
      }
    }));
  });

  it('handles VOTE', () => {
    const initialState = Map(fromJS({
      entries: [],
      vote: {
        pair: ['Trainspotting', '28 days later']
      }
    }));
    const action = {
      type: 'VOTE',
      entry: 'Trainspotting'
    };
    const nextState = reducer(initialState, action);

    expect(nextState.get('vote', Map()).get('tally')).to.equal(fromJS({
      Trainspotting: 1
    }));
  });

});
