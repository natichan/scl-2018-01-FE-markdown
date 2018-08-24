/* Ejemplo de test jest
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
function sum(a, b) {
  return a + b;
}
module.exports = sum;

});
 */
const sum = require('../md-links');

test('muestra ruta al darle un parametro', () => {
  expect(testingPath(hello).toBe(true));
});