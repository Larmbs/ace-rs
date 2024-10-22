/**
 * Manages individual ui elements
 */
export class UIContainer {
    constructor(uiElement) {
        this.uiElement = uiElement;
        this.uiElements = [];
    }
    /**
     * Adds a UI element to the UI container
     * @param ui - UI element
     */
    addUI(ui) {
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
    constructor(ui, position, size, draggable = false) {
        this.onClick = null;
        this.ui = ui;
        this.position = position;
        this.size = size;
        this.draggable = draggable;
    }
    /**
     * Binds an event to a click
     * @param func - A function that will be activated on press
     */
    bindClickEvent(func) {
        this.onClick = func;
    }
}
