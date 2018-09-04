const mdLinks = require('../lib/md-links');

describe('validateTypeMarkdownFile(pathFile)', () => {
  test('válida que el archivo sea tipo md', () => {
    expect(mdLinks.validateTypeMarkdownFile('README.md')).toBeTruthy();
  });
  test('válida que el archivo sea tipo md', () => {
    expect(mdLinks.validateTypeMarkdownFile('app.js')).not.toBeTruthy();
  });
});
describe('function readCompleteFile(pathFile)', () => {
  test('lee el archivo entregado', () => {
    return expect(mdLinks.readCompleteFile('README.md')).resolves.toBeTruthy();
  });
});


