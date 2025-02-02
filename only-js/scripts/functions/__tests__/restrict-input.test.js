import { restrictInputValue } from '../restrict-input.js';

describe('restrictInputValue', () => {
  let input;

  beforeEach(() => {
    input = document.createElement('input');
  });

  it('should set value to min if input is not a number', () => {
    input.value = 'abc';
    const result = restrictInputValue(input, 10, 100);
    expect(result).toBe(10);
    expect(input.value).toBe('10');
  });

  it('should set value to min if input is less than min', () => {
    input.value = '5';
    const result = restrictInputValue(input, 10, 100);
    expect(result).toBe(10);
    expect(input.value).toBe('10');
  });

  it('should set value to max if input is greater than max', () => {
    input.value = '150';
    const result = restrictInputValue(input, 10, 100);
    expect(result).toBe(100);
    expect(input.value).toBe('100');
  });

  it('should keep the input value if it is within min and max', () => {
    input.value = '50';
    const result = restrictInputValue(input, 10, 100);
    expect(result).toBe(50);
    expect(input.value).toBe('50');
  });

  it('should handle negative numbers correctly', () => {
    input.value = '-20';
    const result = restrictInputValue(input, -10, 100);
    expect(result).toBe(-10);
    expect(input.value).toBe('-10');
  });

  it('should handle edge cases at min and max', () => {
    input.value = '10';
    let result = restrictInputValue(input, 10, 100);
    expect(result).toBe(10);
    expect(input.value).toBe('10');

    input.value = '100';
    result = restrictInputValue(input, 10, 100);
    expect(result).toBe(100);
    expect(input.value).toBe('100');
  });
});
