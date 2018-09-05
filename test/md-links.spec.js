const mdLinks = require('../lib/md-links');

describe('validateTypeMarkdownFile(pathFile)', () => {
  test('válida que el archivo sea tipo md', () => {
    expect(mdLinks.validateTypeMarkdownFile('README.md')).toBeTruthy();
  });
  test('válida que el archivo sea tipo md', () => {
    expect(mdLinks.validateTypeMarkdownFile('app.js')).toBeFalsy();
  });
});
describe('function readCompleteFile(pathFile)', () => {
  test('lee el archivo entregado', () => {
    return expect(mdLinks.readCompleteFile('README.md')).resolves.toBeTruthy();
  });
});
describe('function convertToAbsolutePath(pathFile)', () => {
  test('convierte ruta a absoluta', () => {
    expect(mdLinks.convertToAbsolutePath('README.md')).toBe('/home/laboratoria/Documents/Laboratoria/Proyectos/scl-2018-01-FE-markdown/README.md');
  });
});
describe('function processAndExtractFile(pathFile)', () => {
  test('lee el archivo entregado, lo extrae y me resuelve en función con posición, ruta, y archivo mediante promesa', () => {
    return expect(mdLinks.processAndExtractFile('README.md')).resolves.toBeTruthy();
  });
});
