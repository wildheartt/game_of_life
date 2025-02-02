
import { requestInterval } from '../request-interval';

jest.useFakeTimers();

describe('requestInterval', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 16)); // Mock requestAnimationFrame
  });

  it('should call the callback repeatedly when interval is 0', () => {
    const callback = jest.fn();
    const obj = requestInterval(callback, 0);

    // Simulate multiple animation frames
    for (let i = 0; i < 5; i++) {
      jest.advanceTimersByTime(16);
    }

    expect(callback).toHaveBeenCalledTimes(5);
    expect(typeof obj.id).toBe('number');
  });

  it('should call the callback at specified intervals', () => {
    const callback = jest.fn();
    const interval = 1000; // 1 second

    const obj = requestInterval(callback, interval);

    const originalDateNow = Date.now;
    let now = 0;
    global.Date.now = jest.fn(() => now);

    // Simulate frames up to 1000ms
    for (let i = 0; i < 60; i++) {
      // ~1 second at 60fps
      now += 16;
      jest.advanceTimersByTime(16);
    }

    expect(callback).toHaveBeenCalledTimes(1);

    // Simulate additional frames
    for (let i = 0; i < 60; i++) {
      now += 16;
      jest.advanceTimersByTime(16);
    }

    expect(callback).toHaveBeenCalledTimes(2);

    // Restore Date.now
    global.Date.now = originalDateNow;
  });

  it('should adjust start time correctly after interval is exceeded', () => {
    const callback = jest.fn();
    const interval = 1000; // 1 second

    const obj = requestInterval(callback, interval);

    const originalDateNow = Date.now;
    let now = 0;
    global.Date.now = jest.fn(() => now);

    // First callback at 1000ms
    now = 1000;
    jest.advanceTimersByTime(16);
    expect(callback).toHaveBeenCalledTimes(1);

    // Second callback at 2000ms
    now = 2000;
    jest.advanceTimersByTime(16);
    expect(callback).toHaveBeenCalledTimes(2);

    // Third callback at 3000ms
    now = 3000;
    jest.advanceTimersByTime(16);
    expect(callback).toHaveBeenCalledTimes(3);

    // Restore Date.now
    global.Date.now = originalDateNow;
  });

  it('should return an object with id property', () => {
    const callback = jest.fn();
    const obj = requestInterval(callback, 0);
    expect(obj).toHaveProperty('id');
  });
});
