describe('index.ts main entry', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('выбрасывает ошибку, если элемент .injected-game-life не найден', () => {
    expect(() => {
      require('../index');
    }).toThrow('injectedNode не найден');
  });

  it('создает экземпляр GameOfLife, если элемент .injected-game-life найден', () => {
    document.body.innerHTML = `<div class="injected-game-life"></div>`;

    const GameOfLifeMock = jest.fn();
    jest.doMock('../game-of-life', () => ({
      GameOfLife: GameOfLifeMock,
    }));

    require('../index');

    expect(GameOfLifeMock).toHaveBeenCalledWith({
      cellsCountX: 100,
      cellsCountY: 100,
      random: false,
      speed: 1,
      localStorageUse: true,
      popupHidden: false,
      injectedNode: expect.anything(),
    });
  });
});
