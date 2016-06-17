import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEntries} from '../src/core';

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
  });

});
