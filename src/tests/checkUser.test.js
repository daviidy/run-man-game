import 'jest-localstorage-mock';
import checkUser from '../components/checkUser';
import addUser from '../components/addUser';

test('check if user is already created', () => {
  const user = addUser('any');
  expect(checkUser()).toBe(true);
});
