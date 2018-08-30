const sum = require('../md-links');

test('validateTypeMarkdownFile(pathFile) válida que el archivo sea tipo md', () => {
  expect(validateTypeMarkdownFile(README.md).toBe(true));
  expect(validateTypeMarkdownFile(index.js).toBe(false));
});