import Model from '../Model';

test('create model successfully', () => {
  const model = new Model();
  expect(model.musicOn).toBe(true);
});
