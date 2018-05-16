#!/usr/bin/env node

const { getEndOfChanges } = require('./index');
const assert = require('assert');

const expectEqual = (value, expectedValue) => {
  try {
    assert.equal(value, expectedValue);
    return true;
  } catch (error) {
    return error;
  }
};

const changes = '* Change 1\n* Change 2';

const assertEndAsBoldText = () => {
  const endsWithBoldText = `
${changes}

** Why **
`;

  return expectEqual(getEndOfChanges(endsWithBoldText), changes);
};

const assertEndAsHeadline = () => {
  const endsWithHeadline = `
${changes}

### Why
`;

  return expectEqual(getEndOfChanges(endsWithHeadline), changes);
};

const assertEndWithGif = () => {
  const endsWithGif = `
${changes}

![](https://derp.com)
`;

  return expectEqual(getEndOfChanges(endsWithGif), changes);
};

const assertEnd = () => expectEqual(getEndOfChanges(changes), changes);

[
  assertEndAsBoldText,
  assertEndAsHeadline,
  assertEndWithGif,
  assertEnd
].forEach(method => console.log(`Testing ${method.name}: ${method()}`));
