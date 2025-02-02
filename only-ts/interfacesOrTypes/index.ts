export interface GameOfLifeParams {
  injectedNode: HTMLElement;
  cellsCountX: number;
  cellsCountY: number;
  random: boolean;
  speed: number;
  localStorageUse: boolean;
  popupHidden: boolean;
}

export interface GameOfLifeNodes {
  canvasNode: HTMLCanvasElement;
  popupNode: HTMLElement;
  popupPlayNode: HTMLElement;
  popupPauseNode: HTMLElement;
  popupTimeNode: HTMLElement;
  popupPopulationNode: HTMLElement;
  popupCyclesNode: HTMLElement;
  popupGenerateNode: HTMLElement;
  wrapperCanvasNode: HTMLElement;
  popupRandomCheckboxNode: HTMLInputElement;
  popupSpeedInfoNode: HTMLElement;
  popupSpeedRangeNode: HTMLInputElement;
  popupClearNode: HTMLElement;
  popupStepNode: HTMLElement;
  popupLoadNode: HTMLElement;
  popupInputRowsNode: HTMLInputElement;
  popupInputColsNode: HTMLInputElement;
  popupCloseNode: HTMLElement;
}

export interface GameOfLifeLocalStorage {
  random: boolean | undefined;
  speed: number | undefined;
  rows: number | undefined;
  cols: number | undefined;
  popupHidden: boolean | undefined;
}

export interface GameOfLifeWorkerResult {
  cols: number;
  rows: number;
  activeCells: number;
  field: Map<string, boolean>;
  buffer: Map<string, boolean>;
}

export function isGameOfLifeParams(obj: any): obj is GameOfLifeParams {
  return (
    obj &&
    obj.injectedNode instanceof HTMLElement &&
    typeof obj.cellsCountX === 'number' &&
    typeof obj.cellsCountY === 'number' &&
    typeof obj.random === 'boolean' &&
    typeof obj.speed === 'number' &&
    typeof obj.localStorageUse === 'boolean' &&
    typeof obj.popupHidden === 'boolean'
  );
}
