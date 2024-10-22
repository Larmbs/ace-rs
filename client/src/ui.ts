/**
 * Manages individual ui elements
 */
export class UIContainer {
  private uiElement: HTMLDivElement;
  private uiElements: UI[];

  constructor(uiElement: HTMLDivElement) {
    this.uiElement = uiElement;
    this.uiElements = [];
  }

  /**
   * Adds a UI element to the UI container
   * @param ui - UI element
   */
  addUI(ui: UI) {
    this.uiElements.push(ui);
  }

  /**
   * Draws all the UI elements onto the screen
   * @param elem - Where the elements will be drawn
   */
  render() {
    for (let i = 0; i < this.uiElements.length; i++) {
      this.uiElements[i];
    }
  }
}

/**
 * Represents a UI element on the game screen
 */
export class UI {
  private ui: HTMLElement;
  private position: [number, number];
  private size: [number, number];
  private draggable: boolean;
  private onClick: VoidFunction | null = null;

  constructor(
    ui: HTMLElement,
    position: [number, number],
    size: [number, number],
    draggable: boolean = false
  ) {
    this.ui = ui;
    this.position = position;
    this.size = size;
    this.draggable = draggable;
  }

  /**
   * Binds an event to a click
   * @param func - A function that will be activated on press
   */
  bindClickEvent(func: VoidFunction) {
    this.onClick = func;
  }
}
