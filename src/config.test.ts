import { normalizeStringArrays } from './config';

test('normalizes string arrays', () => {
  const userFilterSingle = 'abcdef';
  const userFilterMultiple = ['firstRole', 'secondRole'];

  expect(normalizeStringArrays(userFilterSingle)).toEqual(['abcdef']);
  expect(normalizeStringArrays(userFilterMultiple)).toEqual([
    'firstRole',
    'secondRole',
  ]);
});
