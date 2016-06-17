import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 days later');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(fromJS({
        entries: ['Trainspotting', '28 days later']
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 days later'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 days later')
      }));
    });

  });

  describe('next', () => {

    it('takes the next two entries under a vote', () => {
      const state = fromJS({
        entries: ['Trainspotting', '28 days later', 'Sunshine']
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        entries: List(['Sunshine']),
        vote: Map({
          pair: List(['Trainspotting', '28 days later'])
        })
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = fromJS({
        entries: ['Sunshine', 'Millions', '127 hours'],
        vote: {
          pair: ['Trainspotting', '28 days later'],
          tally: {
            'Trainspotting': 3,
            '28 days later': 2
          }
        }
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        entries: List.of('127 hours', 'Trainspotting'),
        vote: Map({
          pair: List.of('Sunshine', 'Millions')
        })
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = fromJS({
        entries: ['Sunshine', 'Millions', '127 hours'],
        vote: {
          pair: ['Trainspotting', '28 days later'],
          tally: {
            'Trainspotting': 3,
            '28 days later': 3
          }
        }
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        entries: List.of('127 hours', 'Trainspotting', '28 days later'),
        vote: Map({
          pair: List.of('Sunshine', 'Millions')
        })
      }));
    });

  });

  describe('vote', () => {

    it('creates a tally on the voted entry', () => {
      const state = fromJS({
        entries: ['Sunshine'],
        vote: {
          pair: ['Trainspotting', '28 days later']
        }
      });
      const nextState = vote(state, 'Trainspotting');

      expect(nextState).to.equal(Map({
        entries: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 1
          })
        })
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = fromJS({
        entries: ['Sunshine'],
        vote: {
          pair: ['Trainspotting', '28 days later'],
          tally: {
            'Trainspotting': 3,
            '28 days later': 2
          }
        }
      });
      const nextState = vote(state, 'Trainspotting');

      expect(nextState).to.equal(Map({
        entries: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 4,
            '28 days later': 2
          })
        })
      }));
    });

  });

});
