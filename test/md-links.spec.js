const mdLinks = require('../md-links');

describe('validateTypeMarkdownFile(pathFile)', () => {
  test('válida que el archivo sea tipo md', () => {
    function validateTypeMarkdownFile(pathFile) {
      expect((README.md).toBeTruthy());
    }
  });
});