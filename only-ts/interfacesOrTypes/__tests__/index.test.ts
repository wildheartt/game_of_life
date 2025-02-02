import { isGameOfLifeParams, GameOfLifeParams } from '../index';

describe('isGameOfLifeParams', () => {
  it('should return true for valid GameOfLifeParams objects', () => {
    const validParams: GameOfLifeParams = {
      injectedNode: document.createElement('div'),
      cellsCountX: 10,
      cellsCountY: 10,
      random: true,
      speed: 500,
      localStorageUse: false,
      popupHidden: false,
    };

    expect(isGameOfLifeParams(validParams)).toBe(true);
  });

  it('should return false for objects missing required properties', () => {
    const invalidParams = {
      injectedNode: document.createElement('div'),
      cellsCountX: 10,
      // cellsCountY is missing
      random: true,
      speed: 500,
      localStorageUse: false,
      popupHidden: false,
    };

    expect(isGameOfLifeParams(invalidParams)).toBe(false);
  });

  it('should return false for objects with incorrect property types', () => {
    const invalidParams = {
      injectedNode: 'not an HTMLElement', // Should be HTMLElement
      cellsCountX: '10', // Should be number
      cellsCountY: 10,
      random: true,
      speed: 500,
      localStorageUse: false,
      popupHidden: false,
    };

    expect(isGameOfLifeParams(invalidParams)).toBe(false);
  });

  it('should return false for null or undefined', () => {
    expect(isGameOfLifeParams(null)).toBe(false);
    expect(isGameOfLifeParams(undefined)).toBe(false);
  });

  it('should return false for completely invalid objects', () => {
    const invalidParams = {
      foo: 'bar',
      baz: 42,
    };

    expect(isGameOfLifeParams(invalidParams)).toBe(false);
  });
});
