//import {jest} from '@jest/globals'
import 'regenerator-runtime/runtime';
import getScores from '../components/getScores';

import fetch from "jest-fetch-mock";

fetch.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

test('get the scores', async () => {
  fetch.mockResponseOnce(JSON.stringify({
    result: [
      {
        "user": "any",
        "score": 42,
      }
    ],
}));
  const score = await getScores();
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(score).toEqual([
    {
      "user": "any",
      "score": 42
    }
  ]);  
});