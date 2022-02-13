const readingData = require('../src/functions.js');

describe('Testando as funções do DOM', () => {
  it('01 - Testando se a função readingData é uma função', () => {
    expect(typeof readingData).toBe('function');
  }),
    it('02 - Testando se ao não passar parametros para readingData é retornado um erro', () => {
      const expectedError = new Error('Não há select nem dados');
      expect(readingData()).toEqual(expectedError);
    });
});
