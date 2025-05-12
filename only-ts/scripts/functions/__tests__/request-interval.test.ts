/**
 * @jest-environment jsdom
 */
import { requestInterval } from '../request-interval';

describe('requestInterval', () => {
  let originalRAF: typeof window.requestAnimationFrame;
  let now = 0;
  let dateNowSpy: jest.SpyInstance<number, []>;

  beforeEach(() => {
    jest.useFakeTimers();
    now = 0;
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now);

    originalRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = jest.fn((cb: FrameRequestCallback) => {
      return setTimeout(() => cb(now), 16) as unknown as number;
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    dateNowSpy.mockRestore();
    window.requestAnimationFrame = originalRAF;
  });

  describe('when interval is 0', () => {
    it('calls the callback every frame', () => {
      const callback = jest.fn();
      const obj = requestInterval(callback, 0);

      jest.advanceTimersByTime(16);
      expect(callback).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(16);
      expect(callback).toHaveBeenCalledTimes(2);

      jest.advanceTimersByTime(16);
      expect(callback).toHaveBeenCalledTimes(3);

      expect(typeof obj.id).toBe('number');
    });
  });

  describe('when interval > 0', () => {
    it('calls the callback only when elapsed time reaches the interval', () => {
      const callback = jest.fn();
      const intervalMs = 100;
      const obj = requestInterval(callback, intervalMs);

      now = 16;
      jest.advanceTimersByTime(16);
      expect(callback).toHaveBeenCalledTimes(0);

      now = 100;
      jest.advanceTimersByTime(16);
      expect(callback).toHaveBeenCalledTimes(1);

      now = 150;
      jest.advanceTimersByTime(16);
      expect(callback).toHaveBeenCalledTimes(1);

      now = 210;
      jest.advanceTimersByTime(16);
      expect(callback).toHaveBeenCalledTimes(2);

      expect(typeof obj.id).toBe('number');
    });
  });
});
