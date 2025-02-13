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

    // Мокаем requestAnimationFrame: вместо него вызываем callback через 16 мс,
    // передавая текущее значение now.
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

      // Первый кадр: 16 мс
      jest.advanceTimersByTime(16);
      expect(callback).toHaveBeenCalledTimes(1);

      // Второй кадр: ещё 16 мс
      jest.advanceTimersByTime(16);
      expect(callback).toHaveBeenCalledTimes(2);

      // Третий кадр: ещё 16 мс
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

      // Изначально start = 0.
      // Первый кадр: продвигаем время до 16 мс.
      now = 16;
      jest.advanceTimersByTime(16);
      // delta = 16 (меньше 100), колбэк не вызывается.
      expect(callback).toHaveBeenCalledTimes(0);

      // Второй кадр: продвигаем время до 100 мс.
      now = 100;
      jest.advanceTimersByTime(16);
      // delta = 100, условие выполняется – вызываем callback.
      expect(callback).toHaveBeenCalledTimes(1);
      // start обновляется: start = 100 - (100 % 100) = 100.

      // Третий кадр: продвигаем время до 150 мс.
      now = 150;
      jest.advanceTimersByTime(16);
      // delta = 150 - 100 = 50, условие не выполняется.
      expect(callback).toHaveBeenCalledTimes(1);

      // Четвёртый кадр: продвигаем время до 210 мс.
      now = 210;
      jest.advanceTimersByTime(16);
      // delta = 210 - 100 = 110, условие выполняется – вызываем callback.
      expect(callback).toHaveBeenCalledTimes(2);

      expect(typeof obj.id).toBe('number');
    });
  });
});
